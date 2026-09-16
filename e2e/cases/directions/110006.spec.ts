import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'

test.describe('Направления', () => {
  test('списки на странице «Внутренних коммуникаций»', async ({ page }) => {
    const directionPage = new DirectionPage(page)

    await test.step('Открыть страницу «Внутренние коммуникации»', async () => {
      await directionPage.open('internal-comms')
    })

    await test.step('Проверить блоки направления', async () => {
      await directionPage.checkContentContains('С чего начинается путь')
      await directionPage.checkContentContains('Что развивает активист')
      await directionPage.checkContentContains('Декомпозиция задач')
      await directionPage.checkContentContains('Путь активиста в направлении')
      await directionPage.checkContentContains('Руководитель направления')
    })

    await test.step('Проверить CTA', async () => {
      await directionPage.join.checkJoinHref('/join?direction=team_building')
    })
  })
})
