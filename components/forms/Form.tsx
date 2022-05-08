import NewItemForm from './new-standup/NewStandupForm'
import EditableStandups from '../editable-standups/EditableStandups'

import { IStandups } from '../../types'

import styles from './Form.module.scss'

type FormProps = {
  standups: IStandups
}

export default function Form({ standups }: FormProps) {
  if (!standups?.length) {
    return <NewItemForm />
  }

  return (
    <div className={styles.form}>
      <NewItemForm />
      <EditableStandups standups={standups} />
    </div>
  )
}
