import Standup from './standup'

import styles from './Standups.module.scss'

export default function Standups({
  pendingStandups = [],
  completedStandups = [],
}) {
  const renderEditableStandups = pendingStandups.map(({ _id, name, items }) => {
    return <Standup key={_id} _id={_id} name={name} items={items} />
  })

  const renderCompletedStandups = completedStandups.map(
    ({ _id, name, items }) => {
      return (
        <Standup
          key={_id}
          _id={_id}
          name={name}
          items={items}
          canEdit={false}
        />
      )
    }
  )

  return (
    <div className={styles.eStandups}>
      {renderEditableStandups}
      {renderCompletedStandups}
    </div>
  )
}
