'use client'
import { type Chat } from '@/interfaces'
import { handleSendMessage } from '@/services/orders/sendMessage.service'
import { useSession } from 'next-auth/react'
import { useState, type FunctionComponent } from 'react'

interface Props {
  mode: 'client' | 'dealer'
  orderId: string
  chat: Chat | null
}

const ChatBox: FunctionComponent<Props> = ({ mode, orderId, chat }) => {
  const { data: session } = useSession()
  const [chatVisibility, setChatVisibility] = useState<boolean>(false)

  const handleChatVisibility = (): void => {
    setChatVisibility(!chatVisibility)
  }

  return (
    <>
      <button
        className='fixed bottom-6 right-6 rounded-full bg-green-700 p-[10px] text-center text-green-50 duration-150'
        onClick={handleChatVisibility}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <circle cx='12' cy='12' r='1' fill='currentColor' />
          <circle cx='16' cy='12' r='1' fill='currentColor' />
          <circle cx='8' cy='12' r='1' fill='currentColor' />
          <path
            fill='currentColor'
            d='M19.07 4.93a10 10 0 0 0-16.28 11a1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09a10 10 0 0 0 11-16.28Zm.83 8.36a8 8 0 0 1-11 6.08a3.26 3.26 0 0 0-1.25-.26a3.43 3.43 0 0 0-.56.05l-2.82.57l.57-2.82a3.09 3.09 0 0 0-.21-1.81a8 8 0 0 1 6.08-11a8 8 0 0 1 9.19 9.19Z'
          />
        </svg>
      </button>
      {chatVisibility && (
        <div className='flex flex-col gap-3 border border-red-700 bg-blue-400 px-5 py-7'>
          <h1 className='font-semibold text-red-800'>Test Chat Box</h1>
          <div className='flex max-h-[300px] flex-col gap-2 overflow-y-auto'>
            {Array.isArray(chat?.messages) &&
              chat?.messages?.map((message, index) => (
                <div key={index} className='border bg-violet-700'>
                  <p className='font-semibold text-white'>{message.sender ?? 'client'}</p>
                  <p className='text-white'>{message.body}</p>
                </div>
              ))}
          </div>
          <form
            onSubmit={(event) => {
              void handleSendMessage(event, orderId, mode, session?.user?.id ?? 'null')
            }}
            className=' flex gap-2 py-3'
          >
            <input type='text' name='message' className='w-full border border-red-800' />
            <button type='submit' className='bg-red-800 px-4 py-2 text-white'>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBox
