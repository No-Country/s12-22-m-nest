'use client'
import { useState, useEffect } from 'react'
import { Type, Chat } from '@/interfaces'
import { handleSendMessage } from '@/services/orders/sendMessage.service'
import ChatIcon from '@/assets/ChatIcon'
import io, { Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import Button from './Button'
import Input from './Input'
import { serverUrl } from '@/utils/constants/env.const'

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
  const [selectedChat, setSelectedChat] = useState<string>('customer')

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
        <div className='fixed z-20 bottom-0 right-0 m-4 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-lg'>
          <div className='mb-4 flex items-center justify-between'>
            <Button rounded color={selectedChat === 'customer' ? 'primary' : 'default'}>
              Customer
            </Button>
          </div>
          <div className='h-40 overflow-y-auto'>
            { chat?.messages.map((msg, index) => (
                <div key={index} className='mb-2 border p-2'>
                  <p className='font-semibold'>{msg.sender}</p>
                  <p>{msg.body}</p>
                </div>
              ))}
          </div>
          <div className='mt-4 flex flex-col md:flex-row md:items-center'>
            <form onSubmit={handleSendMessageClick}>
              <Input type='text' name='message' value={messageInput} placeholder='Type a message...' />

              <Button type='submit' width='100%' color='primary'>
                Enviar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBox
