interface IUser {
  name: string
}

interface IStandup {
  _id?: string
  createdAt: number
  items: IItem[]
}

export enum ItemStatus {
  Initial = 'Initial',
  Done = 'Done',
  Pending = 'Pending',
  Invalid = 'Invalid',
}

interface IItem {
  id?: string
  description: string
  date: number
  status: keyof typeof ItemStatus
}

type IStandups = IStandup[]

export type { IUser, IStandup, IItem, IStandups }
