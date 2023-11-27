'use client'

import { SessionProvider } from 'next-auth/react'
import type { FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const AuthSessionProvider: FunctionComponent<Props> = ({ children }) => <SessionProvider>{children}</SessionProvider>

export default AuthSessionProvider
