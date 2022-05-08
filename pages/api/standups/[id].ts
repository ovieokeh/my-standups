import { NextApiRequest, NextApiResponse } from 'next'

import {
  setupMongooseClient,
  getStandup,
  modifyStandup,
  deleteStandup,
  addStandupItem,
} from '../../../utils'
import { IStandup, IStandupItem } from '../../../types'

export default async function standupHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await setupMongooseClient()

  try {
    const {
      method,
      query: { id },
      body,
    } = request
    const standup = await getStandup(id as string)

    if (!standup) {
      return response.status(404).json({
        message: 'standup not found',
      })
    }

    const methodMapping = {
      GET: async () => {
        try {
          let statusCode = 200
          let result = standup

          if (!response) {
            statusCode = 404
            result = { message: 'standup not found' } as any
          }

          response.status(statusCode).json(result)
        } catch (error) {
          response.status(500).json(error)
        }
      },
      PUT: async () => {
        try {
          const parsedBody = JSON.parse(body)
          let action: any =
            parsedBody.action === 'update' ? modifyStandup : addStandupItem
          let payload: any =
            parsedBody.action === 'update'
              ? parsedBody
              : (parsedBody.item as IStandupItem)

          const result = await action(standup, { ...payload })
          response.status(200).json(result)
        } catch (error) {
          let statusCode = 500
          if (error.message === 'invalid items provided') {
            statusCode = 400
          }
          response.status(statusCode).json(error)
        }
      },
      DELETE: async () => {
        try {
          await deleteStandup(standup._id)
          response.status(204).send({})
        } catch (error) {
          response.status(500).json(error)
        }
      },
    }

    const methodAction = methodMapping[method]
    if (!methodAction) {
      return response.status(400).json({
        message: 'invalid method',
      })
    }

    await methodAction()
  } catch (error) {
    response.status(500).json({
      message: 'an error occurred',
      error,
    })
  }
}
