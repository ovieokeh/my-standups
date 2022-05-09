import styles from './SubmitButton.module.scss'

export default function SubmitButton({ text, isLoading, variant = '' }) {
  let className = styles.formButton
  if (isLoading) {
    className += ` ${styles.formButtonLoading}`
  }
  if (variant === 'primary') {
    className += ` ${styles.formButtonPrimary}`
  }

  return (
    <button className={className} type="submit">
      {text}
    </button>
  )
}
