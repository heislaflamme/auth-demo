import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
   <main className='flex min-h-screen w-full items-center justify-center'>
     <div className='flex flex-col gap-5'>
      <header className='text-2xl font-bold text-center w-full'>WELCOME TO THE AUTHENTICATION DEMO</header>
      <p className='text-center w-full'>click any of these buttons to continue</p>
      <div className='flex gap-10 justify-center w-full'>
      <Link to='/login'><button className='btn text-white bg-black px-4 py-2 w-30 cursor-pointer active:scale-[0.8] transition-all duration-100 rounded'>Login</button></Link>
      <Link to='/register'><button className='btn text-white bg-black px-4 py-2 w-30 cursor-pointer active:scale-[0.8] transition-all duration-100 rounded'>Register</button></Link>
      </div>
     </div>
     </main>
  )
}
