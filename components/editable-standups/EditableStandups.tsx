import { useState } from "react"

import EditableStandupItems from "../editable-standup-items/EditableStandupItems"
import FormInput from "../form-input/FormInput"

import styles from './EditableStandups.module.scss'

export default function EditableStandups({ standups }) {
  const [standupsName, setStandupsName] = useState(() => {
    return standups.reduce((acc, currentStandup) => {
      return {
        ...acc,
        [currentStandup._id]: currentStandup.name
      }
    }, {})
  })

  const handleStandupName = (id, value) => {
    setStandupsName((prevStandupsName) => ({
      ...prevStandupsName,
      [id]: value
    }))
  }

  const renderEditableStandups = standups.map(({ _id, items }) => {
    return (
      <div key={_id} className={styles.formItem}>
        <FormInput
          value={standupsName[_id]}
          handleChange={(event) => handleStandupName(_id, event.target.value)}
        />

        <EditableStandupItems standups={standups} items={items.map((item) => ({ ...item, standupId: _id }))} />
      </div>
    )
  })

  return renderEditableStandups
}