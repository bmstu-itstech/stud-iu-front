import { test } from '@playwright/test'

import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Прошедшие мероприятия', () => {
  test('поиск фильтрует карточки по названию', async ({ page }) => {
    const pastEventsPage = new PastEventsPage(page)

    await test.step('Открыть страницу и найти «ITS»', async () => {
      await pastEventsPage.open()
      await pastEventsPage.fillSearch('ITS')
    })

    await test.step('Проверить результат поиска', async () => {
      await pastEventsPage.checkCardsCount(1)
      await pastEventsPage.checkCardsContain('ITS FEST 2026')
    })
  })
})
