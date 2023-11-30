// TODO: FIX ESLINT PRETTIER CONFLICTS
/* eslint-disable @typescript-eslint/indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export interface Message {
  sender: string | null
  body: string
}

@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret.createdAt
      delete ret.updatedAt
      delete ret.__v
      ret.id = ret._id
      delete ret._id
    }
  }
})
export class Chat extends Document {
  @Prop()
  messages: Message[]

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
