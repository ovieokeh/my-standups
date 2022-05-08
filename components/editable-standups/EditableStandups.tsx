import EditableStandup from '../editable-standup/EditableStandup'

import styles from './EditableStandups.module.scss'

export default function EditableStandups({ standups }) {
  const renderEditableStandups = standups.map(({ _id, name, items }) => {
    return <EditableStandup key={_id} _id={_id} name={name} items={items} />
  })

  return <div className={styles.eStandups}>{renderEditableStandups}</div>
}
