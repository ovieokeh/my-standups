import StandupForm from '../forms/standup'
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
    <section className={styles.eStandups}>
      <h3>What will you do today?</h3>
      <StandupForm />

      <div className={styles.scrollContainer}>
        {renderEditableStandups}
        {renderCompletedStandups}
      </div>
    </section>
  )
}
