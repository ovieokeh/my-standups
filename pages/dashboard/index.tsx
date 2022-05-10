import Layout from '../../components/layout'
import Standups from '../../components/standups'
import Summary from '../../components/summary'

import useStandupsApi from '../../hooks/useStandupsApi'
import useSyncPendingItems from '../../hooks/useSyncPendingItems'
import { ItemStatus } from '../../types'
import mock from '../../mock'

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
      const response = await fetch('${window.location.origin}/api/standups', {
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
  const { data: standups = {}, isValidating, mutate } = useStandupsApi()

  const todaysStandups = standups[profile.date]
  const previousDayStandups = standups[yesterday.toLocaleDateString()]

  useSyncPendingItems({ todaysStandups, previousDayStandups, mutate })

  const completedStandups = []
  const pendingStandups = []
  todaysStandups?.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1
    if (a.createdAt > b.createdAt) return -1
    return 0
  })
  todaysStandups?.forEach((standup) => {
    if (
      !standup.items.length ||
      standup.items.some((item) => item.status === ItemStatus.Pending)
    ) {
      pendingStandups.push(standup)
    } else {
      completedStandups.push(standup)
    }
  })

  return (
    <Layout>
      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Welcome, {profile.name}</h2>
        <p className={styles.dashboardDate}>{profile.date}</p>

        <div className={styles.dashboardContent}>
          <Standups
            pendingStandups={pendingStandups}
            completedStandups={completedStandups}
          />

          <Summary standups={previousDayStandups} />
        </div>
      </div>
    </Layout>
  )
}
