'use client'
import Image from 'next/image'
import { ProfileAction } from '@/components'
import { Navbar, NavbarBrand } from '@nextui-org/react'
import NextLink from 'next/link'
import { type FunctionComponent, useState } from 'react'
import { Routes } from '@/utils/constants/routes.const'

interface Props {
  theme?: 'light' | 'transparent'
  layout?: 'simple' | 'full'
}

const Header: FunctionComponent<Props> = ({ theme = 'transparent', layout = 'full' }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = (position: number): void => {
    setIsScrolled(position > 0)
  }

  const logo = '/icon/logo.svg'
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
        base: 'bg-transparent min-h-[95px]',
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
        <NextLink href={Routes.HOME}>
          <NavbarBrand>
            <Image src={logo} alt='Logo' width={75} height={30} />
          </NavbarBrand>
        </NextLink>
      </div>
      {layout === 'full' && (
        <div className='flex items-center justify-end gap-10'>
          <ProfileAction />
        </div>
      )}
    </Navbar>
  )
}

export default Header
