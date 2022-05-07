import { ChangeEventHandler } from 'react'
import styles from './FormInput.module.scss'

type FormInputProps = {
  value: string
  type?: 'input' | 'textarea'
  placeholder?: string
  handleChange: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement>
}
export default function FormInput({ type = 'input', value, placeholder, handleChange }: FormInputProps) {
  const typeMapping = {
    input: (
      <input
        className={styles.formInput}
        placeholder={placeholder}
        value={value}
        onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
        />
      ),
    textarea: (
      <textarea
        className={styles.formTextarea}
        placeholder={placeholder}
        value={value}
        onChange={handleChange as ChangeEventHandler<HTMLTextAreaElement>}
        rows={1}
      />
    )
  }

  return typeMapping[type]
}