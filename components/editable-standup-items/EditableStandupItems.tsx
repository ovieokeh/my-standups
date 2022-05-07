import { useState } from "react"

import ActionWrapper from "../action-wrapper/ActionWrapper"
import FormInput from "../form-input/FormInput"

import { ItemStatus } from "../../types"

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
          }
        }
      }, {})

      return {
        ...acc,
        ...standupItems
      }
    }, {})
  })

  const handleItemChange = (id, field, value) => {
    setItemsState((prevItemsState) => ({
      ...prevItemsState,
      [id]: {
        ...prevItemsState[id],
        [field]: value
      }
    }))
  }

  return items.map(({ standupId, id, description, status }) => {
    const combinedIds = `${standupId}${id}`
    const editableFields = itemsState[combinedIds]
    const isComplete = status === ItemStatus.Done
    const itemClassname = `${styles.formItemGroup} ${
      isComplete ? styles.formItemGroupCompleted : ''
    }`.trim()

    if (!editableFields) {
      console.log(combinedIds, description, editableFields)
    }

    return (
      <ActionWrapper key={id} isComplete={isComplete}>
        <div className={itemClassname}>
          <FormInput
            type="textarea"
            value={editableFields?.description}
            handleChange={(event) => handleItemChange(combinedIds, 'description', event.target.value)}
          />
        </div>
      </ActionWrapper>
    )
  })
}
