'use client'
import { wsUrl } from '@/utils/constants/env.const'
import io from 'socket.io-client'

const socket = io(`${wsUrl}?userId=driver1&type=dealer`)

export default socket
