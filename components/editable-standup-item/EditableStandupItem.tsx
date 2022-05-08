import { useState } from 'react'

import useStandupsApi from '../../hooks/useStandupsApi'
import { ItemStatus } from '../../types'
import ActionWrapper from '../action-wrapper/ActionWrapper'
import FormInput from '../form-input/FormInput'

import styles from './EditableStandupItem.module.scss'

export default function EditableStandupItem({
  id,
  status,
  handleChange,
  editableFields,
}) {
  const [state, setState] = useState('done')
  const { mutate } = useStandupsApi()

  const isComplete = status === ItemStatus.Done
  const itemClassname = `${styles.eStandup} ${
    isComplete ? styles.eStandupCompleted : ''
  }`.trim()

  const handleItemDelete = async (id) => {
    setState('pending')
    await fetch(`http://localhost:3000/standups/${id}`, {
      method: 'DELETE',
    })

    await mutate()
    setState('done')
  }

  return (
    <ActionWrapper
      key={id}
      isComplete={isComplete}
      state={state}
      handleDelete={() => handleItemDelete(id)}
    >
      <div className={itemClassname}>
        <FormInput
          type="textarea"
          value={editableFields?.description}
          handleChange={handleChange}
        />
      </div>
    </ActionWrapper>
  )
}
