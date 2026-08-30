export interface CalendarCell {
  iso: string
  day: number
  inMonth: boolean
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

export function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const start = new Date(year, month, 1 - firstWeekday)

  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    cells.push({
      iso: toIsoDate(date.getFullYear(), date.getMonth(), date.getDate()),
      day: date.getDate(),
      inMonth: date.getMonth() === month,
    })
  }
  return cells
}

export function todayIso(): string {
  const now = new Date()
  return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate())
}
