import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { type NextMiddlewareResult } from 'next/dist/server/web/types'
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server'

const middleware = async (req: NextRequest, event: NextFetchEvent): Promise<NextMiddlewareResult> => {
  console.log('middleware', req.nextUrl.pathname)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })
  const isAuthenticated = !!token

  if (req.nextUrl.pathname.startsWith('/auth') && isAuthenticated) {
    if (token?.type === 'customer') {
      return NextResponse.redirect(req.nextUrl.origin + '/')
    } else if (token?.type === 'dealer') {
      return NextResponse.redirect(req.nextUrl.origin + '/dealer')
    }
  }

  const withAuthMiddleware = withAuth(
    async (req) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
      })

      if (req.nextUrl.pathname.startsWith('/dealer/') && token?.type === 'customer') {
        return NextResponse.redirect(req.nextUrl.origin + '/')
      } else if (req.nextUrl.pathname.startsWith('/order') && token?.type === 'dealer') {
        return NextResponse.redirect(req.nextUrl.origin + '/dealer')
      }
    },
    {
      pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
      },
      callbacks: {
        authorized: (params) => {
          const { token } = params
          return !!token
        }
      }
    }
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return !req.nextUrl.pathname.startsWith('/auth') ? await withAuthMiddleware(req, event) : NextResponse.next()
}

export default middleware

export const config = {
  matcher: [
    // Auth routes
    '/auth/:path*',
    // Dealer private routes
    '/dealer/:path*',
    // Customer private routes
    '/account'
    // Exceptions for order tracking in regex
    // '/((?!api|_next/static|_next/image|favicon.ico|order-tracking).*)'
  ]
}
