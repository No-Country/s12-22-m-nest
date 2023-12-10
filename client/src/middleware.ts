import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { type NextMiddlewareResult } from 'next/dist/server/web/types'
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server'

const checkStartsWith = (path: string, routes: string[]): boolean => routes.some((route) => path.startsWith(route))

const middleware = async (req: NextRequest, event: NextFetchEvent): Promise<NextMiddlewareResult> => {
  const customerRoutes = ['/account', '/checkout', '/order-tracking/']
  const dealerRoutes = ['/dealer/']
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

      if (checkStartsWith(req.nextUrl.pathname, dealerRoutes) && token?.type === 'customer') {
        return NextResponse.redirect(req.nextUrl.origin + '/')
      } else if (checkStartsWith(req.nextUrl.pathname, customerRoutes) && token?.type === 'dealer') {
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
    '/account',
    '/checkout',
    '/order-tracking/:path*'
  ]
}
