import type { EventItem } from '@/types/domain'
import { formatDottedDate } from './format-date'

function collapseSameDateRange(display: string): string {
  const parts = display.split(' - ')
  if (parts.length === 2 && parts[0] === parts[1]) {
    return parts[0]
  }
  return display
}

export function eventDateDisplay(event: Pick<EventItem, 'date' | 'dateDisplay'>): string {
  if (event.dateDisplay !== undefined && event.dateDisplay !== '') {
    return collapseSameDateRange(event.dateDisplay)
  }
  return formatDottedDate(event.date)
}
