import { IStandup, ItemStatus } from '../types'
import { makeRequest } from '../utils'
import { mockStandup } from './mock'

describe.only('/api/updateStandupHandler', () => {
  let seedStandup: IStandup

  beforeAll(async () => {
    const [, response] = await makeRequest('POST', {}, mockStandup)
    seedStandup = response.standup
  })

  afterAll(async () => {
    await makeRequest('TEARDOWN')
  })

  test('edits a standup', async () => {
    const newItems = [
      {
        description: 'Sample standup edited',
        date: Date.now(),
        status: ItemStatus.Done,
      },
    ]

    const [statusCode, data] = await makeRequest(
      'PUT',
      { id: seedStandup._id },
      { items: newItems }
    )

    expect(statusCode).toBe(200)
    expect(data).toEqual(expect.objectContaining({ items: newItems }))
  })
})
