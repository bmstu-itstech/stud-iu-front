import { expect, test } from '@playwright/test'

test.describe('Страница новости', () => {
  test('открывается по клику на карточку с главной', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('news-card').first().click()

    await expect(page).toHaveURL(/\/news\/vybory-predsedatelya$/)
    await expect(page.getByTestId('news-page')).toBeVisible()
    await expect(page.getByTestId('news-title')).toContainText('Выборы председателя')
  })

  test('показывает дату, полный текст и источник', async ({ page }) => {
    await page.goto('/news/vybory-predsedatelya')

    await expect(page.getByTestId('news-title')).toBeVisible()
    await expect(page.getByTestId('news-content')).toContainText('Анастасия Евдокимова')
    await expect(page.getByTestId('news-source')).toContainText('Пресс-служба СтудИУ')
    await expect(page.getByTestId('news-back')).toBeVisible()
  })

  test('новость без источника не показывает блок источника', async ({ page }) => {
    await page.goto('/news/nabor-v-komandu')

    await expect(page.getByTestId('news-title')).toContainText('Набор в команду СтудИУ')
    await expect(page.getByTestId('news-source')).toHaveCount(0)
  })

  test('неизвестный id показывает сообщение', async ({ page }) => {
    await page.goto('/news/unknown')

    await expect(page.getByTestId('news-not-found')).toBeAttached()
    await expect(page.getByText('Новость не найдена')).toBeVisible()
  })

  test('контент имеет боковые отступы на мобильных', async ({ page }, testInfo) => {
    await page.goto('/news/vybory-predsedatelya')

    const title = page.getByTestId('news-title')
    await expect(title).toBeVisible()

    if (testInfo.project.name === 'mobile') {
      const titleBox = await title.boundingBox()
      expect(titleBox!.x).toBeGreaterThanOrEqual(12)
    }
  })
})
