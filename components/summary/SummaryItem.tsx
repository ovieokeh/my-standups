import { IStandupItem, ItemStatus } from "../../types"

export default function SummaryItem({ description, status }: IStandupItem) {
  const itemClassname = `summary__item ${
    status === ItemStatus.Done ? 'summary__item--complete' : ''
  }`.trim()

  return (
    <li key={description} className={itemClassname}>
      {description}
    </li>
  )
}
