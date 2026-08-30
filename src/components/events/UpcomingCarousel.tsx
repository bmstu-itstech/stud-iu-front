import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons'
import type { EventItem } from '@/types/domain'
import { cn } from '@/utils/cn'
import { eventDateDisplay } from '@/utils/event-date'
import styles from './upcoming-carousel.module.css'

const ROLE_BY_DISTANCE = ['far', 'near', 'active', 'near', 'far'] as const

const SLOT_OFFSET = [-1304, -732, 0, 732, 1304]

function wrappedDistance(index: number, activeIndex: number, count: number): number {
  let distance = index - activeIndex
  if (distance > count / 2) distance -= count
  if (distance < -count / 2) distance += count
  return distance
}

function slotOffset(distance: number): number {
  const abs = Math.abs(distance)
  if (abs <= 2) return SLOT_OFFSET[distance + 2]
  return Math.sign(distance) * (1304 + (abs - 2) * 492)
}

function slideScale(absDistance: number): number {
  return absDistance >= 2 ? 0.6 : 1 - absDistance * 0.2
}

interface UpcomingCarouselProps {
  events: EventItem[]
}

export function UpcomingCarousel({ events }: UpcomingCarouselProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [jumpIds, setJumpIds] = useState<string[]>([])
  const jumpTimeout = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(jumpTimeout.current), [])

  const count = events.length

  function goTo(index: number): void {
    const jumping: string[] = []
    for (let i = 0; i < count; i++) {
      const prev = wrappedDistance(i, activeIndex, count)
      const next = wrappedDistance(i, index, count)
      if (prev !== next && Math.abs(prev) === 2 && Math.sign(prev) !== Math.sign(next)) {
        jumping.push(events[i].id)
      }
    }
    if (jumping.length > 0) {
      setJumpIds(jumping)
      window.clearTimeout(jumpTimeout.current)
      jumpTimeout.current = window.setTimeout(() => setJumpIds([]), 500)
    }
    setActiveIndex(index)
  }

  if (count === 0) return null

  const shift = (delta: number) => goTo((activeIndex + delta + count) % count)

  return (
    <div className={styles.root} data-test-id="upcoming-carousel">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {events.map((event, index) => {
            const distance = wrappedDistance(index, activeIndex, count)
            const absDistance = Math.abs(distance)
            const isActive = absDistance === 0
            const role = ROLE_BY_DISTANCE[Math.min(absDistance, 2)]
            const isHidden = absDistance > 2

            return (
              <button
                key={event.id}
                type="button"
                className={cn(
                  styles.slide,
                  styles[role],
                  isHidden && styles.hidden,
                  jumpIds.includes(event.id) && styles.noTransition,
                )}
                style={{
                  transform: `translate(-50%, -50%) translateX(${slotOffset(distance)}px) scale(${slideScale(absDistance)})`,
                }}
                onClick={() => (isActive ? navigate(`/events/${event.id}`) : goTo(index))}
                aria-label={
                  isActive
                    ? `Открыть мероприятие «${event.title}»`
                    : `Показать мероприятие «${event.title}»`
                }
                data-test-id={isActive ? 'carousel-slide-active' : `carousel-slide-${index}`}
              >
                {event.image !== '' ? (
                  <img src={event.image} alt="" className={styles.image} />
                ) : (
                  <span className={styles.imageFallback} aria-hidden="true" />
                )}
                {isActive && (
                  <>
                    <span className={styles.caption}>
                      <span className={styles.title}>{event.title}</span>
                      <span className={styles.description}>{event.shortDescription}</span>
                    </span>
                    <span className={styles.badge}>
                      <span className={styles.place}>{event.place}</span>
                      <time className={styles.date} dateTime={event.date || undefined}>
                        {eventDateDisplay(event)}
                      </time>
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Предыдущее мероприятие"
          onClick={() => shift(-1)}
          data-test-id="carousel-prev"
        >
          <ArrowLeftIcon size={24} />
        </button>

        <div className={styles.indicators}>
          {events.map((event, index) => (
            <button
              key={event.id}
              type="button"
              className={cn(styles.indicator, index === activeIndex && styles.indicatorActive)}
              aria-label={`Слайд ${index + 1}: ${event.title}`}
              aria-current={index === activeIndex}
              onClick={() => goTo(index)}
              data-test-id={`carousel-indicator-${index}`}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="Следующее мероприятие"
          onClick={() => shift(1)}
          data-test-id="carousel-next"
        >
          <ArrowRightIcon size={24} />
        </button>
      </div>
    </div>
  )
}
