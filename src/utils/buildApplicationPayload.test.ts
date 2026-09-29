import { describe, expect, test } from 'bun:test'

import { buildApplicationPayload } from './buildApplicationPayload'
import type { FormField } from '@/types/domain'

function field(overrides: Partial<FormField> & { key: string }): FormField {
  return {
    label: overrides.key,
    type: 'text',
    required: false,
    placeholder: null,
    pattern: null,
    options: null,
    dependsOn: null,
    ...overrides,
  }
}

describe('buildApplicationPayload', () => {
  test('ник в Telegram уходит на сервер без «@»', () => {
    const payload = buildApplicationPayload([field({ key: 'telegram' })], {
      telegram: '@ivanov',
    })

    expect(payload.telegram).toBe('ivanov')
  })

  test('ник без «@» остаётся как есть', () => {
    const payload = buildApplicationPayload([field({ key: 'telegram' })], {
      telegram: 'ivanov',
    })

    expect(payload.telegram).toBe('ivanov')
  })

  test('строковые значения обрезаются, пустые не попадают в payload', () => {
    const payload = buildApplicationPayload(
      [field({ key: 'full_name' }), field({ key: 'github_url' })],
      {
        full_name: '  Иванов Иван  ',
        github_url: '   ',
      },
    )

    expect(payload.full_name).toBe('Иванов Иван')
    expect(payload.github_url).toBeUndefined()
  })

  test('мультиселект попадает в payload даже пустым', () => {
    const payload = buildApplicationPayload([field({ key: 'categories', type: 'multiple_choice' })], {
      categories: [],
    })

    expect(payload.categories).toEqual([])
  })

  test('не передаются значения отсутствующих в схеме полей', () => {
    const payload = buildApplicationPayload([field({ key: 'full_name' })], {
      full_name: 'Иванов Иван',
      hacker_field: 'hack',
    })

    expect(payload.hacker_field).toBeUndefined()
    expect(Object.keys(payload)).toEqual(['full_name'])
  })
})
