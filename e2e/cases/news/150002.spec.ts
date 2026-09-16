import { test } from '@playwright/test'

import { NewsPage } from '../../elements/pages/newsPage'

test.describe('Страница новости', () => {
  test('показывает дату, полный текст и источник', async ({ page }) => {
    const newsPage = new NewsPage(page)

    await test.step('Открыть новость', async () => {
      await newsPage.open('vybory-predsedatelya')
    })

    await test.step('Проверить содержимое', async () => {
      await newsPage.checkTitleVisible()
      await newsPage.checkContentContains('Анастасия Евдокимова')
      await newsPage.checkSourceContains('Пресс-служба СтудИУ')
      await newsPage.checkBackVisible()
    })
  })
})
