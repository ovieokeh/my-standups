import styles from './FormButton.module.scss'

export default function FormButton({ text, isLoading }) {
  const className = `${styles.formButton} ${
    isLoading ? styles.formButtonLoading : ''
  }`

  return (
    <button className={className} type="submit">
      {text}
    </button>
  )
}
