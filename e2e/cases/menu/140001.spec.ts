import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.use({ viewport: { width: 402, height: 874 } })

test.describe('Мобильное меню', () => {
  test('бургер открывает оверлей-меню, крестик закрывает', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Открыть меню по бургеру', async () => {
      await home.navbar.checkLinksHidden()
      await home.navbar.checkBurgerVisible()
      await home.navbar.openMobileMenu()
    })

    await test.step('Проверить содержимое меню', async () => {
      await home.navbar.mobileMenu.checkVisible()
      await home.navbar.mobileMenu.checkLinksCount(4)
      await home.navbar.mobileMenu.checkJoinLinkVisible()
    })

    await test.step('Закрыть меню по крестику', async () => {
      await home.navbar.mobileMenu.close()
      await home.navbar.mobileMenu.checkHidden()
    })
  })
})
