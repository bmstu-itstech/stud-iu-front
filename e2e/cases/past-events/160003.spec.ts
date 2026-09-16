import { test } from '@playwright/test'

import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Прошедшие мероприятия', () => {
  test('поиск без учёта регистра', async ({ page }) => {
    const pastEventsPage = new PastEventsPage(page)

    await test.step('Открыть страницу и найти «новый год»', async () => {
      await pastEventsPage.open()
      await pastEventsPage.fillSearch('новый год')
    })

    await test.step('Проверить результат поиска', async () => {
      await pastEventsPage.checkCardsCount(1)
    })
  })
})
