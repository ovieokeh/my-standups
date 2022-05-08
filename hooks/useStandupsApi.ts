import useSWR from 'swr'

import { IStandups } from '../types'

const processData = (data: IStandups): { [id: string]: IStandups } => {
  const sortedByDate = data.reduce((acc, currentStandup) => {
    const dateToKey = new Date(currentStandup.createdAt).toLocaleDateString()

    if (acc[dateToKey]) {
      acc[dateToKey] = [...acc[dateToKey], currentStandup]
    } else {
      acc[dateToKey] = [currentStandup]
    }

    return acc
  }, {})

  return sortedByDate
}

const fetcher = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const formattedData = processData(res.data)
      return formattedData
    })
}

export default function useStandupsApi() {
  const { data, error, mutate } = useSWR<{ [id: string]: IStandups }>(
    '/api/standups',
    fetcher,
    { shouldRetryOnError: false }
  )
  return { data, error, mutate }
}
