import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('прошедшее мероприятие: серая кнопка «Регистрация завершена»', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу прошедшего мероприятия', async () => {
      await eventPage.open('its-fest-2026')
    })

    await test.step('Проверить закрытую регистрацию', async () => {
      await eventPage.checkTitle('ITS FEST 2026')
      await eventPage.registration.checkVisible()
      await eventPage.registration.checkRegisterButtonText('Регистрация завершена')
      await eventPage.registration.checkRegisterDisabled()
    })

    await test.step('Проверить галерею', async () => {
      await eventPage.gallery.checkSectionVisible()
    })
  })
})
