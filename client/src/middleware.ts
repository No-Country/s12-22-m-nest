/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/indent */
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { type NextMiddlewareResult } from 'next/dist/server/web/types'
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server'

const checkStartsWith = (path: string, routes: string[]): boolean => routes.some((route) => path.startsWith(route))
const customerRedirect = '/'
const shopRedirect = '/shops'
const dealerRedirect = '/dealer'

const middleware = async (req: NextRequest, event: NextFetchEvent): Promise<NextMiddlewareResult> => {
  const origin = req.nextUrl.origin
  const customerRoutes = ['/checkout', '/order-tracking/']
  const dealerRoutes = ['/dealer/']
  const shopRoutes = ['/shops/']
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })
  const isAuthenticated = !!token

  if (req.nextUrl.pathname.startsWith('/auth') && isAuthenticated) {
    switch (token?.type) {
      case 'customer':
        return NextResponse.redirect(origin + customerRedirect)
      case 'dealer':
        return NextResponse.redirect(origin + dealerRedirect)
      case 'shop':
        return NextResponse.redirect(origin + shopRedirect)
    }
  }

  const withAuthMiddleware = withAuth(
    async (req) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
      })

      if (checkStartsWith(req.nextUrl.pathname, dealerRoutes)) {
        switch (token?.type) {
          case 'customer':
            return NextResponse.redirect(origin + customerRedirect)
          case 'shop':
            return NextResponse.redirect(origin + shopRedirect)
        }
      }

      if (checkStartsWith(req.nextUrl.pathname, customerRoutes)) {
        switch (token?.type) {
          case 'dealer':
            return NextResponse.redirect(origin + dealerRedirect)
          case 'shop':
            return NextResponse.redirect(origin + shopRedirect)
        }
      }

      const id = req.nextUrl.pathname.slice(1).split('/')[1]
      console.log('id', id, token?.shopId)
      if (checkStartsWith(req.nextUrl.pathname, shopRoutes)) {
        switch (token?.type) {
          case 'dealer':
            return NextResponse.redirect(origin + dealerRedirect)
          case 'customer':
            return NextResponse.redirect(origin + customerRedirect)
          case 'shop':
            if (token?.shopId !== id) {
              return NextResponse.redirect(origin + shopRedirect)
            }
        }
      }
      // if (checkStartsWith(req.nextUrl.pathname, dealerRoutes) && token?.type === 'customer') {
      //   return NextResponse.redirect(origin + '/')
      // } else if (checkStartsWith(req.nextUrl.pathname, dealerRoutes) && token?.type === 'shop') {
      //   return NextResponse.redirect(origin + '/shops')
      // } else if (checkStartsWith(req.nextUrl.pathname, customerRoutes) && token?.type === 'dealer') {
      //   return NextResponse.redirect(origin + '/dealer')
      // } else if (checkStartsWith(req.nextUrl.pathname, shopRoutes) && token?.type !== 'shop') {
      //   return NextResponse.redirect(origin + '/')
      // }
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

  return !req.nextUrl.pathname.startsWith('/auth')
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await withAuthMiddleware(req, event)
    : NextResponse.next()
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
    '/order-tracking/:path*',
    // Shop private routes
    '/shops/:path/active-orders',
    '/shops/:path/create-product'
  ]
}
