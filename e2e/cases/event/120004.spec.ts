import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('показывает спикеров и организаторов', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу мероприятия', async () => {
      await eventPage.open('den-programmista-2026')
    })

    await test.step('Проверить спикеров', async () => {
      await eventPage.checkSpeakersCount(3)
      await eventPage.checkSpeakerContains(0, 'Анастасия Евдокимова')
    })
  })
})
