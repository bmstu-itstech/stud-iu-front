import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'
import { HomePage } from '../../elements/pages/homePage'

test.describe('Направления', () => {
  test('клик по тегу открывает страницу направления', async ({ page }) => {
    const home = new HomePage(page)
    const directionPage = new DirectionPage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Кликнуть по тегу «IT-направление»', async () => {
      await home.directions.clickTag('IT-направление')
    })

    await test.step('Проверить, что открылась страница направления', async () => {
      await directionPage.checkUrl(/\/directions\/it$/)
      await directionPage.checkTitle('IT-направление')
    })
  })
})
