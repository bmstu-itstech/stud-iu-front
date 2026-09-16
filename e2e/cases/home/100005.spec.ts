import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('секция «Направления»: 6 тегов', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить секцию «Направления»', async () => {
      await home.directions.checkVisible()
      await home.directions.checkTagsCount(6)
    })
  })
})
