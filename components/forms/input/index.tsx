import { ChangeEventHandler, useEffect, useRef } from 'react'

import styles from './Input.module.scss'

type FormInputProps = {
  value: string
  type?: 'input' | 'textarea'
  placeholder?: string
  invert?: boolean
  handleChange:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement>
  handleLoseFocus?: Function
}

export default function Input({
  type = 'input',
  value,
  placeholder,
  handleChange,
  handleLoseFocus = () => {},
  invert,
}: FormInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const onInput = () => {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight - 15 + 'px'
      }

      onInput()
      textarea.addEventListener('input', onInput, false)

      return () => {
        textarea.removeEventListener('input', onInput, false)
      }
    }
  }, [])

  const classNames = (baseClassName, modifier, shouldApply) => {
    return `${baseClassName} ${shouldApply ? modifier : ''}`.trim()
  }

  const typeMapping = {
    input: (
      <input
        className={classNames(styles.formInput, styles.formInputInvert, invert)}
        placeholder={placeholder}
        value={value}
        onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
      />
    ),
    textarea: (
      <textarea
        ref={textareaRef}
        className={classNames(
          styles.formTextarea,
          styles.formTextareaInvert,
          invert
        )}
        placeholder={placeholder}
        value={value}
        onChange={handleChange as ChangeEventHandler<HTMLTextAreaElement>}
        onBlur={() => handleLoseFocus()}
        rows={1}
      />
    ),
  }

  return typeMapping[type]
}
