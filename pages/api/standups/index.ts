import { NextApiRequest, NextApiResponse } from 'next'
import { IStandup } from '../../../types'

import { setupMongooseClient, getAllStandups, addStandup } from '../../../utils'

export default async function standupsIndexHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await setupMongooseClient()
  try {
    const methodMapping = {
      GET: async () => {
        try {
          const standups = await getAllStandups()
          response.status(200).json({ data: standups })
        } catch (error) {
          response.status(500).json({
            message: error.message,
            error,
          })
        }
      },
      POST: async () => {
        try {
          const standup = await addStandup(JSON.parse(request.body) as IStandup)

          response.status(201).json({
            message: 'standup created successfully',
            standup,
          })
        } catch (error) {
          response.status(error.statusCode || 500).json({
            message: 'an error occurred',
            error,
          })
        }
      },
    }

    const methodAction = methodMapping[request.method]
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
