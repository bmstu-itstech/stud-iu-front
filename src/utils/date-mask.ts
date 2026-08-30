export function formatDateDigits(digits: string): string {
  const clean = digits.replace(/\D/g, '').slice(0, 8)
  const parts = [clean.slice(0, 2), clean.slice(2, 4), clean.slice(4, 8)].filter(Boolean)
  return parts.join('.')
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function dateDigitsToIso(digits: string): string {
  const clean = digits.replace(/\D/g, '')
  if (clean.length < 8) return ''

  const day = Number(clean.slice(0, 2))
  const month = Number(clean.slice(2, 4))
  const year = Number(clean.slice(4, 8))

  if (month < 1 || month > 12) return ''
  if (year < 1900 || year > 2100) return ''
  if (day < 1 || day > daysInMonth(year, month)) return ''

  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${year}-${mm}-${dd}`
}

export function isoToDisplayDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return ''
  return `${match[3]}.${match[2]}.${match[1]}`
}
