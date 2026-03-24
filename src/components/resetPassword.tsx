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
import { Link, useSearch } from "@tanstack/react-router"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "#/lib/auth-client"
import { toast } from "sonner"

const user = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is not optional"),
});

type user = z.infer<typeof user>

export function ResetPassword({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const { token } = useSearch({ from: "/resetPassword" })

  const { handleSubmit, register, formState:{ isSubmitting, errors }, setError } = useForm<user>({
    resolver: zodResolver(user)
  })

  const onSubmit = async(data: user)=> {
    await authClient.resetPassword({
        newPassword: data.password,
        token,
    }, {
        onSuccess: () => {
            toast.success("Password reset successfully, you can now sign in with your new password.");
        },
        onError({error}) {
            toast.error("Failed to reset password");
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                {errors.password?.message && <p className="text-red-600 p-1">{errors.password.message}</p>}
              </Field>
                <Button type="submit" disabled={isSubmitting} className="bg-black text-white cursor-pointer active:scale-[0.8] transition-all duration-100">{isSubmitting ? "Sending..." : "Reset Password"}</Button>
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
