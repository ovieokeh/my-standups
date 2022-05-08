import { useState } from 'react'

import ActionWrapper from '../../action-wrapper'
import FormInput from '../../forms/input'

import { IStandupItem, ItemStatus } from '../../../types'
import useStandupsApi from '../../../hooks/useStandupsApi'

import styles from './Item.module.scss'

export default function StandupItem({ standupId, item, items, canEdit }) {
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

    await fetch(`${window.location.origin}/api/standups/${standupId}`, {
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
    if (!canEdit) return

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
