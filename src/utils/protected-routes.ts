import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'

async function protectedRoutes(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  // verificar token
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyToken`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: session?.jwt,
        name: session?.user?.name,
        email: session?.user?.email
      })
    }
  )

  const data = await response.json()

  if (!session || data.error) {
    context.res.setHeader(
      'Location',
      `/sign-in?callbackUrl=${context.resolvedUrl}`
    )

    context.res.statusCode = 302
    return null
  }

  return session
}

export default protectedRoutes
