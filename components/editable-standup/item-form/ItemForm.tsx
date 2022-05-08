import { useState } from 'react'

import useStandupsApi from '../../../hooks/useStandupsApi'
import { ItemStatus } from '../../../types'
import FormButton from '../../form-button/FormButton'
import FormInput from '../../form-input/FormInput'

import styles from './ItemForm.module.scss'

export default function ItemForm({ standupId, invertInputStyle = false }) {
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
    await fetch(`http://localhost:3000/api/standups/${standupId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'add', item: newItem }),
    })
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
