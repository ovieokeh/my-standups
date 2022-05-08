import mongoose, { Mongoose } from 'mongoose'
import 'dotenv/config'

import { IStandup, IStandupItem } from '../types'

mongoose.Promise = global.Promise || mongoose.Promise
const { Schema } = mongoose

const itemSchema = new Schema({
  description: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
})

export const StandupItemModel =
  mongoose.models['StandupItem'] ||
  mongoose.model<IStandupItem>('StandupItem', itemSchema)

const standupSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  items: [itemSchema],
})

export const StandupModel =
  mongoose.models['Standup'] ||
  mongoose.model<IStandup>('Standup', standupSchema)

export const setupMongooseClient = async (): Promise<Mongoose> => {
  const env = process.env.NODE_ENV
  const uri =
    env === 'test' ? process.env.databaseUrlTest : process.env.databaseUrl

  const client = await mongoose.connect(uri)
  return client
}
