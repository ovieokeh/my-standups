import { useState } from 'react'

import NewItemForm from './NewItemForm'
import EditableStandups from '../editable-standups/EditableStandups'

import { IStandup, IStandups } from '../../types'

import styles from './Form.module.scss'

type FormProps = {
  previousDayStandups: IStandups
}

export default function Form({ previousDayStandups } : FormProps) {
  const [entries, setItems] = useState(previousDayStandups)

  const handleAddNewItem = (item: IStandup) => {
    console.log(item)
    setItems((prevItems) => [...prevItems, item])
  }

  if (!entries?.length) {
    return <NewItemForm handleSubmit={handleAddNewItem} />
  }

  return (
    <div className={styles.form}>
      <EditableStandups standups={previousDayStandups} />
      <NewItemForm handleSubmit={handleAddNewItem} />
    </div>
  )
}
