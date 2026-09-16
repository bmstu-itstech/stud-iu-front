import { test } from '@playwright/test'

import { NewsPage } from '../../elements/pages/newsPage'

test.describe('Страница новости', () => {
  test('новость без источника не показывает блок источника', async ({ page }) => {
    const newsPage = new NewsPage(page)

    await test.step('Открыть новость без источника', async () => {
      await newsPage.open('nabor-v-komandu')
    })

    await test.step('Проверить отсутствие источника', async () => {
      await newsPage.checkTitleContains('Набор в команду СтудИУ')
      await newsPage.checkSourceHidden()
    })
  })
})
