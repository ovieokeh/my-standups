import { useState } from 'react'
import useStandupsApi from '../../hooks/useStandupsApi'

import { IStandupItem, ItemStatus } from '../../types'
import ActionWrapper from '../action-wrapper/ActionWrapper'
import FormInput from '../form-input/FormInput'

import styles from './EditableStandupItem.module.scss'

export default function EditableStandupItem({ standupId, item, items }) {
  const [editableFields, setEditableFields] = useState({
    description: item.description,
    status: item.status,
  })
  const [state, setState] = useState('done')
  const { mutate } = useStandupsApi()

  const isComplete = item.status === ItemStatus.Done
  const itemClassname = `${styles.eStandup} ${
    isComplete ? styles.eStandupCompleted : ''
  }`.trim()

  const handleItemUpdate = async (action: string, item: IStandupItem) => {
    let payload: any = { action: 'update' }

    if (action === 'delete') {
      const itemsWithout = items.filter((fitem) => fitem._id !== item._id)
      payload.items = itemsWithout
    } else {
      payload.items = items.map((fitem) => {
        if (fitem._id === item._id) {
          return item
        }
        return fitem
      })
    }

    await fetch(`http://localhost:3000/api/standups/${standupId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    await mutate()
  }

  const handleDescriptionUpdate = async () => {
    if (editableFields.description === item.description) return

    setState('pending')
    await handleItemUpdate('edit', {
      ...item,
      description: editableFields.description,
    })
    setState('done')
  }

  const handleToggle = async () => {
    setState('pending')
    await handleItemUpdate('edit', {
      ...item,
      status: isComplete ? ItemStatus.Pending : ItemStatus.Done,
    })
    setState('done')
  }

  const handleItemDelete = async () => {
    setState('pending')
    await handleItemUpdate('delete', item)
    setState('done')
  }

  const handleDescriptionChange = (e) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      description: e.target.value,
    }))
  }

  return (
    <ActionWrapper
      key={item._id}
      isComplete={isComplete}
      state={state}
      handleDelete={handleItemDelete}
      handleToggle={handleToggle}
    >
      <FormInput
        type="textarea"
        value={editableFields.description}
        handleChange={handleDescriptionChange}
        handleLoseFocus={handleDescriptionUpdate}
      />
    </ActionWrapper>
  )
}
