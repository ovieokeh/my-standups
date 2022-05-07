import { IStandups, ItemStatus } from './types'

const items: { [id: string]: IStandups } = {
  '07/05/2022': [
    {
      _id: '1',
      name: 'GO-190',
      createdAt: Date.now(),
      items: [
        {
          id: '1',
          description: 'Passed regression test',
          status: ItemStatus.Done,
        },
        {
          id: '2',
          description: 'Need to resolve a session timed out issue',
          status: ItemStatus.Done,
        },
      ],
    },
    {
      _id: '2',
      name: 'GO-188',
      createdAt: Date.now() - 10000,
      items: [
        {
          id: '3',
          description: 'Is now ready for testing',
          status: ItemStatus.Done,
        },
      ],
    },
    {
      _id: '3',
      name: 'GO-187',
      createdAt: Date.now() - 20000,
      items: [
        {
          id: '4',
          description: 'Ready for review',
          status: ItemStatus.Done,
        },
        {
          id: '5',
          description: 'Only tests are left',
          status: ItemStatus.Pending,
        },
        {
          id: '6',
          description: 'Will work on it with Tazkia today',
          status: ItemStatus.Pending,
        },
      ],
    },
  ],
  '06/05/2022': [
    {
      _id: '4',
      name: 'GO-190',
      createdAt: Date.now() - 100000,
      items: [
        {
          id: '7',
          description: "Waiting for Pragathi's regression test",
          status: ItemStatus.Done,
        },
      ],
    },
    {
      _id: '5',
      name: 'GO-188',
      createdAt: Date.now() - 110000,
      items: [
        {
          id: '8',
          description: 'Is now ready for testing',
          status: ItemStatus.Pending,
        },
        {
          id: '9',
          description: 'Still needs one more approval',
          status: ItemStatus.Pending,
        },
      ],
    },
    {
      _id: '6',
      name: 'GO-187',
      createdAt: Date.now() - 120000,
      items: [
        {
          id: '10',
          description: 'Ready for review',
          status: ItemStatus.Pending,
        },
        {
          id: '11',
          description: 'Only tests are left',
          status: ItemStatus.Pending,
        },
        {
          id: '12',
          description: 'Will work on it with Tazkia today',
          status: ItemStatus.Pending,
        },
      ],
    },
  ],
}

export default items
