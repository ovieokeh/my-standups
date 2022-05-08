import { useEffect } from 'react'

import { IStandup, ItemStatus } from '../types'

export default function useSyncPendingItems({
  todaysStandups,
  previousDayStandups,
  mutate,
}) {
  const syncStandup = async (unsynced: IStandup[]) => {
    const promises = unsynced.map((standup) =>
      fetch('${window.location.origin}/api/standups', {
        method: 'POST',
        body: JSON.stringify({
          ...standup,
        }),
      })
    )

    await Promise.all(promises)
    await mutate()
    console.info(`Synced ${unsynced.length} standups`)
  }

  useEffect(() => {
    const standups = todaysStandups?.map((standup) => standup) || []
    const allItems = standups.map((i) => i.items)
    const itemIds = allItems.flat().map((i) => i._id)
    const unfinishedStandups = []

    previousDayStandups?.forEach((standup) => {
      const unfinishedItems = standup.items.filter(
        (item) => item.status !== ItemStatus.Done && !itemIds.includes(item._id)
      )

      if (unfinishedItems.length) {
        unfinishedStandups.push({
          ...standup,
          _id: undefined,
          createdAt: undefined,
          __v: undefined,
          items: unfinishedItems,
        })
      }
    })

    if (unfinishedStandups?.length) {
      console.info(
        `Found ${unfinishedStandups.length} unsynced standups`,
        unfinishedStandups
      )
      syncStandup(unfinishedStandups)
    }
  }, [todaysStandups, previousDayStandups])
}
