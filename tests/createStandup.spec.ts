import { IStandup } from '../types'
import { makeRequest } from '../utils'
import { mockStandup } from './mock'

describe('/api/createStandupHandler', () => {
  afterAll(async () => {
    await makeRequest('TEARDOWN')
  })

  test('creates a standup successfully', async () => {
    const [statusCode, data] = await makeRequest('POST', {}, mockStandup)

    const standup = data.standup as IStandup

    expect(statusCode).toBe(201)
    expect(standup).toEqual(
      expect.objectContaining({
        ...mockStandup,
      })
    )
  })
})
