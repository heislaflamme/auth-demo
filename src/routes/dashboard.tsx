import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { authMiddleWare } from '#/middleware/authMiddleWare.server'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  server: {
    middleware: [authMiddleWare]
  }
})

function RouteComponent() {

  const session = authClient.useSession();

  const navigate = useNavigate();

  const signOut = async() => {
      await authClient.signOut();
      await navigate({ to: "/"});
  }

  if (session){
    return (
    <main className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-full justify-center gap-5 flex flex-col'>
      <header className='w-full text-center'>WELCOME TO YOUR DASHBOARD {session.data?.user.name.split(" ")[1].toLocaleUpperCase()}!</header>
      <button className='px-4 py-2 w-30 mx-auto bg-black cursor-pointer text-white rounded active:scale-[0.8] duration-100 transition-all' onClick={signOut}>SIGN OUT</button>
      </div>
    </main>
  )
  }
}
