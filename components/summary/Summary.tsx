import { IStandups, ItemStatus } from '../../types'
import SummaryItem from './SummaryItem'

import styles from './Summary.module.scss'

type SummaryProps = {
  standups: IStandups
}
export default function Summary({ standups = [] }: SummaryProps) {
  const renderedStandups = standups.map(({ _id, name, items }) => {
    const isComplete = items.every((item) => item.status === ItemStatus.Done)

    const blockClassname = `${styles.block} ${
      isComplete ? styles.blockComplete : ''
    }`.trim()

    const renderedItems = items.map((item) => {
      return <SummaryItem key={item.description} {...item} />
    })

    return (
      <div key={_id} className={blockClassname}>
        <h3 className={styles.blockName}>{name}</h3>
        <ul className={styles.blockItems}>{renderedItems}</ul>
      </div>
    )
  })

  return <section className={styles.summary}>{renderedStandups}</section>
}
