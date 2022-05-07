import NewItemForm from './NewItemForm'
import EditableStandups from '../editable-standups/EditableStandups'

import { IStandups } from '../../types'

import styles from './Form.module.scss'

type FormProps = {
  standups: IStandups
}

export default function Form({ standups } : FormProps) {
  if (!standups?.length) {
    return <NewItemForm handleSubmit={() => {}} />
  }

  return (
    <div className={styles.form}>
      <EditableStandups standups={standups} />
      <NewItemForm handleSubmit={() => {}} />
    </div>
  )
}
