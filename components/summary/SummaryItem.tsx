import { IStandupItem, ItemStatus } from '../../types'

import styles from './Summary.module.scss'

export default function SummaryItem({ description, status }: IStandupItem) {
  const itemClassname = `${styles.summaryItem} ${
    status === ItemStatus.Done ? styles.summaryItemComplete : ''
  }`.trim()

  return (
    <li key={description} className={itemClassname}>
      {description}
    </li>
  )
}
