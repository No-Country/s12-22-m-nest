/* eslint-disable @typescript-eslint/indent */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import { type FunctionComponent } from 'react'
import { headerNavBuilder } from '@/lib/headerNav.lib'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'

interface Props {
  isOpen: boolean
  toggle: () => void
  theme: 'light' | 'transparent'
  isScrolled: boolean
}

const ToggleBtn: FunctionComponent<Props> = ({ isOpen, toggle, theme, isScrolled }) => (
  <Image
    src={isOpen ? '/icon/cross.svg' : '/icon/menu-black.svg'}
    className='cursor-pointer lg:hidden'
    alt='toggle'
    width={24}
    height={24}
    onClick={toggle}
  />
)

const MobileMenu: FunctionComponent<Props> = ({ isOpen, toggle, theme, isScrolled }: Props) => {
  const { data } = useSession()
  const { data: user } = useSWR(Endpoints.FIND_USER(data?.user?.id ?? ''))
  console.log(user)
  const headerNavItems = headerNavBuilder(user)
  const pathname = usePathname()
  const activeClass = (href: string): any => (pathname === href ? '!font-semibold' : '!font-light')

  return (
    <>
      {!isOpen && <ToggleBtn isOpen={isOpen} toggle={toggle} theme={theme} isScrolled={isScrolled} />}
      {createPortal(
        <>
          {isOpen && (
            <div className='padding-general-x fixed left-0 top-0 z-50 flex h-screen w-screen flex-col gap-14 bg-white py-8'>
              <div className='flex w-full items-center justify-between'>
                <div>
                  <Image src='/icon/logo-black.svg' alt='logo' width={66} height={35} className='h-[30px] w-full' />
                </div>

                <div className='flex cursor-pointer items-center gap-1' onClick={toggle}>
                  <p className='text-black'>Cerrar</p>
                  <Image src='/icon/cross-black.svg' alt='logo' width={40} height={40} />
                </div>
              </div>
              <div className='flex  w-full flex-col gap-6'>
                {Array.isArray(headerNavItems) &&
                  headerNavItems?.map((item, index) => (
                    <div key={index} className='flex h-full flex-col items-start justify-center' onClick={toggle}>
                      <Link href={item.href}>
                        <p className={`text-xl text-black ${activeClass(item.href)}`}>{item.label}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </>
  )
}

export default MobileMenu
