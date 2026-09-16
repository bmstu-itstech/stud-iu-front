import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('футер: название, почта, адрес, кнопки', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить футер', async () => {
      await home.footer.checkVisible()
      await home.footer.checkContains('Студенческий совет ИУ')
      await home.footer.checkEmailHref('mailto:inbox@stud-iu.ru')
      await home.footer.checkAddressContains('Бригадирский пер., 13')
      await home.footer.checkJoinButtonVisible()
      await home.footer.checkPartnerButtonVisible()
    })
  })
})
