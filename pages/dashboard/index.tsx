import { useEffect, useState } from 'react'
import Form from '../../components/forms/Form'
import Summary from '../../components/summary/Summary'
import { IStandups } from '../../types'
import mock from '../../mock'

import styles from './Dashboard.module.scss'

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

const profile = {
  name: 'Ovie',
  date: today.toLocaleDateString(),
}

export default function Dashboard() {
  const [standups, setStandups] = useState({})

  // useEffect(() => {
  //   const seedDatabase = async () => {
  //     console.log(...Object.values(mock))
  //     const promises = [...Object.values(mock)].map(standups => {
  //       return standups.map(async (standup) => {
  //         console.log({ standup })
  //         const response = await fetch('http://localhost:3000/api/standups/new', {
  //           method: 'POST',
  //           body: JSON.stringify(standup)
  //         })
  
  //         return response
  //       })
  //     })

  //     await Promise.all(promises)
  //   }

  //   seedDatabase()
  // }, [])

  useEffect(() => {
    const fetchStandups = async () => {
      const response = await fetch('http://localhost:3000/api/standups')
      const { data } = await response.json()

      const processData = (data: IStandups) => {
        const sortedByDate = data.reduce((acc, currentStandup) => {
          const dateToKey = new Date(currentStandup.createdAt).toLocaleDateString()

          if (acc[dateToKey]) {
            acc[dateToKey] = [
              ...acc[dateToKey],
              currentStandup
            ]
          } else {
            acc[dateToKey] = [
              currentStandup
            ]
          }

          return acc
        }, {})

        return sortedByDate
      }

      const formattedData = processData(data)
      console.log(formattedData)
      setStandups(formattedData)
    }

    fetchStandups()
  }, [])

  const todaysStandups = standups[profile.date]
  const previousDayStandups = standups[yesterday.toLocaleDateString()]

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

// export async function getServerSideProps(context) {
//   const standups = await fetch('http://localhost:3000/api/standups')
//   console.log(standups)

//   return {
//     props: {
//       standups
//     }, // will be passed to the page component as props
//   }
// }
