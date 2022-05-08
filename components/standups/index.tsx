import Standup from './standup'

import styles from './Standups.module.scss'

export default function Standups({ standups = [] }) {
  const renderEditableStandups = standups.map(({ _id, name, items }) => {
    return <Standup key={_id} _id={_id} name={name} items={items} />
  })

  return <div className={styles.eStandups}>{renderEditableStandups}</div>
}
