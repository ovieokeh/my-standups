import styles from './ActionWrapper.module.scss'

export default function ActionWrapper({
  children,
  isComplete,
  state,
  handleDelete,
  handleToggle = () => {},
  actions = ['delete', 'toggle'],
  isHeader = false,
}) {
  const className = `${styles.aw} ${isHeader ? styles.awIsHeader : ''} ${
    isComplete ? styles.awComplete : state === 'pending' ? styles.awPending : ''
  }`.trim()

  return (
    <div className={className}>
      {actions.includes('delete') && (
        <button
          type="button"
          className={styles.awAction}
          onClick={handleDelete}
        >
          −
        </button>
      )}

      <div className={styles.awContent}>{children}</div>

      {actions.includes('toggle') && (
        <button
          type="button"
          onClick={handleToggle}
          className={styles.awAction}
        >
          {isComplete ? '♺' : '✓'}
        </button>
      )}
    </div>
  )
}
