import { describe, expect, test } from 'bun:test'

import { eventDateDisplay } from './event-date'

describe('eventDateDisplay', () => {
  test('склеивает период с одинаковыми датами в одну дату', () => {
    expect(
      eventDateDisplay({ date: '', dateDisplay: '11 октября 2026 - 11 октября 2026' }),
    ).toBe('11 октября 2026')
  })

  test('склеивает период с одинаковыми месяцами', () => {
    expect(eventDateDisplay({ date: '', dateDisplay: 'октябрь 2026 - октябрь 2026' })).toBe(
      'октябрь 2026',
    )
  })

  test('разные даты периода остаются как есть', () => {
    expect(
      eventDateDisplay({ date: '', dateDisplay: '11 октября 2026 - 12 октября 2026' }),
    ).toBe('11 октября 2026 - 12 октября 2026')
  })

  test('одиночная дата проходит без изменений', () => {
    expect(eventDateDisplay({ date: '', dateDisplay: '11 октября 2026' })).toBe(
      '11 октября 2026',
    )
  })

  test('время с дефисом не ломает определение периода', () => {
    expect(
      eventDateDisplay({ date: '', dateDisplay: '11 октября 2026 12:00-18:00' }),
    ).toBe('11 октября 2026 12:00-18:00')
  })

  test('без dateDisplay используется дата из поля date', () => {
    expect(eventDateDisplay({ date: '2026-10-11', dateDisplay: undefined })).toBe('11.10.2026')
  })
})
