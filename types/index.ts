import { Types } from 'mongoose'

interface IUser {
  name: string
}

interface IStandup {
  _id?: string
  createdAt?: number
  name: string
  items: IStandupItem[]
}

export enum ItemStatus {
  Pending = 'Pending',
  Done = 'Done',
}

interface IStandupItem {
  _id?: string
  createdAt?: number
  description: string
  status: keyof typeof ItemStatus
}

type IStandups = IStandup[]

export type { IUser, IStandup, IStandupItem, IStandups }
