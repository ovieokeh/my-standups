interface IUser {
  name: string
}

interface IStandup {
  _id?: string
  createdAt: number
  items: IItem[]
}

interface IItem {
  id?: string
  description: string
  date: number
  status: {
    Initial: 'Initial'
    Done: 'Done'
    Pending: 'Pending'
    Invalid: 'Invalid'
  }
}

type IStandups = IStandup[]

export type { IUser, IStandup, IItem, IStandups }
