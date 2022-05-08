import { Fragment } from 'react'

import EditableStandupItem from '../editable-standup-item/EditableStandupItem'
import { ItemStatus } from '../../types'

export default function EditableStandupItems({ standupId, items }) {
  items.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1
    if (a.createdAt > b.createdAt) return -1
    return 0
  })

  items.sort((a) => {
    if (a.status === ItemStatus.Done) return 1
    if (a.status === ItemStatus.Pending) return -1
    return 0
  })

  const renderedStandupItems = items.map((item) => {
    const combinedIds = `${standupId}${item._id}`

    return (
      <EditableStandupItem
        key={combinedIds}
        standupId={standupId}
        item={item}
        items={items}
      />
    )
  })

  return renderedStandupItems.length ? renderedStandupItems : null
}
