import { IStandups, ItemStatus } from './types'

const items: { [id: string]: IStandups } = {
  '05/8/2022': [
    {
      _id: '1',
      name: 'GO-190',
      createdAt: 1651960800000,
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
      createdAt: 1651960800000 - 10000,
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
      createdAt: 1651960800000 - 20000,
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
  '05/07/2022': [
    {
      _id: '4',
      name: 'GO-190',
      createdAt: 1651874400000,
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
      createdAt: 1651874400000 - 11000,
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
      createdAt: 1651874400000 - 12000,
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
