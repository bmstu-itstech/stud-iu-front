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
      return
    }

    await test.step('Сузить окно, чтобы карусель не помещалась и появились стрелки', async () => {
      await page.setViewportSize({ width: 1024, height: 900 })
    })

    await test.step('В начале прокрутки стрелка «назад» скрыта, «вперёд» видна', async () => {
      await home.partners.checkArrowsMissingAtEdges()
    })

    await test.step('Прокрутить карусель до конца стрелкой «вперёд»', async () => {
      await home.partners.clickNextArrow()
      await home.partners.checkArrowVisible('prev')
      await home.partners.checkArrowMissing('next')
    })

    await test.step('Вернуться в начало стрелкой «назад»', async () => {
      await home.partners.clickPrevArrow()
      await home.partners.checkArrowsMissingAtEdges()
    })
  })
})
