import { useId } from 'react'

import { cn } from '@/utils/cn'
import styles from './text-field.module.css'

interface TextFieldProps {
  label: string
  name?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'date' | 'url'
  required?: boolean
  error?: string
  testId?: string
  className?: string
}

export function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
  testId,
  className,
}: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={cn(styles.root, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.requiredStar} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={cn(styles.input, error && styles.inputError)}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        data-test-id={testId}
      />
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
