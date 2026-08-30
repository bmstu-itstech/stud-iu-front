import { useEffect, useId, useRef, useState } from 'react'

import { ChevronDownIcon } from '@/components/icons'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { cn } from '@/utils/cn'
import styles from './multi-select.module.css'

export interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  label: string
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  required?: boolean
  error?: string
  testId?: string
  className?: string
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = 'Выберите один или несколько вариантов',
  required = false,
  error,
  testId,
  className,
}: MultiSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const labelId = useId()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function toggleOption(option: MultiSelectOption, checked: boolean): void {
    onChange(
      checked
        ? [...selected, option.value]
        : selected.filter((value) => value !== option.value),
    )
  }

  const summary =
    selected.length > 0
      ? `Выбрано: ${selected.length}`
      : placeholder

  return (
    <div className={cn(styles.root, className)} ref={rootRef}>
      <span id={labelId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.requiredStar} aria-hidden="true">
            *
          </span>
        )}
      </span>
      <button
        type="button"
        className={cn(styles.field, open && styles.fieldOpen, error && styles.fieldError)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => setOpen((value) => !value)}
        data-test-id={testId}
      >
        <span className={cn(styles.summary, selected.length > 0 && styles.summaryFilled)}>
          {summary}
        </span>
        <ChevronDownIcon size={20} className={cn(styles.chevron, open && styles.chevronUp)} />
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox" aria-multiselectable="true">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(styles.option, selected.includes(option.value) && styles.optionSelected)}
            >
              <Checkbox
                label={option.label}
                checked={selected.includes(option.value)}
                onChange={(checked) => toggleOption(option, checked)}
                testId={testId ? `${testId}-option-${option.value}` : undefined}
              />
            </div>
          ))}
        </div>
      )}

      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
