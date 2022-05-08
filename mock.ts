import { IStandups, ItemStatus } from './types'

const items: { [_id: string]: IStandups } = {
  '05/8/2022': [
    {
      name: 'GO-190',
      createdAt: 1651960800000,
      items: [
        {
          createdAt: new Date(1651960800000 - 100).getTime(),
          description: 'Passed regression test',
          status: ItemStatus.Done,
        },
        {
          createdAt: new Date(1651960800000 - 200).getTime(),
          description: 'Need to resolve a session',
          status: ItemStatus.Done,
        },
      ],
    },
    {
      name: 'GO-188',
      createdAt: 1651960800000 - 10000,
      items: [
        {
          createdAt: new Date(1651960800000 - 10000 - 100).getTime(),
          description: 'Is now ready for testing',
          status: ItemStatus.Done,
        },
      ],
    },
    {
      name: 'GO-187',
      createdAt: 1651960800000 - 20000,
      items: [
        {
          createdAt: new Date(1651960800000 - 20000 - 100).getTime(),
          description: 'Ready for review',
          status: ItemStatus.Done,
        },
        {
          createdAt: new Date(1651960800000 - 20000 - 200).getTime(),
          description: 'Only tests are left',
          status: ItemStatus.Pending,
        },
        {
          createdAt: new Date(1651960800000 - 20000 - 300).getTime(),
          description: 'Will work on it with Tazkia today',
          status: ItemStatus.Pending,
        },
      ],
    },
  ],
  '05/07/2022': [
    {
      name: 'GO-190',
      createdAt: 1651874400000,
      items: [
        {
          createdAt: new Date(1651874400000 - 100).getTime(),
          description: "Waiting for Pragathi's regression test",
          status: ItemStatus.Done,
        },
      ],
    },
    {
      name: 'GO-188',
      createdAt: 1651874400000 - 11000,
      items: [
        {
          createdAt: new Date(1651874400000 - 11000 - 100).getTime(),
          description: 'Is now ready for testing',
          status: ItemStatus.Pending,
        },
        {
          createdAt: new Date(1651874400000 - 11000 - 200).getTime(),
          description: 'Still needs one more approval',
          status: ItemStatus.Pending,
        },
      ],
    },
    {
      name: 'GO-187',
      createdAt: 1651874400000 - 12000,
      items: [
        {
          createdAt: new Date(1651874400000 - 12000 - 100).getTime(),
          description: 'Ready for review',
          status: ItemStatus.Pending,
        },
        {
          createdAt: new Date(1651874400000 - 12000 - 200).getTime(),
          description: 'Only tests are left',
          status: ItemStatus.Pending,
        },
        {
          createdAt: new Date(1651874400000 - 12000 - 300).getTime(),
          description: 'Will work on it with Tazkia today',
          status: ItemStatus.Pending,
        },
      ],
    },
  ],
}

export default items
