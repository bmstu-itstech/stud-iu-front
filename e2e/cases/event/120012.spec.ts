import { expect, test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('завершённая регистрация: на мобильных остаётся внизу страницы', async ({
    page,
  }, testInfo) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу мероприятия с завершённой регистрацией', async () => {
      await eventPage.open('its-fest-2026')
      await eventPage.registration.checkVisible()
      await expect(eventPage.aboutHeading).toBeVisible()
    })

    await test.step('Проверить положение карточки регистрации', async () => {
      const cardBox = await eventPage.registration.root.boundingBox()
      const aboutBox = await eventPage.aboutHeading.boundingBox()

      if (testInfo.project.name === 'mobile') {
        expect(cardBox!.y).toBeGreaterThan(aboutBox!.y)
      } else {
        expect(cardBox!.x).toBeGreaterThan(aboutBox!.x)
      }
    })
  })
})
