'use client'
import { useState, useEffect } from 'react'
import { type Type, type Chat } from '@/interfaces'
import { handleSendMessage } from '@/services/orders/sendMessage.service'
import ChatIcon from '@/assets/ChatIcon'
import CloseIcon from '@/assets/CloseIcon'
import SendMessageIcon from '@/assets/SendMessageIcon'
import io, { Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import Button from './Button'
import Input from './Input'
import useSWR from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
interface User {
  role: string
}
interface Message {
  id: string
  sender: string
  text: string
}
interface Props {
  mode: Type
  orderId: string
  chat: Chat | null
}

const ChatBox: React.FC<Props> = ({ mode, orderId, chat }) => {
  const { data: session } = useSession()
  const [messageInput, setMessageInput] = useState<string>('')
  const [chatOpen, setChatOpen] = useState<boolean>(false)
  const { data: currentUser } = useSWR(Endpoints.FIND_USER(session?.user?.id ?? ''))

  const toggleChat = (): void => {
    setChatOpen(!chatOpen)
  }

  const handleSendMessageClick = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault()
      const { message } = e.target
      if (message.value.length <= 0) return
      await handleSendMessage(orderId, mode, session?.user?.id ?? '', message.value)
      setMessageInput('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <>
      <Button color='primary' variant='solid' className='fixed bottom-6 right-6' onClick={toggleChat}>
        <ChatIcon fillColor='white' />
      </Button>
      {chatOpen && (
        <div className='w-1/2 fixed bottom-0  right-0 z-20 m-4 p-6 rounded-lg border border-gray-300 bg-white shadow-lg w-80'>

          <Button color='primary' variant='solid' className='absolute right-2 top-2' onClick={toggleChat}>
            <CloseIcon fillColor='white' />
          </Button>
          <div className='flex flex-col h-60 overflow-y-auto w-'>
            {chat?.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 max-w-xs rounded-lg border p-2 ${
                  msg.sender === session?.user?.id
                    ? 'w-9/12 border-green-500 bg-green-100 self-end align-end'
                    : 'w-9/12 border-yellow-500 bg-yellow-100'
                }`}
              >
                <p className='font-semibold'>
                  {msg.sender === session?.user?.id ? 'You' : currentUser?.firstName ?? msg.sender}
                </p>
                <p>{msg.body}</p>
              </div>
            ))}
          </div>
          <div className='mt-4 flex flex-row items-center'>
            <form onSubmit={handleSendMessageClick} className='flex w-80'>
              <Input
                type='text'
                name='message'
                value={messageInput}
                onChange={(e) => { setMessageInput(e.target.value) }}
                placeholder='Escribe acá...'
                className='rounded-md p-2 w-full'
              />
              <button type='submit' className='h-12 w-12 flex items-center justify-center rounded-full bg-green-100 ml-2'>
                <SendMessageIcon fillColor='white' />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBox
