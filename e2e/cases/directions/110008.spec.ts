import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'

test.describe('Направления', () => {
  test('неизвестное направление показывает заглушку', async ({ page }) => {
    const directionPage = new DirectionPage(page)

    await test.step('Открыть страницу несуществующего направления', async () => {
      await directionPage.open('nope')
    })

    await test.step('Проверить заглушку', async () => {
      await directionPage.checkNotFoundVisible()
    })

    await test.step('Перейти на главную по ссылке в заглушке', async () => {
      await directionPage.clickBackHome()
      await directionPage.checkUrl(/\/$/)
    })
  })
})
