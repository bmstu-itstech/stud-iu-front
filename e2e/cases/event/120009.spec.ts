import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('галерея: закрытие по Esc, крестику и клику по фону', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Закрыть по Escape', async () => {
      await eventPage.open('its-fest-2026')
      await eventPage.gallery.openLightbox(0)
      await eventPage.gallery.checkLightboxVisible()
      await eventPage.gallery.pressEscape()
      await eventPage.gallery.checkLightboxHidden()
    })

    await test.step('Закрыть по крестику', async () => {
      await eventPage.gallery.openLightbox(0)
      await eventPage.gallery.checkLightboxVisible()
      await eventPage.gallery.clickClose()
      await eventPage.gallery.checkLightboxHidden()
    })

    await test.step('Закрыть кликом по фону', async () => {
      await eventPage.gallery.openLightbox(0)
      await eventPage.gallery.checkLightboxVisible()
      await eventPage.gallery.clickStageCorner()
      await eventPage.gallery.checkLightboxHidden()
    })
  })
})
