import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'
import { NewsPage } from '../../elements/pages/newsPage'

test.describe('Страница новости', () => {
  test('открывается по клику на карточку с главной', async ({ page }) => {
    const home = new HomePage(page)
    const newsPage = new NewsPage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Кликнуть по первой новости', async () => {
      await home.news.clickCard(0)
    })

    await test.step('Проверить страницу новости', async () => {
      await newsPage.checkUrl(/\/news\/vybory-predsedatelya$/)
      await newsPage.checkVisible()
      await newsPage.checkTitleContains('Выборы председателя')
    })
  })
})
