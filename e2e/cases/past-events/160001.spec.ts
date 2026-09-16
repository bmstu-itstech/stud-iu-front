import { test } from '@playwright/test'

import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Прошедшие мероприятия', () => {
  test('отображает 8 карточек и поиск', async ({ page }) => {
    const pastEventsPage = new PastEventsPage(page)

    await test.step('Открыть страницу прошедших мероприятий', async () => {
      await pastEventsPage.open()
    })

    await test.step('Проверить карточки и поиск', async () => {
      await pastEventsPage.checkVisible()
      await pastEventsPage.checkContains('Прошедшие мероприятия')
      await pastEventsPage.checkCardsCount(8)
      await pastEventsPage.checkSearchVisible()
    })
  })
})
