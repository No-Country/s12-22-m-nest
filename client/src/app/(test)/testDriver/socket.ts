'use client'
import { wsUrl } from '@/utils/constants/env.const'
import io from 'socket.io-client'

const socket = (userId: string): any => io(`${wsUrl}?userId=${userId}&type=dealer`)

export default socket
