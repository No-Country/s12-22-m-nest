/* eslint-disable multiline-ternary */
'use client'
import { Button, DynamicPopover } from '@/components'
import Menu from './Menu'
import { routes } from '@/utils/constants/routes.const'
import { NavbarContent, NavbarItem } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { type User } from '@/interfaces'

interface Props {
  loggedUser: User
  status: 'authenticated' | 'loading' | 'unauthenticated'
}

const ProfileAction: FunctionComponent<Props> = ({ loggedUser, status }) => (
  <NavbarContent>
    <NavbarItem className='flex items-center gap-2'>
      {status === 'authenticated' ? (
        <DynamicPopover image={loggedUser?.profileImage ?? '/image/placeholder.png'} backdrop='transparent'>
          <Menu loggedUser={loggedUser} />
        </DynamicPopover>
      ) : (
        <Button size='md' title='Sign In' color='primary' href={routes.auth.LOGIN} />
      )}
    </NavbarItem>
  </NavbarContent>
)

export default ProfileAction
