import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('секция «Контакты»: 3 карточки контактов', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить секцию «Контакты»', async () => {
      await home.contacts.checkVisible()
      await home.contacts.checkCardsCount(3)
    })
  })
})
