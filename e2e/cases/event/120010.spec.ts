import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('показывает 404-состояние для неизвестного id', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу несуществующего мероприятия', async () => {
      await eventPage.open('unknown-event')
    })

    await test.step('Проверить заглушку', async () => {
      await eventPage.checkNotFoundVisible()
      await eventPage.checkBackHomeLinkVisible()
    })
  })
})
