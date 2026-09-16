import { test } from '@playwright/test'

import { HomePage } from '../../elements/pages/homePage'

test.describe('Направления', () => {
  test('на главной есть секция «Направления» с 6 тегами', async ({ page }) => {
    const home = new HomePage(page)

    await test.step('Открыть главную страницу', async () => {
      await home.open()
    })

    await test.step('Проверить секцию «Направления»', async () => {
      await home.directions.checkVisible()
      await home.directions.checkTagsCount(6)
    })

    await test.step('Проверить названия всех направлений', async () => {
      for (const title of [
        'IT-направление',
        'Проектное направление',
        'Внутренние коммуникации',
        'Медиа ИУ',
        'Техническое обеспечение',
        'Внешние коммуникации',
      ]) {
        await home.directions.checkTagVisible(title)
      }
    })
  })
})
