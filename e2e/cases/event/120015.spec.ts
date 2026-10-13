import { expect, test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('галерея: сохранение фото через меню', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть лайтбокс на первом фото', async () => {
      await eventPage.open('its-fest-2026')
      await eventPage.gallery.openLightbox(0)
      await eventPage.gallery.checkLightboxVisible()
    })

    await test.step('Сохранить фото через меню', async () => {
      await eventPage.gallery.openMenu()
      const download = await eventPage.gallery.downloadPhoto()
      await eventPage.gallery.checkToastText('Фото сохраняется')
      expect(download.suggestedFilename()).toBe('ITS FEST 2026 — фото 1.png')
    })
  })
})
