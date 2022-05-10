import { useState } from 'react'

import FormButton from '../submit-button'
import FormInput from '../input'

import useStandupsApi from '../../../hooks/useStandupsApi'
import { ItemStatus } from '../../../types'
import { playsound } from '../../../utils'

import styles from './StandupItemForm.module.scss'

export default function StandupItemForm({
  standupId,
  invertInputStyle = false,
}) {
  const [newItemDescription, setNewItemDescription] = useState('')
  const [state, setState] = useState('initial')
  const { mutate } = useStandupsApi()

  const handleAddItem = async (event) => {
    event.preventDefault()

    const newItem = {
      description: newItemDescription,
      status: ItemStatus.Pending,
    }

    setState('pending')
    await fetch(`${window.location.origin}/api/standups/${standupId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'add', item: newItem }),
    })
    await playsound('create')
    await mutate()
    setNewItemDescription('')
    setState('done')
  }

  return (
    <form className={styles.form} onSubmit={handleAddItem}>
      <FormInput
        type="textarea"
        value={newItemDescription}
        handleChange={(event) => setNewItemDescription(event.target.value)}
        placeholder="Enter new note"
        invert={invertInputStyle}
      />

      <FormButton text="add" isLoading={state === 'pending'} />
    </form>
  )
}
