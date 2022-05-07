import {
  Collection,
  Document,
  MongoClient,
  ObjectId,
  UpdateResult,
} from 'mongodb'
import { createMocks } from 'node-mocks-http'

import { setupClient } from './client'
import getAllStandupsHandler from '../pages/api/standups'
import createStandupHandler from '../pages/api/standups/create'
import updateStandupHandler from '../pages/api/standups/[id]'
import { IStandup } from '../types'

class ValidationError extends Error {
  message: string
  statusCode: number

  constructor(message: string) {
    super()

    this.statusCode = 400
    this.message = message
  }
}

export const getDbClient = async (): Promise<
  [MongoClient, Collection<IStandup>]
> => {
  const client = setupClient()
  const collection = client.db('my-standups').collection<IStandup>('standup')
  await client.connect()
  return [client, collection]
}

export const getAllStandups = async (
  collection: Collection<IStandup>
): Promise<IStandup[]> => {
  const result = await collection.find({}).toArray()
  return result
}

export const getStandup = async (
  _id: string,
  collection: Collection<IStandup>
): Promise<IStandup> => {
  let idToUse: any = _id

  if (!(idToUse instanceof ObjectId)) {
    idToUse = new ObjectId(_id)
  }

  const result = await collection.findOne({ _id: idToUse as string })
  return result
}

export const addStandup = async (
  { name, createdAt, items }: IStandup,
  collection: Collection<IStandup>
): Promise<IStandup> => {
  if (!createdAt || !items || !items?.length) {
    throw new ValidationError(
      'one or more required fields is missing or items is empty'
    )
  }

  if (!items || !items?.length) {
    throw new ValidationError('invalid items provided')
  }

  let result: IStandup
  const { insertedId } = await collection.insertOne({
    name,
    createdAt,
    items,
  })

  result = await getStandup(insertedId, collection)
  return result
}

export const modifyStandup = async (
  { items }: IStandup,
  currentStandup: IStandup,
  collection: Collection<IStandup>
): Promise<Document | UpdateResult> => {
  if (!items || !items?.length) {
    throw new Error('invalid items provided')
  }

  let result = await collection.replaceOne(currentStandup, {
    ...currentStandup,
    items,
  })

  result = await getStandup(currentStandup._id, collection)
  return result
}

export const deleteStandup = async (
  _id: string,
  collection: Collection<IStandup>
): Promise<Document | UpdateResult> => {
  const result = await collection.deleteOne({ _id })
  return result
}

export const makeRequest = async (method, query = {}, body = {}) => {
  const { req, res } = createMocks({
    method,
    query,
    body,
  })

  if (method === 'TEARDOWN') {
    const [client, collection] = await getDbClient()
    await collection.deleteMany({})
    await client.close()

    console.info('teardown complete')
    return [200, true]
  }

  const methodMapping = {
    GET: Object.keys(query).length
      ? updateStandupHandler
      : getAllStandupsHandler,
    DELETE: updateStandupHandler,
    PUT: updateStandupHandler,
    POST: createStandupHandler,
  }

  await methodMapping[method](req, res)
  return [res._getStatusCode(), JSON.parse(res._getData())]
}
