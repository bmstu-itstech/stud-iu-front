import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'
import { HomePage } from '../../elements/pages/homePage'

test.describe('Страница мероприятия', () => {
  test('открывается по клику на слайд карусели с главной', async ({ page }, testInfo) => {
    const home = new HomePage(page)
    const eventPage = new EventPage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Кликнуть по слайду', async () => {
      if (testInfo.project.name === 'mobile') {
        await home.upcoming.gallery.clickSlide(0)
      } else {
        await home.upcoming.carousel.clickActiveSlide()
      }
    })

    await test.step('Проверить страницу мероприятия', async () => {
      await eventPage.checkUrl(/\/events\/den-programmista-2026$/)
      await eventPage.checkVisible()
      await eventPage.checkTitle('День программиста 2026')
    })
  })
})
