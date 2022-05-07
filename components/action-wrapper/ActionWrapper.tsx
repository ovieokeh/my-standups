import styles from './ActionWrapper.module.scss'

export default function ActionWrapper({ children, isComplete }) {
  return (
    <div className={styles.aw}>
      <button type="button" className={styles.awAction}>
        −
      </button>
      <div className={styles.awContent}>{children}</div>
      <button type="button" className={styles.awAction}>
        {isComplete ? '♺' : '✓'}
      </button>
      <button type="button" className={styles.awAction}>
        ＋
      </button>
    </div>
  )
}
