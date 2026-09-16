import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Главная страница', () => {
  test('карусель предстоящих мероприятий: активный слайд и индикаторы', async (
    { page },
    testInfo,
  ) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    if (testInfo.project.name === 'mobile') {
      await test.step('Проверить галерею на мобильных', async () => {
        await home.upcoming.gallery.checkVisible()
        await home.upcoming.gallery.checkSlidesCount(5)
        await home.upcoming.gallery.checkSlideContains(0, 'День программиста 2026')
        await home.upcoming.gallery.checkIndicatorColor(0, 'rgb(0, 108, 220)')
      })
      return
    }

    await test.step('Проверить карусель на десктопе', async () => {
      await home.upcoming.carousel.checkVisible()
      await home.upcoming.carousel.checkActiveSlideContains('День программиста 2026')
      await home.upcoming.carousel.checkIndicatorsCount(5)
      await home.upcoming.carousel.checkIndicatorColor(0, 'rgb(36, 36, 36)')
    })

    await test.step('Листнуть вперёд', async () => {
      await home.upcoming.carousel.clickNext()
      await home.upcoming.carousel.checkIndicatorColor(1, 'rgb(36, 36, 36)')
      await home.upcoming.carousel.checkActiveSlideContains('Хакатон ИУ')
    })

    await test.step('Листнуть назад', async () => {
      await home.upcoming.carousel.clickPrev()
      await home.upcoming.carousel.checkActiveSlideContains('День программиста 2026')
    })
  })
})
