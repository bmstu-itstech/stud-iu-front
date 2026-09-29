import type { ApplicationPayload, FormField } from '@/types/domain'

const TELEGRAM_FIELD_KEY = 'telegram'

type FormValues = Record<string, string | string[] | undefined>

export function buildApplicationPayload(
  fields: FormField[],
  values: FormValues,
): ApplicationPayload {
  const payload: ApplicationPayload = {}
  for (const field of fields) {
    const value = values[field.key]
    if (field.type === 'multiple_choice') {
      payload[field.key] = Array.isArray(value) ? value : []
    } else if (typeof value === 'string' && value.trim() !== '') {
      const normalized = value.trim()
      payload[field.key] =
        field.key === TELEGRAM_FIELD_KEY ? normalized.replace(/^@/, '') : normalized
    }
  }
  return payload
}
