import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('календарь: выбор даты заполняет поле', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Выбрать дату через календарь', async () => {
      await joinPage.birthDate.openCalendar()
      await joinPage.birthDate.checkCalendarVisible()
      await joinPage.birthDate.selectYear('2004')
      await joinPage.birthDate.selectMonth('5')
      await joinPage.birthDate.clickDay('2004-06-01')
      await joinPage.birthDate.checkCalendarHidden()
    })

    await test.step('Проверить значение поля', async () => {
      await joinPage.birthDate.checkValue('01.06.2004')
    })
  })
})
