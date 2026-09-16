import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'

test.describe('Направления', () => {
  test('у «Технического обеспечения» есть приписка про навыки', async ({ page }) => {
    const directionPage = new DirectionPage(page)

    await test.step('Открыть страницу «Техническое обеспечение»', async () => {
      await directionPage.open('tech')
    })

    await test.step('Проверить заголовок', async () => {
      await directionPage.checkTitle('Техническое обеспечение')
    })

    await test.step('Проверить карточку вступления с припиской', async () => {
      await directionPage.join.checkLeader('Майя Скородина')
      await directionPage.join.checkNote('Навыки не нужны')
      await directionPage.join.checkJoinHref('/join?direction=event_tech_support')
    })
  })
})
