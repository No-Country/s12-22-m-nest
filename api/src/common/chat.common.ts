import { type Model } from 'mongoose'
import { type Chat } from '../chat/entities/chat.mongo-entity'

export const createChat = async (chatModel: Model<Chat>) => {
  return await chatModel.create({
    messages: []
  })
}

export const findChat = async (id: string, chatModel: Model<Chat>) => {
  return await chatModel.findById(id).exec()
}
