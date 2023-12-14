'use client'
import { type Type } from '@/interfaces'
import { wsUrl } from '@/utils/constants/env.const'
import io, { type Socket } from 'socket.io-client'

const connector = (type: Type, userId?: string): Socket => io(`${wsUrl}?userId=${userId}&type=${type}`)

export default connector
