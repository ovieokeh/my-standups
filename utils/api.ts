import { NextApiRequest, NextApiResponse } from 'next'
import { DeleteResult } from 'mongodb'
import {
  createMocks as _createMocks,
  Mocks,
  RequestOptions,
  ResponseOptions,
} from 'node-mocks-http'

import standupsIndexHandler from '../pages/api/standups'
import standupHandler from '../pages/api/standups/[id]'
import { setupMongooseClient, StandupItemModel, StandupModel } from './client'
import { IStandup, IStandupItem } from '../types'

class ValidationError extends Error {
  message: string
  statusCode: number

  constructor(message: string) {
    super()

    this.statusCode = 400
    this.message = message
  }
}

export const getAllStandups = async (): Promise<IStandup[]> => {
  const result = await StandupModel.find()
  return result
}

export const getStandup = async (id: string): Promise<IStandup> => {
  const result = await StandupModel.findById(id).exec()
  return result
}

export const addStandup = async ({
  name,
  items,
  createdAt,
}: IStandup): Promise<IStandup> => {
  if (!name || !items) {
    throw new ValidationError(
      'one or more required fields is missing (name|items)'
    )
  }

  const standup = await StandupModel.create<IStandup>({
    name,
    items,
    createdAt,
  })

  return standup
}

export const modifyStandup = async (
  currentStandup: IStandup,
  newStandup: IStandupItem
): Promise<IStandup> => {
  await StandupModel.findByIdAndUpdate(currentStandup._id, newStandup).exec()

  const modifiedStandup = await getStandup(currentStandup._id)
  return modifiedStandup
}

export const addStandupItem = async (
  currentStandup: IStandup,
  newItem: IStandupItem
): Promise<IStandup> => {
  const createNewItem = await StandupItemModel.create<IStandupItem>(newItem)
  createNewItem['__v'] = undefined
  const newItems = [...currentStandup.items, createNewItem]

  await StandupModel.findByIdAndUpdate(currentStandup._id, {
    items: newItems,
  }).exec()

  const modifiedStandup = await getStandup(currentStandup._id)
  return modifiedStandup
}

export const deleteStandup = async (_id: string): Promise<DeleteResult> => {
  const result = await StandupModel.findByIdAndDelete(_id).exec()
  return result
}

const createMocks = _createMocks as (
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions
) => Mocks<NextApiRequest, NextApiResponse>

export const makeRequest = async (method, query = {}, body = {}) => {
  const { req, res } = createMocks({
    method,
    query,
    body: JSON.stringify(body) as any,
  })

  if (method === 'TEARDOWN') {
    const { disconnect } = await setupMongooseClient()
    await StandupModel.deleteMany({}).exec()
    await StandupItemModel.deleteMany({}).exec()
    await disconnect()

    return [200, true]
  }

  const methodMapping = {
    GET: Object.keys(query).length ? standupHandler : standupsIndexHandler,
    POST: standupsIndexHandler,
    DELETE: standupHandler,
    PUT: standupHandler,
  }

  await methodMapping[method](req, res)
  return [res._getStatusCode(), JSON.parse(res._getData())]
}

export const prepareResponseForAssertion = (data: IStandup) => ({
  ...data,
  __v: expect.any(Number),
  _id: expect.any(String),
  items: data.items.map((item) => ({
    _id: expect.any(String),
    createdAt: expect.any(String),
    ...item,
  })),
})
