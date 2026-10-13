import { expect, test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.use({ permissions: ['clipboard-read'] })

test.describe('Страница мероприятия', () => {
  test('галерея: копирование ссылки на фото через меню', async ({ page, browserName }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть лайтбокс на третьем фото', async () => {
      await eventPage.open('its-fest-2026')
      await eventPage.gallery.openLightbox(2)
      await eventPage.gallery.checkLightboxVisible()
    })

    await test.step('Скопировать ссылку через меню', async () => {
      await eventPage.gallery.openMenu()
      await eventPage.gallery.clickCopyLink()
    })

    await test.step('Проверить тост и содержимое буфера обмена', async () => {
      await eventPage.gallery.checkToastText('Ссылка скопирована')
      await eventPage.gallery.checkMenuHidden()
      if (browserName !== 'chromium') return
      const src = await eventPage.gallery.getLightboxImageSrc()
      const clipboard = await eventPage.gallery.readClipboardText()
      expect(clipboard).toBe(new URL(src, page.url()).href)
    })
  })
})
