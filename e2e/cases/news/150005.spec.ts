import { expect, test } from '@playwright/test'

import { NewsPage } from '../../elements/pages/newsPage'

test.describe('Страница новости', () => {
  test('контент имеет боковые отступы на мобильных', async ({ page }, testInfo) => {
    const newsPage = new NewsPage(page)

    await test.step('Открыть новость', async () => {
      await newsPage.open('vybory-predsedatelya')
      await newsPage.checkTitleVisible()
    })

    if (testInfo.project.name === 'mobile') {
      await test.step('Проверить боковые отступы', async () => {
        const titleBox = await newsPage.title.boundingBox()
        expect(titleBox!.x).toBeGreaterThanOrEqual(12)
      })
    }
  })
})
