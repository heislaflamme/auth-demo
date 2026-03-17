import { Button } from "#/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Link, useNavigate } from "@tanstack/react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "#/lib/auth-client"  

const user = z.object({
  firstName: z.string().nonempty("Please enter your first name").min(2, "Minimum of 2 characters"),
  lastName: z.string().nonempty("Please enter your last name").min(2, "Minimum of 2 characters"),
  email: z.email().nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type user = z.infer<typeof user>

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<user>({
    resolver: zodResolver(user),
  });

  const navigate = useNavigate();

  const googleSignin = async() => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  };

  const onSubmit = async (data: user) => {

    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      callbackURL: "/dashboard"
    }, {
      onSuccess: () => {
        alert("Account successfully created");
        navigate({ to: "/dashboard"});
      },
      onError: ({error}) => {
        setError("root", { message: error.message ? error.message : "Something went wrong please try again" });
      }
    })

  }


  return (
    <Card {...props} className="w-100">
      <CardHeader>
        <CardTitle className="text-center">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input {...register("firstName")} id="firstName" type="text" placeholder="John" required />
              <p className="text-red-600 p-1">{errors.firstName?.message}</p>
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input {...register("lastName")} id="lastName" type="text" placeholder="Doe" required />
               <p className="text-red-600 p-1">{errors.lastName?.message}</p>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                 {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <p className="text-red-600 p-1">{errors.email?.message}</p>
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input {...register("password")} id="password" type="password" required />
              <p className="text-red-600 p-1">{errors.password?.message}</p>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input {...register("confirmPassword")} id="confirm-password" type="password" required />
              <p className="text-red-600 p-1">{errors.confirmPassword?.message}</p>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting} className="bg-black text-white cursor-pointer active:scale-[0.8] transition-all duration-100">
                  {isSubmitting ? "Creating account..." : "Create Account" }
                </Button>
                <p className="text-red-600 p-1">{errors.root?.message}</p>
                <Button variant="outline" type="button" onClick={googleSignin} className="bg-black text-white cursor-pointer active:scale-[0.8] transition-all duration-100">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
