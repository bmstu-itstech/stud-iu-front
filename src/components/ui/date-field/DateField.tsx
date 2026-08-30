import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'

import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ChevronDownIcon } from '@/components/icons'
import { buildMonthGrid, todayIso } from '@/utils/calendar'
import { dateDigitsToIso, formatDateDigits, isoToDisplayDate } from '@/utils/date-mask'
import { cn } from '@/utils/cn'
import styles from './date-field.module.css'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]
const MIN_YEAR = 1950

interface DateFieldProps {
  label: string
  value: string
  onChange: (iso: string) => void
  placeholder?: string
  required?: boolean
  error?: string
  testId?: string
  className?: string
}

function parseIsoParts(iso: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  return { year: Number(match[1]), month: Number(match[2]) - 1 }
}

export function DateField({
  label,
  value,
  onChange,
  placeholder = 'ДД.ММ.ГГГГ',
  required = false,
  error,
  testId,
  className,
}: DateFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())

  const [display, setDisplay] = useState(() => isoToDisplayDate(value))
  const lastEmitted = useRef(value)
  const pendingCaret = useRef<number | null>(null)

  useEffect(() => {
    if (value !== lastEmitted.current) {
      lastEmitted.current = value
      setDisplay(isoToDisplayDate(value))
    }
  }, [value])

  useEffect(() => {
    if (pendingCaret.current !== null && inputRef.current !== null) {
      inputRef.current.setSelectionRange(pendingCaret.current, pendingCaret.current)
      pendingCaret.current = null
    }
  }, [display])

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

  function handleInput(raw: string): void {
    const formatted = formatDateDigits(raw)
    setDisplay(formatted)

    const iso = dateDigitsToIso(formatted)
    lastEmitted.current = iso
    onChange(iso)
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>): void {
    if (event.key !== 'Backspace') return

    const input = event.currentTarget
    const caret = input.selectionStart
    if (caret === null || caret === 0 || display[caret - 1] !== '.') return

    event.preventDefault()
    pendingCaret.current = caret - 2
    handleInput(display.slice(0, caret - 2) + display.slice(caret))
  }

  function toggle(): void {
    if (!open) {
      const parts = parseIsoParts(value)
      if (parts) {
        setViewYear(parts.year)
        setViewMonth(parts.month)
      } else {
        const current = new Date()
        setViewYear(current.getFullYear())
        setViewMonth(current.getMonth())
      }
    }
    setOpen(!open)
  }

  function shiftMonth(delta: number): void {
    const date = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(date.getFullYear())
    setViewMonth(date.getMonth())
  }

  const cells = buildMonthGrid(viewYear, viewMonth)
  const today = todayIso()
  const years = Array.from(
    { length: now.getFullYear() - MIN_YEAR + 1 },
    (_, index) => now.getFullYear() - index,
  )

  return (
    <div className={cn(styles.root, className)} ref={rootRef}>
      <span className={styles.label}>
        {label}
        {required && (
          <span className={styles.requiredStar} aria-hidden="true">
            *
          </span>
        )}
      </span>

      <div className={cn(styles.field, error && styles.fieldError)}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={styles.input}
          value={display}
          placeholder={placeholder}
          onChange={(event) => handleInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
          aria-label={label}
          data-test-id={testId}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Открыть календарь"
          onClick={toggle}
          data-test-id={testId ? `${testId}-toggle` : undefined}
        >
          <CalendarIcon size={20} />
        </button>
      </div>

      {open && (
        <div
          className={styles.panel}
          role="dialog"
          aria-label="Выбор даты"
          data-test-id={testId ? `${testId}-calendar` : undefined}
        >
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Предыдущий месяц"
              onClick={() => shiftMonth(-1)}
              data-test-id={testId ? `${testId}-prev` : undefined}
            >
              <ArrowLeftIcon size={16} />
            </button>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                value={viewMonth}
                aria-label="Месяц"
                onChange={(event) => setViewMonth(Number(event.target.value))}
                data-test-id={testId ? `${testId}-month` : undefined}
              >
                {MONTHS.map((name, index) => (
                  <option key={name} value={index}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={16} className={styles.selectChevron} />
            </div>
            <div className={cn(styles.selectWrap, styles.yearWrap)}>
              <select
                className={styles.select}
                value={viewYear}
                aria-label="Год"
                onChange={(event) => setViewYear(Number(event.target.value))}
                data-test-id={testId ? `${testId}-year` : undefined}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={16} className={styles.selectChevron} />
            </div>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Следующий месяц"
              onClick={() => shiftMonth(1)}
              data-test-id={testId ? `${testId}-next` : undefined}
            >
              <ArrowRightIcon size={16} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAYS.map((weekday) => (
              <span key={weekday} className={styles.weekday}>
                {weekday}
              </span>
            ))}
          </div>

          <div className={styles.grid}>
            {cells.map((cell) => (
              <button
                key={cell.iso}
                type="button"
                className={cn(
                  styles.day,
                  !cell.inMonth && styles.dayMuted,
                  cell.iso === today && styles.dayToday,
                  cell.iso === value && styles.daySelected,
                )}
                disabled={!cell.inMonth}
                onClick={() => {
                  lastEmitted.current = cell.iso
                  setDisplay(isoToDisplayDate(cell.iso))
                  onChange(cell.iso)
                  setOpen(false)
                }}
                data-test-id={testId ? `${testId}-day-${cell.iso}` : undefined}
              >
                {cell.day}
              </button>
            ))}
          </div>
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
