import { describe, expect, test } from 'bun:test'

import { buildMonthGrid, todayIso } from './calendar'

describe('buildMonthGrid', () => {
  const grid = buildMonthGrid(2026, 7)

  test('возвращает 42 ячейки (6 недель)', () => {
    expect(grid.length).toBe(42)
  })

  test('начинается с понедельника перед 1 августа (27 июля)', () => {
    expect(grid[0]).toEqual({ iso: '2026-07-27', day: 27, inMonth: false })
  })

  test('1 августа 2026 — суббота, то есть ячейка с индексом 5', () => {
    expect(grid[5]).toEqual({ iso: '2026-08-01', day: 1, inMonth: true })
  })

  test('31 августа — последний день месяца, дальше идут дни сентября', () => {
    expect(grid[35]).toEqual({ iso: '2026-08-31', day: 31, inMonth: true })
    expect(grid[36]).toEqual({ iso: '2026-09-01', day: 1, inMonth: false })
  })

  test('для месяца, начинающегося с понедельника, нет дней слева', () => {
    const february = buildMonthGrid(2027, 1)
    expect(february[0]).toEqual({ iso: '2027-02-01', day: 1, inMonth: true })
  })
})

describe('todayIso', () => {
  test('возвращает дату в формате YYYY-MM-DD', () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
