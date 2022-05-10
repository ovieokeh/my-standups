import { useState } from 'react'

import FormButton from '../submit-button'
import FormInput from '../input'

import useStandupsApi from '../../../hooks/useStandupsApi'
import { playsound } from '../../../utils/playsound'

import styles from './StandupForm.module.scss'

export default function StandupForm() {
  const [state, setState] = useState('initial')
  const [name, setName] = useState('')
  const { mutate } = useStandupsApi()

  const handleAddItem = async (event) => {
    event.preventDefault()

    setState('pending')
    await fetch(`${window.location.origin}/api/standups`, {
      method: 'POST',
      body: JSON.stringify({ name, items: [] }),
    })
    await playsound('create')
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

      <FormButton
        text="New standup"
        isLoading={state === 'pending'}
        variant="primary"
      />
    </form>
  )
}
