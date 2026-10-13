export function toPhoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  } else if (!digits.startsWith('7') && digits !== '') {
    digits = `7${digits}`
  }
  return digits.slice(0, 11)
}

export function formatPhone(raw: string): string {
  const digits = toPhoneDigits(raw)
  if (digits === '') return ''
  if (digits.length <= 1) return '+7'

  const rest = digits.slice(1)
  let result = '+7'
  if (rest.length > 0) result += `(${rest.slice(0, 3)}`
  if (rest.length >= 3) result += ')'
  if (rest.length > 3) result += rest.slice(3, 6)
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`
  return result
}

export function normalizePhone(raw: string): string {
  return `+${toPhoneDigits(raw)}`
}

export function isValidPhone(raw: string): boolean {
  return /^\+7\d{10}$/.test(normalizePhone(raw))
}
