import { SearchIcon } from '@/components/icons'
import styles from './search-input.module.css'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  testId?: string
}

export function SearchInput({ value, onChange, placeholder = 'Поиск', testId }: SearchInputProps) {
  return (
    <div className={styles.root}>
      <SearchIcon size={20} className={styles.icon} />
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        data-test-id={testId}
      />
    </div>
  )
}
