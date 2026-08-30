import type { StatItem } from '@/types/domain'
import { Button } from '@/components/ui/button/Button'
import styles from './stat-card.module.css'

interface StatCardProps {
  stat: StatItem
}

export function StatCard({ stat }: StatCardProps) {
  const { cta } = stat

  return (
    <article className={styles.card} data-test-id="stat-card">
      <h3 className={styles.value}>{stat.value}</h3>
      <p className={styles.label}>{stat.label}</p>
      <div className={styles.ctaWrapper}>
        {cta.to !== undefined ? (
          <Button to={cta.to} variant="secondary" fullWidth testId="stat-card-cta">
            {cta.label}
          </Button>
        ) : cta.href !== undefined ? (
          <Button href={cta.href} variant="secondary" fullWidth testId="stat-card-cta">
            {cta.label}
          </Button>
        ) : null}
      </div>
    </article>
  )
}
