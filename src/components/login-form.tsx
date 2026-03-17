import { cn } from "#/lib/utils"
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
import z, { email, string } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "#/lib/auth-client"

const user = z.object({
  email: email().nonempty("Email is not optional"),
  password: string().min(8, "Password must be at least minimum of 8 characters")
})

type user = z.infer<typeof user>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { handleSubmit, register, formState:{ isSubmitting, errors }, setError } = useForm<user>({
    resolver: zodResolver(user)
  })

  const navigate = useNavigate();

  const googleSignin = async() => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      },{ onSuccess: () => {
          alert("Account successfully created");
          navigate({ to: "/dashboard"});
        },
        onError: ({error}) => {
          setError("root", { message: error.message ? error.message : "Something went wrong please try again" });
        }
        })
    };

  const onSubmit = async(data: user)=> {

    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
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
    <div className={cn("flex flex-col gap-6 w-100", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
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
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input {...register("password")} id="password" type="password" required />
                <p className="text-red-600 p-1">{errors.password?.message}</p>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting} className="bg-black text-white cursor-pointer active:scale-[0.8] transition-all duration-100">{isSubmitting ? "Logging in..." : "Login"}</Button>
                <Button variant="outline" onClick={googleSignin} type="button" className="bg-black text-white cursor-pointer active:scale-[0.8] transition-all duration-100">
                  Login with Google
                </Button>
                <p className="p-1 text-red-600">{errors.root?.message}</p>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
