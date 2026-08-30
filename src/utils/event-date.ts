import type { EventItem } from '@/types/domain'
import { formatDottedDate } from './format-date'

export function eventDateDisplay(event: Pick<EventItem, 'date' | 'dateDisplay'>): string {
  if (event.dateDisplay !== undefined && event.dateDisplay !== '') return event.dateDisplay
  return formatDottedDate(event.date)
}
