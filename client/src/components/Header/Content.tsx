'use client'
import useSWR from 'swr'
import Image from 'next/image'
import { Cart, ProfileAction } from '@/components'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import NextLink from 'next/link'
import { type FunctionComponent, useState } from 'react'
import { routes } from '@/utils/constants/routes.const'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { headerNavBuilder } from '@/lib/headerNav.lib'
import { type Session } from 'next-auth'
import { type User } from '@/interfaces'
import MobileMenu from './MobileMenu'
import { Endpoints } from '@/utils/constants/endpoints.const'

interface Props {
  theme?: 'light' | 'transparent'
  layout?: 'simple' | 'full'
  logo?: 'white' | 'black'
  withBorder?: boolean
  session: Session | null
  user: User
}

const HeaderContent: FunctionComponent<Props> = ({
  theme = 'transparent',
  layout = 'full',
  withBorder = false,
  logo = 'black',
  session,
  user: fallbackData
}) => {
  const { status } = useSession()
  const { data: user } = useSWR(Endpoints.FIND_USER(session?.user?.id ?? ''), {
    fallbackData
  })
  const headerNavItems = headerNavBuilder(user)
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = (position: number): void => {
    setIsScrolled(position > 0)
  }

  const isShop =
    (session?.user?.type === 'customer' && !pathname.startsWith(routes.dealer.HOME)) ||
    pathname.startsWith(routes.dealer.ACCOUNT)

  const logoSrc = isScrolled
    ? isShop
      ? '/icon/shop-logo-black.svg'
      : '/icon/logo-black.svg'
    : isShop
      ? `/icon/shop-logo-${logo}.svg`
      : `/icon/logo-${logo}.svg`

  // session?.user?.type === 'customer' && !pathname.startsWith(routes.dealer.HOME)
  //   ? `/icon/shop-logo-${logo}.svg`
  //   : session?.user?.type === 'dealer' &&
  //       (pathname.startsWith(routes.dealer.HOME) || pathname.startsWith(routes.dealer.ACCOUNT))
  //     ? `/icon/logo-${logo}.svg`
  //     : `/icon/shop-logo-${logo}.svg`

  const bgColor =
    theme === 'transparent' ? (isScrolled ? 'bg-[rgba(255,_255,_255,_0.70)]' : 'bg-transparent') : 'bg-white'

  const blur = isScrolled
  const stylesNavbar = 'padding-general-x fixed py-6' + ' ' + bgColor

  const textColor = isScrolled ? 'text-black' : theme === 'transparent' ? 'text-black' : 'text-black'

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={stylesNavbar}
      classNames={{
        wrapper: 'p-0 h-auto w-full max-w-full flex justify-between  2xl:container',
        base: `bg-transparent  min-h-[100px] z-10 ${withBorder ? 'border-b' : ''}`,
        content: 'w-auto !grow-0',
        brand: 'max-w-[185px] ',
        item: `data-[active=true]:font-semibold font-light ${textColor}`
      }}
      isBlurred={blur}
      shouldHideOnScroll={false}
      onScrollPositionChange={(position) => {
        handleScroll(position)
      }}
    >
      <div className='flex gap-3 '>
        {layout === 'full' && (
          <MobileMenu
            isOpen={isMenuOpen}
            toggle={() => {
              setIsMenuOpen(!isMenuOpen)
            }}
            theme={theme}
            isScrolled={isScrolled}
          />
        )}
        <NextLink href={routes[session?.user?.type ?? 'customer'].HOME}>
          <NavbarBrand>
            <Image src={logoSrc} alt='Logo' width={120} height={60} className='h-[30px] w-full' />
          </NavbarBrand>
        </NextLink>
      </div>

      {layout === 'full' && (
        <div className='flex items-center gap-10'>
          {headerNavItems?.length > 0 && (
            <NavbarContent className=' hidden gap-8 p-0 lg:flex' justify='center'>
              {headerNavItems.map(
                (item, index) =>
                  item.visible && (
                    <NextLink href={item.href} key={index}>
                      <NavbarItem isActive={pathname === item.href}>{item.label}</NavbarItem>
                    </NextLink>
                  )
              )}
            </NavbarContent>
          )}
          <div className='flex items-center gap-3'>
            {(session?.user?.type === 'customer' || status === 'unauthenticated') && <Cart />}
            <ProfileAction status={status} loggedUser={user} />
          </div>
        </div>
      )}
    </Navbar>
  )
}

export default HeaderContent
