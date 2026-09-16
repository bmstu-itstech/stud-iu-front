import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('отображает шапку с меню и CTA', async ({ page }, testInfo) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить шапку', async () => {
      await home.navbar.checkVisible()
      await home.navbar.checkLogoVisible()
    })

    if (testInfo.project.name === 'mobile') {
      await test.step('На мобильных виден бургер', async () => {
        await home.navbar.checkBurgerVisible()
      })
    } else {
      await test.step('На десктопе видны меню и CTA', async () => {
        await home.navbar.checkLinksCount(4)
        await home.navbar.checkCtaVisible()
      })
    }
  })
})
