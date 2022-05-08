import { NextApiRequest, NextApiResponse } from 'next'

import { getDbClient, getAllStandups } from '../../../utils'

export default async function getAllStandupsHandler(
  _: NextApiRequest,
  response: NextApiResponse
) {
  const [client, collection] = await getDbClient()

  try {
    await client.connect()
    const standups = await getAllStandups(collection)
    await client.close()
    response.status(200).json({ data: standups })
  } catch (error) {
    response.status(500).json({
      message: error.message,
      error,
    })
  }
}
