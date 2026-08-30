import { expect, test } from '@playwright/test'

test.describe('Страница мероприятия', () => {
  test('открывается по клику на слайд карусели с главной', async ({ page }, testInfo) => {
    await page.goto('/')

    if (testInfo.project.name === 'mobile') {
      await page.getByTestId('gallery-slide-0').click()
    } else {
      await page.getByTestId('carousel-slide-active').click()
    }

    await expect(page).toHaveURL(/\/events\/den-programmista-2026$/)
    const eventPage = page.getByTestId('event-page')
    await expect(eventPage).toBeVisible()
    await expect(page.getByTestId('event-title')).toContainText('День программиста 2026')
  })

  test('показывает детали регистрации и свободные места', async ({ page }) => {
    await page.goto('/events/den-programmista-2026')

    const card = page.getByTestId('registration-card')
    await expect(card).toBeVisible()
    await expect(card).toContainText('Детали регистрации')
    await expect(card).toContainText('Дата проведения')
    await expect(card).toContainText('14 июня 2026, 12:00')
    await expect(card).toContainText('42/200')
    await expect(card.getByTestId('seats-progress')).toBeVisible()
  })

  test('кнопка «Зарегистрироваться» меняет состояние', async ({ page }) => {
    await page.goto('/events/den-programmista-2026')

    const button = page.getByTestId('register-button')
    await expect(button).toContainText('Зарегистрироваться')

    await button.click()
    await expect(button).toContainText('Вы зарегистрированы')
    await expect(button).toBeDisabled()
    await expect(page.getByTestId('register-success')).toBeVisible()
  })

  test('показывает спикеров и организаторов', async ({ page }) => {
    await page.goto('/events/den-programmista-2026')

    await expect(page.getByTestId('speaker-card')).toHaveCount(3)
    await expect(page.getByTestId('speaker-card').first()).toContainText('Анастасия Евдокимова')
  })

  test('FAQ раскрывается по клику на вопрос', async ({ page }) => {
    await page.goto('/events/den-programmista-2026')

    const questions = page.getByTestId('faq-question')
    await expect(questions).toHaveCount(4)

    await questions.first().click()
    await expect(page.getByTestId('faq-answer').first()).toBeVisible()
    await expect(page.getByTestId('faq-answer').first()).toContainText('Никак')

    await questions.first().click()
    await expect(page.getByTestId('faq-answer')).toHaveCount(0)
  })

  test('прошедшее мероприятие: серая кнопка «Регистрация завершена»', async ({ page }) => {
    await page.goto('/events/its-fest-2026')

    await expect(page.getByTestId('event-title')).toContainText('ITS FEST 2026')
    await expect(page.getByTestId('registration-card')).toBeVisible()

    const button = page.getByTestId('register-button')
    await expect(button).toContainText('Регистрация завершена')
    await expect(button).toBeDisabled()

    await expect(page.getByTestId('event-gallery')).toBeVisible()
  })

  test('галерея: фото открывается в лайтбоксе по клику', async ({ page }) => {
    await page.goto('/events/its-fest-2026')

    const images = page.getByTestId('gallery-image')
    await expect(images).toHaveCount(6)

    await images.nth(2).click()

    const lightbox = page.getByTestId('gallery-lightbox')
    await expect(lightbox).toBeVisible()
    await expect(page.getByTestId('gallery-lightbox-counter')).toHaveText('3 / 6')
    await expect(page.getByTestId('gallery-lightbox-image')).toBeVisible()
  })

  test('галерея: переключение кнопками, миниатюрами и клавиатурой', async ({ page }) => {
    await page.goto('/events/its-fest-2026')

    await page.getByTestId('gallery-image').first().click()
    const counter = page.getByTestId('gallery-lightbox-counter')
    await expect(counter).toHaveText('1 / 6')

    await page.getByTestId('gallery-lightbox-next').click()
    await expect(counter).toHaveText('2 / 6')

    await page.keyboard.press('ArrowLeft')
    await expect(counter).toHaveText('1 / 6')

    await page.getByTestId('gallery-lightbox-prev').click()
    await expect(counter).toHaveText('6 / 6')

    await page.getByTestId('gallery-lightbox-thumb-2').click()
    await expect(counter).toHaveText('3 / 6')
  })

  test('галерея: закрытие по Esc, крестику и клику по фону', async ({ page }) => {
    await page.goto('/events/its-fest-2026')

    const lightbox = page.getByTestId('gallery-lightbox')

    await page.getByTestId('gallery-image').first().click()
    await expect(lightbox).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(lightbox).toHaveCount(0)

    await page.getByTestId('gallery-image').first().click()
    await expect(lightbox).toBeVisible()
    await page.getByTestId('gallery-lightbox-close').click()
    await expect(lightbox).toHaveCount(0)

    await page.getByTestId('gallery-image').first().click()
    await expect(lightbox).toBeVisible()
    await page
      .getByTestId('gallery-lightbox-stage')
      .click({ position: { x: 2, y: 2 } })
    await expect(lightbox).toHaveCount(0)
  })

  test('показывает 404-состояние для неизвестного id', async ({ page }) => {
    await page.goto('/events/unknown-event')

    await expect(page.getByText('Мероприятие не найдено')).toBeVisible()
    await expect(page.getByTestId('back-home-link')).toBeVisible()
  })

  test('открытая регистрация: на мобильных выше «О мероприятии», на десктопе — в колонке справа', async ({
    page,
  }, testInfo) => {
    await page.goto('/events/den-programmista-2026')

    const card = page.getByTestId('registration-card')
    const aboutHeading = page.getByRole('heading', { name: 'О мероприятии' })
    await expect(card).toBeVisible()
    await expect(aboutHeading).toBeVisible()

    const cardBox = await card.boundingBox()
    const aboutBox = await aboutHeading.boundingBox()

    if (testInfo.project.name === 'mobile') {
      expect(cardBox!.y).toBeLessThan(aboutBox!.y)
    } else {
      expect(cardBox!.x).toBeGreaterThan(aboutBox!.x)
    }
  })

  test('завершённая регистрация: на мобильных остаётся внизу страницы', async ({ page }, testInfo) => {
    await page.goto('/events/its-fest-2026')

    const card = page.getByTestId('registration-card')
    const aboutHeading = page.getByRole('heading', { name: 'О мероприятии' })
    await expect(card).toBeVisible()
    await expect(aboutHeading).toBeVisible()

    const cardBox = await card.boundingBox()
    const aboutBox = await aboutHeading.boundingBox()

    if (testInfo.project.name === 'mobile') {
      expect(cardBox!.y).toBeGreaterThan(aboutBox!.y)
    } else {
      expect(cardBox!.x).toBeGreaterThan(aboutBox!.x)
    }
  })
})
