import { Button } from '@/components/ui/button/Button'
import styles from './not-found-state.module.css'

interface NotFoundStateProps {
  title: string
  description: string
  testId?: string
}

export function NotFoundState({ title, description, testId }: NotFoundStateProps) {
  return (
    <div className={`container ${styles.state}`} data-test-id={testId}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className="text-title">{title}</h1>
      <p className={styles.description}>{description}</p>
      <Button to="/" testId="back-home-link">
        На главную
      </Button>
    </div>
  )
}
