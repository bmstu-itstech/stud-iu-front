import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('секция «Новости»: 6 карточек и кнопка «Все новости»', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить секцию «Новости»', async () => {
      await home.news.checkVisible()
      await home.news.checkCardsCount(6)
      await home.news.checkContains('Выборы председателя')
      await home.news.checkAllButtonVisible()
    })
  })
})
