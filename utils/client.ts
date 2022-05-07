// Credit: https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/
import { MongoClient } from 'mongodb'
import 'dotenv/config'

export const setupClient = () => {
  const env = process.env.NODE_ENV
  const uri =
    env === 'test' ? process.env.databaseUrlTest : process.env.databaseUrl
  const options = {}

  let client: MongoClient

  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  if (env === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options)
    }

    client = global._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
  }

  return client
}
