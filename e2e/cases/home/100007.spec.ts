import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('секция «Прошедшие мероприятия» на тёмном фоне: 8 карточек', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить секцию «Прошедшие мероприятия»', async () => {
      await home.past.checkVisible()
      await home.past.checkCardsCount(8)
      await home.past.checkAllButtonVisible()
    })
  })
})
