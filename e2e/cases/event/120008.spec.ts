import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('галерея: переключение кнопками, миниатюрами и клавиатурой', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть лайтбокс на первом фото', async () => {
      await eventPage.open('its-fest-2026')
      await eventPage.gallery.openLightbox(0)
      await eventPage.gallery.checkCounter('1 / 6')
    })

    await test.step('Переключить кнопкой «вперёд»', async () => {
      await eventPage.gallery.clickNext()
      await eventPage.gallery.checkCounter('2 / 6')
    })

    await test.step('Переключить стрелкой на клавиатуре', async () => {
      await eventPage.gallery.pressArrowLeft()
      await eventPage.gallery.checkCounter('1 / 6')
    })

    await test.step('Переключить кнопкой «назад»', async () => {
      await eventPage.gallery.clickPrev()
      await eventPage.gallery.checkCounter('6 / 6')
    })

    await test.step('Переключить миниатюрой', async () => {
      await eventPage.gallery.clickThumb(2)
      await eventPage.gallery.checkCounter('3 / 6')
    })
  })
})
