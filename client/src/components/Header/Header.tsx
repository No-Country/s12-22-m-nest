import { type FunctionComponent } from 'react'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getUser } from '@/services/users/getUser.service'
import { type User } from '@/interfaces'
import HeaderContent from './Content'

interface Props {
  theme?: 'light' | 'transparent'
  layout?: 'simple' | 'full'
  withBorder?: boolean
}

const Header: FunctionComponent<Props> = async ({ theme = 'transparent', layout = 'full', withBorder = false }) => {
  const session = await getServerSession(authOptions)
  const { data: user } = await getUser(session?.user?.id ?? '')

  return <HeaderContent theme={theme} layout={layout} withBorder={withBorder} session={session} user={user as User} />
}

export default Header
