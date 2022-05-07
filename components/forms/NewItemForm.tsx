import { useState } from 'react'
import FormInput from '../form-input/FormInput'

export default function NewItemForm({ handleSubmit }) {
  const [ticketId, setTicketId] = useState('')

  const onSubmit = (event) => {
    console.log(event)
    event.preventDefault()

    handleSubmit({ ticketId, summaryItems: [] })
    setTicketId('')
  }

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        placeholder="Ticket number, i.e, GO-100"
        value={ticketId}
        handleChange={(e) => setTicketId(e.target.value)}
      />

      <button type="submit">Add new item</button>
    </form>
  )
}
