import { describe, expect, test } from 'bun:test'

import { formatDottedDate, formatLongDate } from './format-date'

describe('formatDottedDate', () => {
  test('форматирует дату без времени', () => {
    expect(formatDottedDate('2026-06-14')).toBe('14.06.2026')
  })

  test('форматирует дату со временем', () => {
    expect(formatDottedDate('2026-04-12T00:00')).toBe('12.04.2026')
  })

  test('не зависит от часового пояса (парсим ISO вручную)', () => {
    expect(formatDottedDate('2026-01-01')).toBe('01.01.2026')
  })

  test('возвращает вход как есть для невалидной строки', () => {
    expect(formatDottedDate('не дата')).toBe('не дата')
  })
})

describe('formatLongDate', () => {
  test('форматирует дату в родительном падеже', () => {
    expect(formatLongDate('2026-06-14')).toBe('14 июня 2026')
  })

  test('добавляет время по флагу', () => {
    expect(formatLongDate('2026-06-14T12:00', true)).toBe('14 июня 2026, 12:00')
  })

  test('не добавляет время, если его нет в ISO', () => {
    expect(formatLongDate('2026-06-14', true)).toBe('14 июня 2026')
  })

  test('возвращает вход как есть для невалидной строки', () => {
    expect(formatLongDate('')).toBe('')
  })
})
