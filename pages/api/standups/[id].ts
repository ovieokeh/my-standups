import { NextApiRequest, NextApiResponse } from 'next'

import {
  getDbClient,
  getStandup,
  modifyStandup,
  deleteStandup,
} from '../../../utils/'
import { IStandup } from '../../../types'

export default async function updateStandup(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const [client, collection] = await getDbClient()

  try {
    const {
      method,
      query: { id },
      body,
    } = request
    const standup = await getStandup(id as string, collection)

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
          const result = await modifyStandup(
            body as IStandup,
            standup,
            collection
          )
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
          await deleteStandup(standup._id, collection)
          response.status(204)
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
    await client.close()
  } catch (error) {
    response.status(500).json({
      message: 'an error occurred',
      error,
    })
  }
}
