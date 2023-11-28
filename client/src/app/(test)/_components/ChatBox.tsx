import axios from 'axios'
import { type FunctionComponent } from 'react'

interface Message {
  sender: string | null
  body: string
}

interface TestChatBoxProps {
  messages: Message[]
  mode: 'client' | 'dealer'
  orderId: string
}

const TestChatBox: FunctionComponent<TestChatBoxProps> = ({ messages, mode, orderId }) => {
  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    console.log('handleSendMessage', event.currentTarget.message.value)
    await axios.post(`http://localhost:3001/api/${orderId}/chat`, {
      sender: mode === 'client' ? null : 'driver1',
      body: event.currentTarget.message.value
    })
  }

  return (
    <div className='flex flex-col gap-3 border border-red-700 bg-blue-400 px-5 py-7'>
      <h1 className='font-semibold text-red-800'>Test Chat Box</h1>
      <div className='flex max-h-[300px] flex-col gap-2 overflow-y-auto'>
        {Array.isArray(messages) &&
          messages?.map((message, index) => (
            <div key={index} className='border bg-violet-700'>
              <p className='font-semibold text-white'>{message.sender ?? 'client'}</p>
              <p className='text-white'>{message.body}</p>
            </div>
          ))}
      </div>
      <form
        onSubmit={(event) => {
          void handleSendMessage(event)
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

export default TestChatBox
