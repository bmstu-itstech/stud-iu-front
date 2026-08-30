import { expect, test } from '@playwright/test'

test.describe('Мобильное меню', () => {
  test.use({ viewport: { width: 402, height: 874 } })

  test('бургер открывает оверлей-меню, крестик закрывает', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('navbar-link').first()).toBeHidden()
    await expect(page.getByTestId('navbar-burger')).toBeVisible()

    await page.getByTestId('navbar-burger').click()
    const menu = page.getByTestId('navbar-menu')
    await expect(menu).toBeVisible()
    await expect(menu.getByTestId('navbar-menu-link')).toHaveCount(4)
    await expect(menu.getByTestId('navbar-menu-link-join')).toBeVisible()

    await page.getByTestId('navbar-menu-close').click()
    await expect(menu).toBeHidden()
  })

  test('клик по ссылке меню закрывает меню и скроллит к секции', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('navbar-burger').click()
    await page
      .getByTestId('navbar-menu-link')
      .filter({ hasText: 'Новости' })
      .click()

    await expect(page.getByTestId('navbar-menu')).toBeHidden()
    await expect(page).toHaveURL(/#news$/)
    await expect(page.getByTestId('news-section')).toBeInViewport()
  })

  test('«Стать активистом» в меню ведёт на анкету', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('navbar-burger').click()
    await page.getByTestId('navbar-menu-link-join').click()

    await expect(page).toHaveURL(/\/join$/)
    await expect(page.getByTestId('join-form')).toBeVisible()
  })
})
