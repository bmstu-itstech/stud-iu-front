import { expect, test } from '@playwright/test'

const CATEGORIES = 'join-field-categories'

test.describe('Анкета активиста', () => {
  test('поля формы приходят из схемы бэкенда', async ({ page }) => {
    await page.goto('/join')

    await expect(page.getByTestId('join-form')).toBeVisible()
    await expect(page.getByTestId('join-field-full_name')).toBeVisible()
    await expect(page.getByTestId('join-field-group')).toBeVisible()
    await expect(page.getByTestId('join-field-birth_date')).toBeVisible()
    await expect(page.getByTestId('join-field-telegram_url')).toBeVisible()
    await expect(page.getByTestId('join-field-vk_url')).toBeVisible()
    await expect(page.getByTestId(CATEGORIES)).toBeVisible()
    await expect(page.getByTestId('consent-checkbox')).toBeVisible()
    await expect(page.getByTestId('submit-button')).toBeVisible()
  })

  test('условные поля скрыты, пока не выбрано направление', async ({ page }) => {
    await page.goto('/join')

    await expect(page.getByTestId('join-field-github_url')).toHaveCount(0)
    await expect(page.getByTestId('join-field-tech_tasks')).toHaveCount(0)
    await expect(page.getByTestId('join-field-portfolio_url')).toHaveCount(0)
    await expect(page.getByTestId('join-field-visual_content_types')).toHaveCount(0)

    await page.getByTestId(CATEGORIES).click()
    await page
      .getByTestId('join-field-categories-option-programming')
      .click()

    await expect(page.getByTestId('join-field-github_url')).toBeVisible()
    await expect(page.getByTestId('join-field-tech_tasks')).toBeVisible()

    await page
      .getByTestId('join-field-categories-option-content_creation')
      .click()

    await expect(page.getByTestId('join-field-portfolio_url')).toBeVisible()
    await expect(page.getByTestId('join-field-visual_content_types')).toBeVisible()
  })

  test('пустая отправка показывает ошибки валидации', async ({ page }) => {
    await page.goto('/join')

    await page.getByTestId('submit-button').click()

    await expect(page.getByText('Заполните поле «ФИО»')).toBeVisible()
    await expect(page.getByText('Заполните поле «Учебная группа»')).toBeVisible()
    await expect(page.getByText('Заполните поле «Дата рождения»')).toBeVisible()
    await expect(page.getByText('Заполните поле «Ссылка на Telegram»')).toBeVisible()
    await expect(page.getByText('Заполните поле «Ссылка на профиль в VK»')).toBeVisible()
    await expect(page.getByText('Выберите хотя бы один вариант').first()).toBeVisible()
    await expect(page.getByText('Подтвердите согласие').first()).toBeVisible()
  })

  test('мультиселект: выбор и снятие опций обновляют счётчик', async ({ page }) => {
    await page.goto('/join')

    await page.getByTestId(CATEGORIES).click()
    await page.getByTestId('join-field-categories-option-programming').click()
    await page.getByTestId('join-field-categories-option-event_planning').click()

    await expect(page.getByTestId(CATEGORIES)).toContainText('Выбрано: 2')

    await page.getByTestId('join-field-categories-option-programming').click()
    await expect(page.getByTestId(CATEGORIES)).toContainText('Выбрано: 1')
  })

  test('мультиселект закрывается по клику мимо', async ({ page }) => {
    await page.goto('/join')

    await page.getByTestId(CATEGORIES).click()
    await expect(page.getByTestId('join-field-categories-option-programming')).toBeVisible()

    await page.getByTestId('join-title').click()
    await expect(page.getByTestId('join-field-categories-option-programming')).toHaveCount(0)
  })

  test('календарь: выбор даты заполняет поле', async ({ page }) => {
    await page.goto('/join')

    await page.getByTestId('join-field-birth_date-toggle').click()
    const calendar = page.getByTestId('join-field-birth_date-calendar')
    await expect(calendar).toBeVisible()

    await page.getByTestId('join-field-birth_date-year').selectOption('2004')
    await page.getByTestId('join-field-birth_date-month').selectOption('5')
    await page.getByTestId('join-field-birth_date-day-2004-06-01').click()

    await expect(page.getByTestId('join-field-birth_date')).toHaveValue('01.06.2004')
    await expect(calendar).toBeHidden()
  })

  test('ввод даты с клавиатуры: точки ставятся автоматически', async ({ page }) => {
    await page.goto('/join')

    const field = page.getByTestId('join-field-birth_date')

    await field.fill('01062004')
    await expect(field).toHaveValue('01.06.2004')

    await field.fill('0106')
    await expect(field).toHaveValue('01.06')
    await page.getByTestId('submit-button').click()
    await expect(page.getByText('Заполните поле «Дата рождения»')).toBeVisible()
  })

  test('ссылки на Telegram и VK проверяются по формату', async ({ page }) => {
    await page.goto('/join')

    const telegram = page.getByTestId('join-field-telegram_url')
    const vk = page.getByTestId('join-field-vk_url')

    await telegram.fill('@ivanov')
    await vk.fill('vk.com/ivanov')
    await page.getByTestId('submit-button').click()

    await expect(
      page.getByText('Некорректная ссылка — пример: https://t.me/durov'),
    ).toBeVisible()
    await expect(
      page.getByText('Некорректная ссылка — пример: https://vk.ru/durov'),
    ).toBeVisible()

    await telegram.fill('https://t.me/ivanov')
    await vk.fill('https://vk.ru/ivanov')
    await page.getByTestId('submit-button').click()
    await expect(page.getByText('Некорректная ссылка — пример: https://t.me/durov')).toHaveCount(0)
  })

  test('у успешной отправки поля заполнены плейсхолдерами схемы', async ({ page }) => {
    await page.goto('/join')

    await expect(page.getByTestId('join-field-full_name')).toHaveAttribute(
      'placeholder',
      'Иванов Иван Сергеевич',
    )
    await expect(page.getByTestId('join-field-telegram_url')).toHaveAttribute(
      'placeholder',
      'https://t.me/durov',
    )
  })

  test('успешная отправка после заполнения всех полей', async ({ page }) => {
    await page.goto('/join')

    await page.getByTestId('join-field-full_name').fill('Иванов Иван Сергеевич')
    await page.getByTestId('join-field-group').fill('ИУ6-42Б')
    await page.getByTestId('join-field-telegram_url').fill('https://t.me/ivanov')
    await page.getByTestId('join-field-vk_url').fill('https://vk.com/ivanov')

    await page.getByTestId('join-field-birth_date-toggle').click()
    const calendar = page.getByTestId('join-field-birth_date-calendar')
    await expect(calendar).toBeVisible()
    await page.getByTestId('join-field-birth_date-year').selectOption('2004')
    await page.getByTestId('join-field-birth_date-month').selectOption('5')
    await page.getByTestId('join-field-birth_date-day-2004-06-01').click()
    await expect(calendar).toBeHidden()

    await page.getByTestId(CATEGORIES).click()
    await page.getByTestId('join-field-categories-option-programming').click()
    await page.getByTestId('join-title').click()

    await page.getByTestId('join-field-github_url').fill('https://github.com/ivanov')

    await page.getByTestId('join-field-tech_tasks').click()
    await page.getByTestId('join-field-tech_tasks-option-web').click()
    await page.getByTestId('join-title').click()

    await page.getByTestId('consent-checkbox').click()
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('form-success')).toBeVisible()
    await expect(page.getByTestId('form-success')).toContainText('Заявка отправлена')
  })
})
