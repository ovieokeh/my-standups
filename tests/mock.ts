import { IStandup, ItemStatus } from '../types'

export const mockStandup: IStandup = {
  createdAt: Date.now(),
  items: [
    {
      description: 'Sample standup',
      date: Date.now(),
      status: ItemStatus.Pending,
    },
  ],
}
