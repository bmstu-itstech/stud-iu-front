import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('секция «О нас»: заголовок, текст и 4 стат-карточки', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить секцию «О нас»', async () => {
      await home.about.checkVisible()
      await home.about.checkContains('Студ_ИУ')
    })

    await test.step('Проверить стат-карточки', async () => {
      await home.stats.checkVisible()
      await home.stats.checkCardsCount(4)
      await home.stats.checkContains('250 активистов')
      await home.stats.checkContains('50 мероприятий')
      await home.stats.checkContains('∞ идей')
      await home.stats.checkContains('24/7')
    })
  })
})
