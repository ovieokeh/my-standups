import Form from '../../components/forms/Form'
import Summary from '../../components/summary/Summary'
import mock from '../../mock'

import useStandupsApi from '../../hooks/useStandupsApi'
import useSyncPendingItems from '../../hooks/useSyncPendingItems'

import styles from './Dashboard.module.scss'

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

const profile = {
  name: 'Ovie',
  date: today.toLocaleDateString(),
}

const seedDatabase = async () => {
  const promises = [...Object.values(mock)].map(async (standups) => {
    return standups.map(async (standup) => {
      const response = await fetch('http://localhost:3000/api/standups', {
        method: 'POST',
        body: JSON.stringify(standup),
      })

      return response
    })
  })

  await Promise.all(promises)
}

// seedDatabase()

export default function Dashboard() {
  const { data: standups = {}, mutate } = useStandupsApi()

  const todaysStandups = standups[profile.date]
  const previousDayStandups = standups[yesterday.toLocaleDateString()]

  useSyncPendingItems({ todaysStandups, previousDayStandups, mutate })

  todaysStandups?.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1
    if (a.createdAt > b.createdAt) return -1
    return 0
  })

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashboardTitle}>Welcome, {profile.name}</h2>
      <p className={styles.dashboardDate}>{profile.date}</p>

      <div className={styles.dashboardContent}>
        <div>
          <h3>What will you do today?</h3>
          <Form standups={todaysStandups} />
        </div>

        <div>
          <h3>Your previous day summary</h3>
          <Summary standups={previousDayStandups} />
        </div>
      </div>
    </div>
  )
}
