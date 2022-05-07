import styles from './ActionWrapper.module.scss'

export default function ActionWrapper({ children, isComplete }) {
  const className = `${styles.aw} ${isComplete ? styles.awDisabled : ''}`.trim()
  return (
    <div className={className}>
      <button type="button" className={styles.awAction}>
        −
      </button>
      <div className={styles.awContent}>{children}</div>
      <button type="button" className={styles.awAction}>
        {isComplete ? '♺' : '✓'}
      </button>
      {
        !isComplete && (
          <button type="button" className={styles.awAction}>
            ＋
          </button>
        )
      }
    </div>
  )
}
