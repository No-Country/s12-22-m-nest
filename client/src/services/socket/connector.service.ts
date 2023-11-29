'use client'
import { wsUrl } from '@/utils/constants/env.const'
import io, { type Socket } from 'socket.io-client'

const connector = (type: 'dealer' | 'client', userId?: string): Socket => io(`${wsUrl}?userId=${userId}&type=${type}`)

export default connector
