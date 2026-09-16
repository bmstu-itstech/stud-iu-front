import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.use({ viewport: { width: 402, height: 874 } })

test.describe('Мобильное меню', () => {
  test('клик по ссылке меню закрывает меню и скроллит к секции', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу и меню', async () => {
      await home.open()
      await home.navbar.openMobileMenu()
    })

    await test.step('Кликнуть «Новости»', async () => {
      await home.navbar.mobileMenu.clickLink('Новости')
    })

    await test.step('Проверить переход к секции', async () => {
      await home.navbar.mobileMenu.checkHidden()
      await home.checkUrl(/#news$/)
      await home.news.checkInViewport()
    })
  })
})
