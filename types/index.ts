interface IUser {
  name: string
}

interface IStandup {
  _id?: string
  name: string
  createdAt: number
  items: IStandupItem[]
}

export enum ItemStatus {
  Initial = 'Initial',
  Done = 'Done',
  Pending = 'Pending',
  Invalid = 'Invalid',
}

interface IStandupItem {
  id?: string
  description: string
  status: keyof typeof ItemStatus
}

type IStandups = IStandup[]

export type { IUser, IStandup, IStandupItem, IStandups }
