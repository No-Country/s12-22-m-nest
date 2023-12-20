'use client'
import { useRef, useState } from 'react'
import { type Type, type Chat, type OrderInterface } from '@/interfaces'
import { handleSendMessage } from '@/services/orders/sendMessage.service'
import ChatIcon from '@/assets/ChatIcon'
import CloseIcon from '@/assets/CloseIcon'
import SendMessageIcon from '@/assets/SendMessageIcon'
import { useSession } from 'next-auth/react'
import Button from './Button'
import Input from './Input'

interface Props {
  mode: Type
  orderId: string
  order: OrderInterface | null
  chat: Chat | null
}

const ChatBox: React.FC<Props> = ({ mode, orderId, chat, order }) => {
  const { data: session } = useSession()
  const formRef = useRef<HTMLFormElement>(null)
  const [messageInput, setMessageInput] = useState<string>('')
  const [chatOpen, setChatOpen] = useState<boolean>(false)

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
      formRef.current?.reset()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <>
      <Button color='primary' variant='solid' className='fixed bottom-6 right-6 z-20' onClick={toggleChat}>
        <ChatIcon fillColor='white' />
      </Button>
      {chatOpen && (
        <div className='fixed bottom-0 right-0  z-50 flex h-[100vh] w-full flex-col items-end rounded-xl  border border-gray-300 bg-white p-4 shadow-lg sm:m-4  sm:h-[80vh] sm:w-[350px]'>
          <div onClick={toggleChat} className='cursor-pointer'>
            <CloseIcon fillColor='#166534' />
          </div>
          <div className='flex w-full flex-grow  flex-col overflow-y-auto '>
            {chat?.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 max-w-xs rounded-lg border p-2 text-sm ${
                  (msg.sender === null && session?.user?.type === 'customer') ||
                  (msg.sender !== null && session?.user?.type === 'dealer')
                    ? 'align-end w-9/12 self-end border-green-500 bg-green-100'
                    : 'w-9/12 border-yellow-500 bg-yellow-100'
                }`}
              >
                <p className='font-semibold'>
                  {msg.sender === null
                    ? `${order?.client?.firstName} ${order?.client?.lastName}`
                    : `${order?.dealer?.firstName} ${order?.dealer?.lastName}`}
                </p>
                <p>{msg.body}</p>
              </div>
            ))}
          </div>
          <div className='mt-4 flex w-full flex-row items-center'>
            <form onSubmit={handleSendMessageClick} className='flex w-full items-center gap-2 ' ref={formRef}>
              <Input
                type='text'
                name='message'
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value)
                }}
                placeholder='Escribe acá...'
                fullWidth
              />
              <Button type='submit' size='sm' radius='full' className='aspect-square max-h-[40px] min-h-[40px] '>
                <SendMessageIcon fillColor='white' width={16} height={16} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBox
