import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'

test.describe('Направления', () => {
  test('у «Проектного направления» нет руководителя', async ({ page }) => {
    const directionPage = new DirectionPage(page)

    await test.step('Открыть страницу «Проектное направление»', async () => {
      await directionPage.open('projects')
    })

    await test.step('Проверить мероприятия направления', async () => {
      await directionPage.checkTitle('Проектное направление')
      await directionPage.checkContentContains('Музхак')
      await directionPage.checkContentContains('Кроссбитва')
    })

    await test.step('Проверить карточку вступления без руководителя', async () => {
      await directionPage.join.checkNoLeader()
      await directionPage.join.checkJoinHref('/join?direction=event_planning')
    })
  })
})
