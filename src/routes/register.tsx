import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '#/components/signup-form'


export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='flex items-center justify-center w-full min-h-dvh'>
      <div className='flex flex-col gap-5 w-full items-center justify-center py-10'>
        <SignupForm />
      </div>
    </main> 
  )
}
