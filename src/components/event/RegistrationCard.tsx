import { useState } from 'react'

import { Button } from '@/components/ui/button/Button'
import type { RegistrationInfo } from '@/types/domain'
import { formatLongDate } from '@/utils/format-date'
import styles from './registration-card.module.css'

interface RegistrationCardProps {
  registration: RegistrationInfo
}

export function RegistrationCard({ registration }: RegistrationCardProps) {
  const [registered, setRegistered] = useState(false)
  const expired = registration.expired ?? false

  const seatsFree = registration.seatsTotal - registration.seatsTaken
  const takenPercent = Math.round((registration.seatsTaken / registration.seatsTotal) * 100)

  return (
    <aside className={styles.card} data-test-id="registration-card">
      <h2 className={styles.title}>Детали регистрации</h2>

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt className={styles.rowLabel}>Дата проведения</dt>
          <dd className={styles.rowValue}>
            {formatLongDate(registration.startsAt, true)}
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.rowLabel}>Начало регистрации</dt>
          <dd className={styles.rowValue}>{formatLongDate(registration.opensAt)}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.rowLabel}>Окончание регистрации</dt>
          <dd className={styles.rowValue}>{formatLongDate(registration.closesAt)}</dd>
        </div>
      </dl>

      <div className={styles.seats}>
        <div className={styles.seatsRow}>
          <span className={styles.rowValue}>Свободные места</span>
          <span className={styles.rowValue}>
            {seatsFree}/{registration.seatsTotal}
          </span>
        </div>
        <div
          className={styles.progress}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={registration.seatsTotal}
          aria-valuenow={seatsFree}
          aria-label="Свободные места"
          data-test-id="seats-progress"
        >
          <div className={styles.progressFill} style={{ width: `${takenPercent}%` }} />
        </div>
      </div>

      {expired ? (
        <Button disabled fullWidth testId="register-button">
          Регистрация завершена
        </Button>
      ) : registered ? (
        <Button disabled fullWidth testId="register-button">
          Вы зарегистрированы
        </Button>
      ) : (
        <Button fullWidth onClick={() => setRegistered(true)} testId="register-button">
          Зарегистрироваться
        </Button>
      )}

      {registered && (
        <p className={styles.success} data-test-id="register-success">
          Отправили подтверждение на почту.
        </p>
      )}
    </aside>
  )
}
