import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('кнопка «Зарегистрироваться» меняет состояние', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу мероприятия', async () => {
      await eventPage.open('den-programmista-2026')
    })

    await test.step('Зарегистрироваться', async () => {
      await eventPage.registration.checkRegisterButtonText('Зарегистрироваться')
      await eventPage.registration.clickRegister()
    })

    await test.step('Проверить смену состояния кнопки', async () => {
      await eventPage.registration.checkRegisterButtonText('Вы зарегистрированы')
      await eventPage.registration.checkRegisterDisabled()
      await eventPage.registration.checkRegisterSuccessVisible()
    })
  })
})
