import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      <h1>Availability</h1>
    </div>
  )
}

export default Page
