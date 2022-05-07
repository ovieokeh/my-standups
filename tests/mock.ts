import { IStandup, ItemStatus } from '../types'

export const mockStandup: IStandup = {
  createdAt: Date.now(),
  name: 'AB-123',
  items: [
    {
      description: 'Sample standup',
      status: ItemStatus.Pending,
    },
  ],
}
