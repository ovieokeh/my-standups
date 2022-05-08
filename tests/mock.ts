import { IStandup, ItemStatus } from '../types'

const mockDate = new Date(1651960800000)
export const mockStandup: IStandup = {
  name: 'AB-123',
  createdAt: mockDate.toISOString() as any,
  items: [
    {
      description: 'Passed regression test',
      status: ItemStatus.Done,
    },
    {
      description: 'Need to resolve a session issue',
      status: ItemStatus.Done,
    },
  ],
}
