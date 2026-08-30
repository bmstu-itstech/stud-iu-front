import { useEffect } from 'react'

import { EmptyState } from '@/components/ui/empty-state/EmptyState'
import { Button } from '@/components/ui/button/Button'
import { UpcomingCarousel } from '@/components/events/UpcomingCarousel'
import { UpcomingGallery } from '@/components/events/UpcomingGallery'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'
import styles from './upcoming-events-section.module.css'

export const UpcomingEventsSection = observer(function UpcomingEventsSection() {
  const { events } = stores

  useEffect(() => {
    void events.loadUpcoming()
  }, [events])

  const loading = events.loading && events.upcoming.length === 0
  const failed = events.error !== null && events.upcoming.length === 0
  const empty = !loading && !failed && events.upcoming.length === 0

  return (
    <section className="container home-section" id="events" data-test-id="events-section">
      <h2 className="text-title text-title-center">Предстоящие мероприятия</h2>

      {loading && <p className="section-loading" data-test-id="section-loading">Загрузка…</p>}

      {failed && (
        <EmptyState
          title="Не удалось загрузить мероприятия"
          description="Проверь соединение и попробуй ещё раз"
          action={
            <Button variant="secondary" onClick={() => void events.loadUpcoming(true)} testId="section-retry">
              Повторить
            </Button>
          }
          testId="section-error"
        />
      )}

      {empty && (
        <EmptyState
          title="Мероприятий пока нет"
          description="Следите за анонсами — скоро расскажем о новых"
          testId="section-empty"
        />
      )}

      {!loading && !failed && events.upcoming.length > 0 && (
        <div className={styles.carouselWrapper}>
          <UpcomingCarousel events={events.upcoming} />
          <UpcomingGallery events={events.upcoming} />
        </div>
      )}
    </section>
  )
})
