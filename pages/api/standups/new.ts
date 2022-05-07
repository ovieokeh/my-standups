import { NextApiRequest, NextApiResponse } from 'next'

import { getDbClient, addStandup } from '../../../utils'
import { IStandup } from '../../../types'

export default async function createStandup(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const [client, collection] = await getDbClient()

  try {
    const standup = await addStandup(
      JSON.parse(request.body) as IStandup,
      collection
    )
    // await client.close()

    response.status(201).json({
      message: 'standup created successfully',
      standup,
    })
  } catch (error) {
    response.status(error.statusCode || 500).json({
      message: 'an error occurred',
      error: error.message || error,
    })
  }
}
