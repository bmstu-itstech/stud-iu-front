import { expect, test } from 'bun:test'

import { dateDigitsToIso, formatDateDigits, isoToDisplayDate } from './date-mask'

test('formatDateDigits ставит точки после дня и месяца', () => {
  expect(formatDateDigits('01062004')).toBe('01.06.2004')
  expect(formatDateDigits('010')).toBe('01.0')
  expect(formatDateDigits('1')).toBe('1')
  expect(formatDateDigits('')).toBe('')
})

test('formatDateDigits игнорирует нецифровые символы и ограничивает длину', () => {
  expect(formatDateDigits('01.06.2004')).toBe('01.06.2004')
  expect(formatDateDigits('абв14062026')).toBe('14.06.2026')
  expect(formatDateDigits('1234567890')).toBe('12.34.5678')
})

test('dateDigitsToIso собирает ISO из полных корректных цифр', () => {
  expect(dateDigitsToIso('01062004')).toBe('2004-06-01')
  expect(dateDigitsToIso('29022004')).toBe('2004-02-29')
})

test('dateDigitsToIso отклоняет неполные и невозможные даты', () => {
  expect(dateDigitsToIso('0106')).toBe('')
  expect(dateDigitsToIso('')).toBe('')
  expect(dateDigitsToIso('31022004')).toBe('')
  expect(dateDigitsToIso('01132004')).toBe('')
  expect(dateDigitsToIso('01011899')).toBe('')
})

test('isoToDisplayDate переводит ISO в точечный формат', () => {
  expect(isoToDisplayDate('2004-06-01')).toBe('01.06.2004')
  expect(isoToDisplayDate('')).toBe('')
  expect(isoToDisplayDate('мусор')).toBe('')
})
