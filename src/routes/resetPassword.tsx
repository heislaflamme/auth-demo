import { createFileRoute, redirect } from '@tanstack/react-router'
import { ResetPassword } from '#/components/resetPassword'
import z from 'zod'

const searchParams = z.object({
  token: z.string().nonempty()
})

export const Route = createFileRoute('/resetPassword')({
  component: RouteComponent,
  validateSearch: searchParams,
  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({ to: "/forgotPassword" });
    }
  }
})

function RouteComponent() {
  return (
    <main className='flex items-center justify-center w-full min-h-dvh'>
              <div className='flex items-center gap-5 w-full py-10 justify-center'>
                <ResetPassword /> 
              </div>
            </main> 
  )
}
