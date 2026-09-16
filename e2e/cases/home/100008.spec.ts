import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('секция «Партнёры»: карусель из 14 логотипов со стрелками', async ({ page }, testInfo) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить логотипы партнёров', async () => {
      await home.partners.checkVisible()
      await home.partners.checkLogosCount(14)
    })

    if (testInfo.project.name === 'mobile') {
      await test.step('На мобильных стрелки скрыты', async () => {
        await home.partners.checkArrowsHidden()
      })
    } else {
      await test.step('На десктопе стрелки неактивны', async () => {
        await home.partners.checkArrowsDisabled()
      })
    }
  })
})
