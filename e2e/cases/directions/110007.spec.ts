import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'

test.describe('Направления', () => {
  test('кнопка «Назад» ведёт на главную', async ({ page }) => {
    const directionPage = new DirectionPage(page)

    await test.step('Открыть страницу направления', async () => {
      await directionPage.open('it')
    })

    await test.step('Нажать «Назад»', async () => {
      await directionPage.clickBack()
    })

    await test.step('Проверить, что открылась главная страница', async () => {
      await directionPage.checkUrl(/\/$/)
    })
  })
})
