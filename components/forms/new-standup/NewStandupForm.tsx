import { useState } from 'react'
import useStandupsApi from '../../../hooks/useStandupsApi'

import FormButton from '../../form-button/FormButton'
import FormInput from '../../form-input/FormInput'

import styles from './NewStandupForm.module.scss'

export default function NewStandupForm() {
  const [state, setState] = useState('initial')
  const [name, setName] = useState('')
  const { mutate } = useStandupsApi()

  const handleAddItem = async (event) => {
    event.preventDefault()

    setState('pending')
    await fetch(`http://localhost:3000/api/standups`, {
      method: 'POST',
      body: JSON.stringify({ name, items: [] }),
    })
    await mutate()
    setName('')
    setState('done')
  }

  return (
    <form className={styles.form} onSubmit={handleAddItem}>
      <FormInput
        placeholder="Ticket number, i.e, GO-100"
        value={name}
        handleChange={(e) => setName(e.target.value)}
      />

      <FormButton text="New standup" isLoading={state === 'pending'} />
    </form>
  )
}
