import { createFileRoute } from '@tanstack/react-router'
import { RequestPasswordReset } from '#/components/requestPasswordReset'


export const Route = createFileRoute('/forgotPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='flex items-center justify-center w-full min-h-dvh'>
          <div className='flex items-center gap-5 w-full py-10 justify-center'>
            <RequestPasswordReset /> 
          </div>
        </main> 
  )
}
