/* eslint-disable multiline-ternary */
'use client'
import { useSession } from 'next-auth/react'
import { Button, DynamicPopover } from '@/components'
import Menu from './Menu'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { Routes } from '@/utils/constants/routes.const'
import { NavbarContent, NavbarItem } from '@nextui-org/react'
import { type FunctionComponent } from 'react'

const ProfileAction: FunctionComponent = () => {
  const { data: session, status } = useSession()
  const { data: loggedUser } = useSWR(Endpoints.FIND_USER(session?.user?.id ?? ''))
  return (
    <NavbarContent>
      <NavbarItem className='flex items-center gap-2'>
        {status === 'authenticated' ? (
          <DynamicPopover image={loggedUser?.profileImage} backdrop='transparent'>
            <Menu loggedUser={loggedUser} />
          </DynamicPopover>
        ) : (
          <Button size='md' title='Sign In' color='primary' href={Routes.LOGIN} />
        )}
      </NavbarItem>
    </NavbarContent>
  )
}

export default ProfileAction
