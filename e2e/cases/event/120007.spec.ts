import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('галерея: фото открывается в лайтбоксе по клику', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу прошедшего мероприятия', async () => {
      await eventPage.open('its-fest-2026')
    })

    await test.step('Открыть третье фото', async () => {
      await eventPage.gallery.checkImagesCount(6)
      await eventPage.gallery.openLightbox(2)
    })

    await test.step('Проверить лайтбокс', async () => {
      await eventPage.gallery.checkLightboxVisible()
      await eventPage.gallery.checkCounter('3 / 6')
      await eventPage.gallery.checkLightboxImageVisible()
    })
  })
})
