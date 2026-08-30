import type { ReactNode } from 'react'

import { InboxIcon } from '@/components/icons'
import { cn } from '@/utils/cn'
import styles from './empty-state.module.css'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  dark?: boolean
  testId?: string
  className?: string
}

export function EmptyState({ title, description, action, dark = false, testId, className }: EmptyStateProps) {
  return (
    <div className={cn(styles.root, dark && styles.dark, className)} data-test-id={testId}>
      <span className={styles.icon} aria-hidden="true">
        <InboxIcon size={28} />
      </span>
      <p className={styles.title}>{title}</p>
      {description !== undefined && <p className={styles.description}>{description}</p>}
      {action !== undefined && <div className={styles.action}>{action}</div>}
    </div>
  )
}
