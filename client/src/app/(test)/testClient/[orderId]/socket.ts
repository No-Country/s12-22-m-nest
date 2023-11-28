'use client'
import { wsUrl } from '@/utils/constants/env.const'
import io from 'socket.io-client'

const socket = io(`${wsUrl}?type=client`)

export default socket
