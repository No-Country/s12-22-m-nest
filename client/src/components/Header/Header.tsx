'use client'
import Image from 'next/image'
import { Cart, ProfileAction } from '@/components'
import { Navbar, NavbarBrand } from '@nextui-org/react'
import NextLink from 'next/link'
import { type FunctionComponent, useState } from 'react'
import { routes } from '@/utils/constants/routes.const'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

interface Props {
  theme?: 'light' | 'transparent'
  layout?: 'simple' | 'full'
  withBorder?: boolean
}

const Header: FunctionComponent<Props> = ({ theme = 'transparent', layout = 'full', withBorder = false }) => {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = (position: number): void => {
    setIsScrolled(position > 0)
  }

  const logo = pathname.startsWith(routes.dealer.HOME) ? '/icon/logo.svg' : '/icon/shop-logo.svg'
  const bgColor = theme === 'transparent' ? (isScrolled ? 'bg-[#FFFFFF1]' : 'bg-transparent') : 'bg-white'

  const blur = isScrolled
  const stylesNavbar = 'px-10 fixed py-6' + ' ' + bgColor

  const textColor = isScrolled ? 'text-black' : theme === 'transparent' ? 'text-white' : 'text-black'

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
      <div className='flex gap-3'>
        <NextLink href={routes[session?.user?.type ?? 'customer'].HOME}>
          <NavbarBrand>
            <Image src={logo} alt='Logo' width={120} height={50} />
          </NavbarBrand>
        </NextLink>
      </div>
      {layout === 'full' && (
        <div className='flex items-center gap-3'>
          {(session?.user?.type === 'customer' || status === 'unauthenticated') && <Cart />}
          <ProfileAction />
        </div>
      )}
    </Navbar>
  )
}

export default Header
