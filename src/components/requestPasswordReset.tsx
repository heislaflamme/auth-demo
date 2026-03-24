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
import { Link } from "@tanstack/react-router"
import z, { email } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "#/lib/auth-client"
import { toast } from "sonner"

const user = z.object({
  email: email().nonempty("Email is not optional"),
});

type user = z.infer<typeof user>

export function RequestPasswordReset({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { handleSubmit, register, formState:{ isSubmitting, errors }, setError } = useForm<user>({
    resolver: zodResolver(user)
  })

  const onSubmit = async(data: user)=> {

    await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/resetPassword"

    }, {
        onSuccess: () => {
            toast.success("Password reset email sent successfully, please check your inbox.");
        },
        onError({error}) {
            toast.error("Failed to send password reset email");
            setError("root", { message: error.message ? error.message : "Something went wrong please try again" });
        }
    })

  }

  return (
    <div className={cn("flex flex-col gap-6 w-100", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
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
                {errors.email?.message && <p className="text-red-600 p-1">{errors.email.message}</p>}
              </Field>
                <Button type="submit" disabled={isSubmitting} className="bg-black text-white cursor-pointer active:scale-[0.8] transition-all duration-100">{isSubmitting ? "Sending..." : "Send Reset Email"}</Button>
                {errors.root?.message && <p className="text-red-600 p-1">{errors.root.message}</p>}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
