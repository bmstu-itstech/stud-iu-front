import { test } from '@playwright/test'

import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Прошедшие мероприятия', () => {
  test('очистка поиска возвращает все карточки', async ({ page }) => {
    const pastEventsPage = new PastEventsPage(page)

    await test.step('Открыть страницу и найти «ITS»', async () => {
      await pastEventsPage.open()
      await pastEventsPage.fillSearch('ITS')
      await pastEventsPage.checkCardsCount(1)
    })

    await test.step('Очистить поиск', async () => {
      await pastEventsPage.fillSearch('')
      await pastEventsPage.checkCardsCount(8)
    })
  })
})
