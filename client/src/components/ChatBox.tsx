'use client'
import { type Chat } from '@/interfaces'
import { handleSendMessage } from '@/services/orders/sendMessage.service'
import { useSession } from 'next-auth/react'
import { type FunctionComponent } from 'react'

interface TestChatBoxProps {
  mode: 'client' | 'dealer'
  orderId: string
  chat: Chat | null
}

const ChatBox: FunctionComponent<TestChatBoxProps> = ({ mode, orderId, chat }) => {
  const { data: session } = useSession()
  return (
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
  )
}

export default ChatBox
