import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'
import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Прошедшие мероприятия', () => {
  test('карточки кликабельны и ведут на страницу мероприятия', async ({ page }) => {
    const pastEventsPage = new PastEventsPage(page)
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу и кликнуть первую карточку', async () => {
      await pastEventsPage.open()
      await pastEventsPage.openFirstCard()
    })

    await test.step('Проверить страницу мероприятия', async () => {
      await eventPage.checkUrl(/\/events\/its-fest-2026$/)
      await eventPage.checkTitle('ITS FEST 2026')
    })
  })
})
