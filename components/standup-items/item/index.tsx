import { useState } from 'react'

import ActionWrapper from '../../action-wrapper'
import FormInput from '../../forms/input'

import { IStandupItem, ItemStatus } from '../../../types'
import useStandupsApi from '../../../hooks/useStandupsApi'
import { playsound } from '../../../utils'

export default function StandupItem({ standupId, item, items, canEdit }) {
  const [editableFields, setEditableFields] = useState({
    description: item.description,
    status: item.status,
  })
  const [state, setState] = useState('done')
  const { mutate } = useStandupsApi()

  const isComplete = item.status === ItemStatus.Done

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

    playsound('delete')
  }

  const handleUserAction = async (action: string) => {
    if (state === 'pending') return

    let method: string
    let payload: any
    if (action === 'delete') {
      method = 'delete'
      payload = item
    }

    if (action === 'toggle') {
      method = 'edit'
      payload = {
        ...item,
        status: isComplete ? ItemStatus.Pending : ItemStatus.Done,
      }
    }

    if (action === 'description') {
      if (editableFields.description === item.description) return

      method = 'edit'
      payload = {
        ...item,
        description: editableFields.description,
      }
    }

    setState('pending')

    await handleItemUpdate(method, payload)
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
      handleDelete={() => handleUserAction('delete')}
      handleToggle={() => handleUserAction('toggle')}
    >
      <FormInput
        type="textarea"
        value={editableFields.description}
        handleChange={handleDescriptionChange}
        handleLoseFocus={() => handleUserAction('description')}
      />
    </ActionWrapper>
  )
}
