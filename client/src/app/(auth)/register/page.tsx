import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.const'

const Register: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      <h1>Register</h1>
    </div>
  )
}

export default Register
