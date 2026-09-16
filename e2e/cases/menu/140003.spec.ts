import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'
import { JoinPage } from '../../elements/pages/joinPage'

test.use({ viewport: { width: 402, height: 874 } })

test.describe('Мобильное меню', () => {
  test('«Стать активистом» в меню ведёт на анкету', async ({ page }) => {
    const home = new HomePage(page)
    const joinPage = new JoinPage(page)

    await test.step('Открыть главную страницу и меню', async () => {
      await home.open()
      await home.navbar.openMobileMenu()
    })

    await test.step('Кликнуть «Стать активистом»', async () => {
      await home.navbar.mobileMenu.clickJoinLink()
    })

    await test.step('Проверить анкету', async () => {
      await joinPage.checkUrl(/\/join$/)
      await joinPage.checkFormVisible()
    })
  })
})
