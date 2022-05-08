import { IStandupItem, ItemStatus } from '../../../types'

import styles from './Item.module.scss'

export default function Item({ description, status }: IStandupItem) {
  const itemClassname = `${styles.item} ${
    status === ItemStatus.Done ? styles.itemComplete : ''
  }`.trim()

  return (
    <li key={description} className={itemClassname}>
      {description}
    </li>
  )
}
