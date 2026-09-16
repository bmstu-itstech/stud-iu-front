import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'

test.describe('Направления', () => {
  test('страница IT-направления: контент, руководитель и CTA', async ({ page }) => {
    const directionPage = new DirectionPage(page)

    await test.step('Открыть страницу IT-направления', async () => {
      await directionPage.open('it')
    })

    await test.step('Проверить заголовок и описание направления', async () => {
      await directionPage.checkVisible()
      await directionPage.checkTitle('IT-направление')
      await directionPage.checkContentContains('О направлении')
      await directionPage.checkContentContains('ITS Tech')
      await directionPage.checkContentContains('Bauman Code Games')
      await directionPage.checkContentContains('ITS FEST')
    })

    await test.step('Проверить карточку вступления', async () => {
      await directionPage.join.checkVisible()
      await directionPage.join.checkLeader('Кирилл Жихарев')
      await directionPage.join.checkJoinHref('/join?direction=programming')
    })
  })
})
