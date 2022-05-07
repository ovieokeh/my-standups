import { ChangeEventHandler, useEffect, useRef } from 'react'
import styles from './FormInput.module.scss'

type FormInputProps = {
  value: string
  type?: 'input' | 'textarea'
  placeholder?: string
  handleChange: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement>
}
export default function FormInput({ type = 'input', value, placeholder, handleChange }: FormInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const onInput = () => {
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight - 12) + "px";
      }

      // textarea.setAttribute("style", "height:" + (textarea.scrollHeight) + "px;overflow-y:hidden;");
      textarea.addEventListener("input", onInput, false);

      return () => {
        textarea.removeEventListener('input', onInput, false)
      }
  }
  }, [])

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
        ref={textareaRef}
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