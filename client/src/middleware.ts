import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async (req) => {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })
    console.log('session middleware', token?.type, req.nextUrl.pathname, req.nextUrl.pathname.startsWith('/dealer'))
    if (req.nextUrl.pathname.startsWith('/dealer') && token?.type === 'customer') {
      console.log('redirecting to /')
      return NextResponse.redirect(req.nextUrl.origin + '/')
    }

    if (req.nextUrl.pathname.startsWith('/order') && token?.type === 'dealer') {
      return NextResponse.redirect(req.nextUrl.origin + '/dealer')
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        const { token } = params
        return !!token
      }
    }
  }
)

export const config = {
  matcher: [
    // Dealer private routes
    '/dealer/:path*',
    // Customer private routes
    '/account'
    // Exceptions for order tracking in regex
    // '/((?!api|_next/static|_next/image|favicon.ico|order-tracking).*)'
  ]
}
