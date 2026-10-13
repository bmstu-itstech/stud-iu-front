import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('галерея: меню действий с фото открывается и закрывается', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть лайтбокс на первом фото', async () => {
      await eventPage.open('its-fest-2026')
      await eventPage.gallery.checkImagesCount(6)
      await eventPage.gallery.openLightbox(0)
      await eventPage.gallery.checkLightboxVisible()
      await eventPage.gallery.checkMoreButtonVisible()
    })

    await test.step('Открыть меню кнопкой-троеточием', async () => {
      await eventPage.gallery.openMenu()
      await eventPage.gallery.checkMenuVisible()
      await eventPage.gallery.checkMenuItemsVisible()
    })

    await test.step('Закрыть меню кликом по фотографии', async () => {
      await eventPage.gallery.clickLightboxImage()
      await eventPage.gallery.checkMenuHidden()
      await eventPage.gallery.checkLightboxVisible()
    })

    await test.step('Закрыть меню по Escape, лайтбокс остаётся открытым', async () => {
      await eventPage.gallery.openMenu()
      await eventPage.gallery.checkMenuVisible()
      await eventPage.gallery.pressEscape()
      await eventPage.gallery.checkMenuHidden()
      await eventPage.gallery.checkLightboxVisible()
    })

    await test.step('Меню закрывается при переключении фото', async () => {
      await eventPage.gallery.openMenu()
      await eventPage.gallery.checkMenuVisible()
      await eventPage.gallery.clickNext()
      await eventPage.gallery.checkMenuHidden()
      await eventPage.gallery.checkLightboxVisible()
      await eventPage.gallery.checkCounter('2 / 6')
    })
  })
})
