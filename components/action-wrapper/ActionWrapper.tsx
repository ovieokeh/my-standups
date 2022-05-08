import styles from './ActionWrapper.module.scss'

export default function ActionWrapper({
  children,
  isComplete,
  state,
  handleDelete,
}) {
  const className = `${styles.aw} ${
    isComplete ? styles.awDisabled : state === 'pending' ? styles.awPending : ''
  }`.trim()

  return (
    <div className={className}>
      <button type="button" className={styles.awAction} onClick={handleDelete}>
        −
      </button>

      <div className={styles.awContent}>{children}</div>

      <button type="button" className={styles.awAction}>
        {isComplete ? '♺' : '✓'}
      </button>

      {!isComplete && (
        <button type="button" className={styles.awAction}>
          ＋
        </button>
      )}
    </div>
  )
}
