import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons'
import type { EventItem } from '@/types/domain'
import { cn } from '@/utils/cn'
import { eventDateDisplay } from '@/utils/event-date'
import styles from './upcoming-carousel.module.css'

const ROLE_BY_DISTANCE = ['far', 'near', 'active', 'near', 'far'] as const

const SLOT_OFFSET = [-1304, -732, 0, 732, 1304]

const OFFSCREEN_SLOTS = 2.5
const OPACITY_TRANSITION = 'opacity 0.3s ease'

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

const SETTLE_MS = 500

interface UpcomingCarouselProps {
  events: EventItem[]
}

export function UpcomingCarousel({ events }: UpcomingCarouselProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [positions, setPositions] = useState<number[]>([])
  const [jumpIds, setJumpIds] = useState<string[]>([])
  const positionsRef = useRef<number[]>([])
  const activeIndexRef = useRef(0)
  const settleTimeout = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(settleTimeout.current), [])

  const count = events.length

  useEffect(() => {
    window.clearTimeout(settleTimeout.current)
    const initial = events.map((_, i) => wrappedDistance(i, 0, count))
    positionsRef.current = initial
    activeIndexRef.current = 0
    setPositions(initial)
    setJumpIds([])
    setActiveIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  function goTo(index: number): void {
    const prev = activeIndexRef.current
    const delta = wrappedDistance(index, prev, count)
    if (delta === 0) return

    window.clearTimeout(settleTimeout.current)

    const jumpedIds: string[] = []
    const nextPositions = events.map((_, i) => {
      const current = positionsRef.current[i] ?? wrappedDistance(i, prev, count)
      const canonical = wrappedDistance(i, index, count)
      let target: number
      if (i === index) {
        target = 0
      } else {
        const shift = current - canonical
        const k = Math.abs(shift) * 2 === count ? 0 : Math.round(shift / count)
        target = canonical + count * k
      }
      if (Math.abs(target - current) > OFFSCREEN_SLOTS) {
        jumpedIds.push(events[i].id)
      }
      return target
    })

    positionsRef.current = nextPositions
    activeIndexRef.current = index
    setPositions(nextPositions)
    setJumpIds(jumpedIds)
    setActiveIndex(index)

    settleTimeout.current = window.setTimeout(() => {
      const settled = events.map((_, i) => wrappedDistance(i, index, count))
      const movedIds: string[] = []
      for (let i = 0; i < count; i++) {
        if (positionsRef.current[i] !== settled[i]) movedIds.push(events[i].id)
      }
      positionsRef.current = settled
      setPositions(settled)
      setJumpIds(movedIds)
    }, SETTLE_MS)
  }

  if (count === 0) return null

  const shift = (delta: number) => goTo((activeIndexRef.current + delta + count) % count)

  return (
    <div className={styles.root} data-test-id="upcoming-carousel">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {events.map((event, index) => {
            const position = positions[index] ?? wrappedDistance(index, activeIndexRef.current, count)
            const absDistance = Math.abs(position)
            const isActive = absDistance === 0
            const role = ROLE_BY_DISTANCE[Math.min(absDistance, 2)]
            const isHidden = absDistance > 2
            const isJumping = jumpIds.includes(event.id)

            return (
              <button
                key={event.id}
                type="button"
                className={cn(styles.slide, styles[role], isHidden && styles.hidden)}
                style={{
                  transform: `translate(-50%, -50%) translateX(${slotOffset(position)}px) scale(${slideScale(absDistance)})`,
                  ...(isJumping && { transition: OPACITY_TRANSITION }),
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
