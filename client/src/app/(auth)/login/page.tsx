'use client'
import { useState, type FunctionComponent } from 'react'
import { signIn } from 'next-auth/react'

interface FormData {
  email: string
  password: string
}

const Page: FunctionComponent = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    console.log(formData)
    const responseNextAuth = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false
    })
    console.log(responseNextAuth)

    if (responseNextAuth?.error !== null) {
      const error = JSON.parse(responseNextAuth?.error as string)
      const { message } = error
      console.log(message)
    }
  }

  return (
    <form
      className='flex flex-col'
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
    >
      <input
        type='text'
        name='email'
        value={formData.email}
        className='border-2 border-rose-500'
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        value={formData.password}
        className='border-2 border-rose-500'
        onChange={handleChange}
      />
      <input type='submit' value={'Enviar'} className='bg-[pink]' />
    </form>
  )
}

export default Page
