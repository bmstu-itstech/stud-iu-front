const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const

interface IsoParts {
  year: number
  month: number
  day: number
  hours?: number
  minutes?: number
}

function parseIso(iso: string): IsoParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/.exec(iso)
  if (!match) return null

  const [, year, month, day, hours, minutes] = match
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hours: hours !== undefined ? Number(hours) : undefined,
    minutes: minutes !== undefined ? Number(minutes) : undefined,
  }
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatDottedDate(iso: string): string {
  const parts = parseIso(iso)
  if (!parts) return iso
  return `${pad(parts.day)}.${pad(parts.month)}.${parts.year}`
}

export function formatLongDate(iso: string, withTime = false): string {
  const parts = parseIso(iso)
  if (!parts) return iso

  const base = `${parts.day} ${MONTHS_GENITIVE[parts.month - 1]} ${parts.year}`
  if (!withTime || parts.hours === undefined) return base

  return `${base}, ${pad(parts.hours)}:${pad(parts.minutes ?? 0)}`
}
