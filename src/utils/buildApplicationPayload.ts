import type { ApplicationPayload, FormField } from '@/types/domain'

import { normalizePhone } from './phone-mask'

const TELEGRAM_FIELD_KEY = 'telegram'
const PHONE_FIELD_KEY = 'phone'

type FormValues = Record<string, string | string[] | undefined>

function normalizeValue(field: FormField, value: string): string {
  if (field.key === TELEGRAM_FIELD_KEY) {
    return value.replace(/^@/, '')
  }
  if (field.key === PHONE_FIELD_KEY) {
    return normalizePhone(value)
  }
  return value
}

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
      payload[field.key] = normalizeValue(field, value.trim())
    }
  }
  return payload
}
