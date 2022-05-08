import { useState } from 'react'

import EditableStandupItem from '../editable-standup-item/EditableStandupItem'

import styles from './EditableStandupItems.module.scss'

export default function EditableStandupItems({ standups, items }) {
  const [itemsState, setItemsState] = useState(() => {
    return standups.reduce((acc, currentStandup) => {
      const standupItems = currentStandup.items.reduce((acc2, currentItem) => {
        return {
          ...acc2,
          [`${currentStandup._id}${currentItem.id}`]: {
            description: currentItem.description,
            status: currentItem.status,
          },
        }
      }, {})

      return {
        ...acc,
        ...standupItems,
      }
    }, {})
  })

  const handleItemChange = (id, field, value) => {
    setItemsState((prevItemsState) => ({
      ...prevItemsState,
      [id]: {
        ...prevItemsState[id],
        [field]: value,
      },
    }))
  }

  return items.map(({ standupId, id, description, status }) => {
    const combinedIds = `${standupId}${id}`
    const editableFields = itemsState[combinedIds]

    return (
      <EditableStandupItem
        key={combinedIds}
        id={combinedIds}
        status={status}
        editableFields={editableFields}
        handleChange={(event) =>
          handleItemChange(combinedIds, 'description', event.target.value)
        }
      />
    )
  })
}
