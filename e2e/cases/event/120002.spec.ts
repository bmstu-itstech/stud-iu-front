import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('показывает детали регистрации и свободные места', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу мероприятия', async () => {
      await eventPage.open('den-programmista-2026')
    })

    await test.step('Проверить детали регистрации', async () => {
      await eventPage.registration.checkVisible()
      await eventPage.registration.checkContains('Детали регистрации')
      await eventPage.registration.checkContains('Дата проведения')
      await eventPage.registration.checkContains('14 июня 2026, 12:00')
      await eventPage.registration.checkContains('42/200')
      await eventPage.registration.checkSeatsProgressVisible()
    })
  })
})
