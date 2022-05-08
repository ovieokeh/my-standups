import styles from './SubmitButton.module.scss'

export default function SubmitButton({ text, isLoading }) {
  const className = `${styles.formButton} ${
    isLoading ? styles.formButtonLoading : ''
  }`

  return (
    <button className={className} type="submit">
      {text}
    </button>
  )
}
