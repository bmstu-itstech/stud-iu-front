import { useId } from 'react'

import { CheckIcon } from '@/components/icons'
import { cn } from '@/utils/cn'
import styles from './checkbox.module.css'

interface CheckboxProps {
  label: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  testId?: string
  className?: string
}

export function Checkbox({ label, checked, onChange, testId, className }: CheckboxProps) {
  const id = useId()

  return (
    <label className={cn(styles.root, checked && styles.checked, className)} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        data-test-id={testId}
      />
      <span className={styles.box} aria-hidden="true">
        {checked && <CheckIcon size={12} className={styles.checkIcon} />}
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  )
}
