import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { authMiddleWare } from '#/middleware/authMiddleWare.server'
import { authClient } from '#/lib/auth-client'
import { toast } from 'sonner'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  server: {
    middleware: [authMiddleWare],
  },
})

function RouteComponent() {
  const [loading, setLoading] = useState(false)

  const session = authClient.useSession()

  const navigate = useNavigate()

  const signOut = async () => {
    setLoading(true)

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: '/' })
          },
          onError({ error }) {
            toast.error(
              error.message
                ? error.message
                : 'Failed to sign out, please try again',
            )
          },
        },
      })
    } finally {
      setLoading(false)
    }
  }

  if (session.isPending) {
    ;<main className="w-full min-h-screen flex items-center justify-center">
      <header className="w-full text-center">
        LOADING... {session.data?.user.name.toLocaleUpperCase()}!
      </header>
    </main>
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full justify-center gap-5 flex flex-col">
        <header className="w-full text-center">
          WELCOME TO YOUR DASHBOARD{' '}
          {session.data?.user.firstName.toLocaleUpperCase()}!
        </header>
        <button
          disabled={loading}
          className="px-4 py-2 w-30 mx-auto bg-black cursor-pointer disabled:opacity-50 text-white rounded active:scale-[0.8] disabled:active:scale-[1] duration-100 transition-all"
          onClick={signOut}
        >
          {loading ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </main>
  )
}
