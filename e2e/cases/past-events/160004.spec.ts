import { test } from '@playwright/test'

import { PastEventsPage } from '../../elements/pages/pastEventsPage'

test.describe('Прошедшие мероприятия', () => {
  test('пустой результат поиска показывает сообщение', async ({ page }) => {
    const pastEventsPage = new PastEventsPage(page)

    await test.step('Открыть страницу и найти «абракадабра»', async () => {
      await pastEventsPage.open()
      await pastEventsPage.fillSearch('абракадабра')
    })

    await test.step('Проверить пустое состояние', async () => {
      await pastEventsPage.checkCardsCount(0)
      await pastEventsPage.checkEmptyVisible()
    })
  })
})
