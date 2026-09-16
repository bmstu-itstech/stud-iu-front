import { test } from '@playwright/test'

import { NewsPage } from '../../elements/pages/newsPage'

test.describe('Страница новости', () => {
  test('неизвестный id показывает сообщение', async ({ page }) => {
    const newsPage = new NewsPage(page)

    await test.step('Открыть несуществующую новость', async () => {
      await newsPage.open('unknown')
    })

    await test.step('Проверить заглушку', async () => {
      await newsPage.checkNotFoundAttached()
      await newsPage.checkNotFoundTextVisible()
    })
  })
})
