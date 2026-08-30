import { useEffect } from 'react'

import { EventCard } from '@/components/cards/EventCard'
import { Button } from '@/components/ui/button/Button'
import { EmptyState } from '@/components/ui/empty-state/EmptyState'
import type { PastEvent } from '@/types/domain'
import { cn } from '@/utils/cn'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'
import styles from './past-events-section.module.css'

interface PastEventsSectionProps {
  events?: PastEvent[]
}

export const PastEventsSection = observer(function PastEventsSection({
  events,
}: PastEventsSectionProps) {
  const { events: eventsStore } = stores

  useEffect(() => {
    void eventsStore.loadPast()
  }, [eventsStore])

  const items = events ?? eventsStore.past
  const loading = eventsStore.loading && items.length === 0
  const failed = eventsStore.error !== null && items.length === 0
  const empty = !loading && !failed && items.length === 0

  return (
    <section className={cn('home-section', styles.section)} id="past-events" data-test-id="past-events-section">
      <div className="container">
        <h2 className="text-title text-title-center">Прошедшие мероприятия</h2>

        {loading && <p className="section-loading" data-test-id="section-loading">Загрузка…</p>}

        {failed && (
          <EmptyState
            dark
            title="Не удалось загрузить мероприятия"
            description="Проверь соединение и попробуй ещё раз"
            action={
              <Button variant="secondary" onClick={() => void eventsStore.loadPast(true)} testId="section-retry">
                Повторить
              </Button>
            }
            testId="section-error"
          />
        )}

        {empty && (
          <EmptyState
            dark
            title="Здесь пока пусто"
            description="Мы ещё ничего не проводили — но это временно"
            testId="section-empty"
          />
        )}

        {items.length > 0 && (
          <div className={styles.grid}>
            {items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <Button to="/events/past" variant="secondary" testId="past-events-all-button">
            Все мероприятия
          </Button>
        </div>
      </div>
    </section>
  )
})
