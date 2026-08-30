import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { EventItem } from '@/types/domain'
import { cn } from '@/utils/cn'
import { eventDateDisplay } from '@/utils/event-date'
import styles from './upcoming-gallery.module.css'

interface UpcomingGalleryProps {
  events: EventItem[]
}

export function UpcomingGallery({ events }: UpcomingGalleryProps) {
  const navigate = useNavigate()
  const trackRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (events.length === 0) return null

  function handleScroll(): void {
    const track = trackRef.current
    if (!track || track.scrollWidth === 0) return

    const slideWidth = track.scrollWidth / events.length
    const index = Math.round(track.scrollLeft / slideWidth)
    setActiveIndex(Math.min(Math.max(index, 0), events.length - 1))
  }

  function scrollToIndex(index: number): void {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[index] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div className={styles.root} data-test-id="upcoming-gallery">
      <ul className={styles.track} ref={trackRef} onScroll={handleScroll}>
        {events.map((event, index) => (
          <li key={event.id} className={styles.slide}>
            <button
              type="button"
              className={styles.card}
              onClick={() => navigate(`/events/${event.id}`)}
              data-test-id={`gallery-slide-${index}`}
            >
              {event.image !== '' ? (
                <img src={event.image} alt="" className={styles.image} />
              ) : (
                <span className={styles.imageFallback} aria-hidden="true" />
              )}
              <span className={styles.title}>{event.title}</span>
              <span className={styles.footer}>
                <span className={styles.place}>{event.place}</span>
                <time dateTime={event.date || undefined}>{eventDateDisplay(event)}</time>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.indicators}>
        {events.map((event, index) => (
          <button
            key={event.id}
            type="button"
            className={cn(styles.indicator, index === activeIndex && styles.indicatorActive)}
            aria-label={`Слайд ${index + 1}: ${event.title}`}
            onClick={() => scrollToIndex(index)}
            data-test-id={`gallery-indicator-${index}`}
          />
        ))}
      </div>
    </div>
  )
}
