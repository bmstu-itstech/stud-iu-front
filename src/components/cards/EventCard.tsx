import { Link } from 'react-router-dom'

import type { PastEvent } from '@/types/domain'
import { cn } from '@/utils/cn'
import styles from './event-card.module.css'

interface EventCardProps {
  event: PastEvent
}

export function EventCard({ event }: EventCardProps) {
  const hasImage = event.image !== ''

  return (
    <Link
      to={`/events/${event.id}`}
      className={cn(styles.card, !hasImage && styles.cardNoImage)}
      style={hasImage ? { backgroundImage: `url(${event.image})` } : undefined}
      data-test-id="event-card"
    >
      <h3 className={styles.title}>{event.title}</h3>
    </Link>
  )
}
