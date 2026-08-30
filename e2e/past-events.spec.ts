import { expect, test } from '@playwright/test'

test.describe('Прошедшие мероприятия', () => {
  test('отображает 8 карточек и поиск', async ({ page }) => {
    await page.goto('/events/past')

    const pageRoot = page.getByTestId('past-events-page')
    await expect(pageRoot).toBeVisible()
    await expect(pageRoot).toContainText('Прошедшие мероприятия')
    await expect(pageRoot.getByTestId('event-card')).toHaveCount(8)
    await expect(pageRoot.getByTestId('events-search')).toBeVisible()
  })

  test('поиск фильтрует карточки по названию', async ({ page }) => {
    await page.goto('/events/past')

    const search = page.getByTestId('events-search')
    await search.fill('ITS')
    await expect(page.getByTestId('event-card')).toHaveCount(1)
    await expect(page.getByTestId('event-card')).toContainText('ITS FEST 2026')
  })

  test('поиск без учёта регистра', async ({ page }) => {
    await page.goto('/events/past')

    await page.getByTestId('events-search').fill('новый год')
    await expect(page.getByTestId('event-card')).toHaveCount(1)
  })

  test('пустой результат поиска показывает сообщение', async ({ page }) => {
    await page.goto('/events/past')

    await page.getByTestId('events-search').fill('абракадабра')
    await expect(page.getByTestId('event-card')).toHaveCount(0)
    await expect(page.getByTestId('events-empty')).toBeVisible()
  })

  test('карточки кликабельны и ведут на страницу мероприятия', async ({ page }) => {
    await page.goto('/events/past')

    await page.getByTestId('event-card').first().click()
    await expect(page).toHaveURL(/\/events\/its-fest-2026$/)
    await expect(page.getByTestId('event-title')).toContainText('ITS FEST 2026')
  })

  test('очистка поиска возвращает все карточки', async ({ page }) => {
    await page.goto('/events/past')

    const search = page.getByTestId('events-search')
    await search.fill('ITS')
    await expect(page.getByTestId('event-card')).toHaveCount(1)

    await search.fill('')
    await expect(page.getByTestId('event-card')).toHaveCount(8)
  })
})
