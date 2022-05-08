import { IStandup, ItemStatus } from '../types'
import { makeRequest, prepareResponseForAssertion } from '../utils'
import { mockStandup } from './mock'

describe('/api/updateStandupHandler', () => {
  let seedStandup: IStandup

  beforeAll(async () => {
    const [, response] = await makeRequest('POST', {}, mockStandup)
    seedStandup = response.standup
  })

  afterAll(async () => {
    await makeRequest('TEARDOWN')
  })

  test('edits a standup', async () => {
    const newItem = {
      description: 'Sample standup edited',
      status: ItemStatus.Done,
    }

    const [statusCode, data] = await makeRequest(
      'PUT',
      { id: seedStandup?._id },
      { item: newItem }
    )

    expect(statusCode).toBe(200)
    expect(data).toEqual(
      prepareResponseForAssertion({
        ...seedStandup,
        items: [...seedStandup.items, newItem],
      })
    )
  })
})
