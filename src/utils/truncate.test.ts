import { describe, expect, test } from 'bun:test'

import { truncate } from './truncate'

describe('truncate', () => {
  test('короткая строка остаётся без изменений', () => {
    expect(truncate('Новости', 18)).toBe('Новости')
  })

  test('строка ровно по лимиту не обрезается', () => {
    const text = 'а'.repeat(18)
    expect(truncate(text, 18)).toBe(text)
  })

  test('длинная строка обрезается с многоточием', () => {
    expect(truncate('Выборы председателя', 18)).toBe('Выборы председател…')
  })

  test('пустая строка остаётся пустой', () => {
    expect(truncate('', 18)).toBe('')
  })
})
