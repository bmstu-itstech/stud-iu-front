import { describe, expect, test } from 'bun:test'

import { formatPhone, isValidPhone, normalizePhone, toPhoneDigits } from './phone-mask'

describe('toPhoneDigits', () => {
  test('убирает все нецифровые символы', () => {
    expect(toPhoneDigits('+7(925)553-24-01')).toBe('79255532401')
  })

  test('восьмёрку в начале превращает в 7', () => {
    expect(toPhoneDigits('89255532401')).toBe('79255532401')
  })

  test('добавляет 7, если номер начинается с цифры оператора', () => {
    expect(toPhoneDigits('9255532401')).toBe('79255532401')
  })

  test('ограничивает длину 11 цифрами', () => {
    expect(toPhoneDigits('+7925553240112345')).toBe('79255532401')
  })
})

describe('formatPhone', () => {
  test('форматирует номер с маской', () => {
    expect(formatPhone('79255532401')).toBe('+7(925)553-24-01')
  })

  test('форматирует частичный ввод по мере набора', () => {
    expect(formatPhone('7')).toBe('+7')
    expect(formatPhone('79')).toBe('+7(9')
    expect(formatPhone('7925')).toBe('+7(925)')
    expect(formatPhone('79255')).toBe('+7(925)5')
    expect(formatPhone('7925553')).toBe('+7(925)553')
    expect(formatPhone('79255532')).toBe('+7(925)553-2')
    expect(formatPhone('792555324')).toBe('+7(925)553-24')
    expect(formatPhone('7925553240')).toBe('+7(925)553-24-0')
    expect(formatPhone('79255532401')).toBe('+7(925)553-24-01')
  })

  test('принимает уже отформатированный ввод', () => {
    expect(formatPhone('+7(925)553-24-01')).toBe('+7(925)553-24-01')
  })
})

describe('normalizePhone', () => {
  test('формата с маской', () => {
    expect(normalizePhone('+7(925)553-24-01')).toBe('+79255532401')
  })

  test('восьмёрки в начале', () => {
    expect(normalizePhone('89255532401')).toBe('+79255532401')
  })
})

describe('isValidPhone', () => {
  test('валидный номер', () => {
    expect(isValidPhone('+7(925)553-24-01')).toBe(true)
  })

  test('короткий номер невалиден', () => {
    expect(isValidPhone('+7925553240')).toBe(false)
  })
})
