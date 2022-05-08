import { IStandup } from '../types'
import { makeRequest, prepareResponseForAssertion } from '../utils'
import { mockStandup } from './mock'

describe('/api/getAllStandupsHandler', () => {
  let seedStandup: IStandup

  beforeAll(async () => {
    const [, response] = await makeRequest('POST', {}, mockStandup)
    seedStandup = response.standup
  })

  afterAll(async () => {
    await makeRequest('TEARDOWN')
  })

  test('returns all standups', async () => {
    const [statusCode, data] = await makeRequest('GET')

    expect(statusCode).toBe(200)
    expect(data.data).toEqual([prepareResponseForAssertion(mockStandup)])
  })
})
