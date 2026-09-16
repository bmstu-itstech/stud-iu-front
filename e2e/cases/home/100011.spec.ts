import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'
import { JoinPage } from '../../elements/pages/joinPage'
import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Главная страница', () => {
  test('навигация: CTA ведёт на анкету, «Все мероприятия» — на прошедшие', async (
    { page },
    testInfo,
  ) => {
    const home = new HomePage(page)
    const joinPage = new JoinPage(page)
    const pastEventsPage = new PastEventsPage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Перейти в анкету', async () => {
      if (testInfo.project.name === 'mobile') {
        await home.navbar.openMobileMenu()
        await home.navbar.mobileMenu.clickJoinLink()
      } else {
        await home.navbar.clickCta()
      }
      await joinPage.checkUrl(/\/join$/)
      await joinPage.checkFormVisible()
      await page.goBack()
    })

    await test.step('Перейти в прошедшие мероприятия', async () => {
      await home.past.clickAllButton()
      await pastEventsPage.checkUrl(/\/events\/past$/)
      await pastEventsPage.checkVisible()
    })
  })
})
