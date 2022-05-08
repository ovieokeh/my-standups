import Item from './item/Item'

import { IStandups, ItemStatus } from '../../types'

import styles from './Summary.module.scss'

type SummaryProps = {
  standups: IStandups
}
export default function Summary({ standups = [] }: SummaryProps) {
  const renderedStandups = standups.map(({ _id, name, items }) => {
    const isComplete = items.every((item) => item.status === ItemStatus.Done)

    const summaryClassname = `${styles.summary} ${
      isComplete ? styles.summaryComplete : ''
    }`.trim()

    const renderedItems = items.map((item) => {
      return <Item key={item.description} {...item} />
    })

    return (
      <div key={_id} className={summaryClassname}>
        <h3 className={styles.summaryName}>{name}</h3>
        <ul className={styles.summaryItems}>{renderedItems}</ul>
      </div>
    )
  })

  return (
    <section className={styles.summaryContainer}>{renderedStandups}</section>
  )
}
