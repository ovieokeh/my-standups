import Form from '../../components/forms/Form'
import Summary from '../../components/summary/Summary'
import items from '../../mock'

import styles from './Dashboard.module.scss'

const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)

export default function Dashboard() {
  const data = {
    name: 'Ovie',
    date: today.toLocaleDateString(),
  }

  const previousDayStandups = items[yesterday.toLocaleDateString()]

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashboardTitle}>Welcome, {data.name}</h2>
      <p className={styles.dashboardDate}>{data.date}</p>

      <div className={styles.dashboardContent}>
        <div>
          <h3>What will you do today?</h3>
          <Form previousDayStandups={previousDayStandups} />
        </div>

        <div>
          <h3>Your previous day summary</h3>
          <Summary standups={previousDayStandups} />
        </div>
      </div>
    </div>
  )
}
