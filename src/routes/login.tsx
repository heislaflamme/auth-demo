import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '#/components/login-form'


export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='flex items-center justify-center w-full min-h-dvh'>
      <div className='flex items-center gap-5 w-full py-10 justify-center'>
        <LoginForm /> 
      </div>
    </main> 
  )
}
