import { useEffect } from 'react'

import { EventCard } from '@/components/cards/EventCard'
import { SearchInput } from '@/components/ui/search-input/SearchInput'
import { Button } from '@/components/ui/button/Button'
import { EmptyState } from '@/components/ui/empty-state/EmptyState'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'
import styles from './past-events-page.module.css'

export const PastEventsPage = observer(function PastEventsPage() {
  const { events } = stores

  useEffect(() => {
    void events.loadPast()
  }, [events])

  const items = events.filteredPast
  const loading = events.loading && events.past.length === 0
  const failed = events.error !== null && events.past.length === 0

  return (
    <div className={styles.page} data-test-id="past-events-page">
      <div className="container">
        <div className={styles.header}>
          <h1 className="text-title">Прошедшие мероприятия</h1>
          <SearchInput
            value={events.searchQuery}
            onChange={(value) => events.setSearchQuery(value)}
            testId="events-search"
          />
        </div>

        {loading && <p className="section-loading" data-test-id="section-loading">Загрузка…</p>}

        {failed && (
          <EmptyState
            dark
            title="Не удалось загрузить мероприятия"
            description="Проверь соединение и попробуй ещё раз"
            action={
              <Button variant="secondary" onClick={() => void events.loadPast(true)} testId="section-retry">
                Повторить
              </Button>
            }
            testId="section-error"
          />
        )}

        {!loading && !failed && items.length === 0 && events.searchQuery.trim() !== '' && (
          <p className={styles.empty} data-test-id="events-empty">
            По запросу «{events.searchQuery}» ничего не нашлось
          </p>
        )}

        {!loading && !failed && items.length === 0 && events.searchQuery.trim() === '' && (
          <EmptyState
            dark
            title="Здесь пока пусто"
            description="Мы ещё ничего не проводили — но это временно"
            testId="events-empty"
          />
        )}

        <div className={styles.grid}>
          {items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
})
