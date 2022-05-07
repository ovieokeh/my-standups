import { IStandup, IStandups, ItemStatus } from '../../types'
import SummaryItem from './SummaryItem'

type SummaryProps = {
  standups: IStandups
}
export default function Summary({ standups }: SummaryProps) {
  const renderedStandups = standups.map(({ _id, name, items }) => {

  const isComplete = items.every((item) => item.status === ItemStatus.Done)

  const blockClassname = `summary__block ${
    isComplete ? 'summary__block--complete' : ''
  }`.trim()

  const renderedItems = items.map((item) => {
    return <SummaryItem key={item.description} {...item} />
  })

  return (
    <div key={_id} className={blockClassname}>
      <h3 className="summary__block-title">{name}</h3>
      <ul className="summary__block-items">{renderedItems}</ul>
    </div>
  )
  })

  return (
    <section className="summary">
    {renderedStandups}
    </section>
  )
}
