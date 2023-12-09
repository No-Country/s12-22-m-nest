import Image from 'next/image'
import { type FunctionComponent } from 'react'

const Footer: FunctionComponent = () => (
  <footer className='flex min-h-[200px] items-center justify-start border-t p-10 '>
    <Image src='/icon/logo.svg' alt='Logo' width={120} height={50} />
  </footer>
)

export default Footer
