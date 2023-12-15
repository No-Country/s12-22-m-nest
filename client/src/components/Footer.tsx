import Image from 'next/image'
import { type FunctionComponent } from 'react'

const Footer: FunctionComponent = () => (
  <footer className='padding-general-x flex min-h-[200px] items-center justify-center border-t py-10 '>
    <div className='w-full 2xl:container'>
      <Image src='/icon/logo-black.svg' alt='Logo' width={120} height={50} />
    </div>
  </footer>
)

export default Footer
