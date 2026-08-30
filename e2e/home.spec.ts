import { expect, test } from '@playwright/test'

test.describe('Главная страница', () => {
  test('отображает шапку с меню и CTA', async ({ page }, testInfo) => {
    await page.goto('/')

    const navbar = page.getByTestId('navbar')
    await expect(navbar).toBeVisible()
    await expect(navbar.getByTestId('navbar-logo')).toBeVisible()

    if (testInfo.project.name === 'mobile') {
      await expect(navbar.getByTestId('navbar-burger')).toBeVisible()
    } else {
      await expect(navbar.getByTestId('navbar-link')).toHaveCount(4)
      await expect(page.getByTestId('navbar-cta')).toBeVisible()
    }
  })

  test('секция «О нас»: заголовок, текст и 4 стат-карточки', async ({ page }) => {
    await page.goto('/')

    const about = page.getByTestId('about-section')
    await expect(about).toBeVisible()
    await expect(about).toContainText('Студ_ИУ')

    const stats = page.getByTestId('stats-section')
    await expect(stats.getByTestId('stat-card')).toHaveCount(4)
    await expect(stats).toContainText('250 активистов')
    await expect(stats).toContainText('50 мероприятий')
    await expect(stats).toContainText('∞ идей')
    await expect(stats).toContainText('24/7')
  })

  test('карусель предстоящих мероприятий: активный слайд и индикаторы', async ({
    page,
  }, testInfo) => {
    await page.goto('/')

    if (testInfo.project.name === 'mobile') {
      const gallery = page.getByTestId('upcoming-gallery')
      await expect(gallery).toBeVisible()
      await expect(gallery.getByTestId(/gallery-slide-\d/)).toHaveCount(5)
      await expect(gallery.getByTestId('gallery-slide-0')).toContainText('День программиста 2026')
      await expect(gallery.getByTestId('gallery-indicator-0')).toHaveCSS(
        'background-color',
        'rgb(0, 108, 220)',
      )
      return
    }

    const carousel = page.getByTestId('upcoming-carousel')
    await expect(carousel).toBeVisible()

    const activeSlide = carousel.getByTestId('carousel-slide-active')
    await expect(activeSlide).toContainText('День программиста 2026')

    await expect(carousel.getByTestId(/carousel-indicator-\d/)).toHaveCount(5)
    await expect(carousel.getByTestId('carousel-indicator-0')).toHaveCSS(
      'background-color',
      'rgb(36, 36, 36)',
    )

    await carousel.getByTestId('carousel-next').click()
    await expect(carousel.getByTestId('carousel-indicator-1')).toHaveCSS(
      'background-color',
      'rgb(36, 36, 36)',
    )
    await expect(activeSlide).toContainText('Хакатон ИУ')

    await carousel.getByTestId('carousel-prev').click()
    await expect(activeSlide).toContainText('День программиста 2026')
  })

  test('клик по активному слайду открывает страницу мероприятия', async (
    { page },
    testInfo,
  ) => {
    await page.goto('/')

    if (testInfo.project.name === 'mobile') {
      await page.getByTestId('gallery-slide-0').click()
    } else {
      await page.getByTestId('carousel-slide-active').click()
    }

    await expect(page).toHaveURL(/\/events\/den-programmista-2026$/)
    await expect(page.getByTestId('event-title')).toBeVisible()
  })

  test('секция «Новости»: 6 карточек и кнопка «Все новости»', async ({ page }) => {
    await page.goto('/')

    const news = page.getByTestId('news-section')
    await expect(news).toBeVisible()
    await expect(news.getByTestId('news-card')).toHaveCount(6)
    await expect(news).toContainText('Выборы председателя')
    await expect(news.getByTestId('news-all-button')).toBeVisible()
  })

  test('секция «Прошедшие мероприятия» на тёмном фоне: 8 карточек', async ({ page }) => {
    await page.goto('/')

    const past = page.getByTestId('past-events-section')
    await expect(past).toBeVisible()
    await expect(past.getByTestId('event-card')).toHaveCount(8)
    await expect(past.getByTestId('past-events-all-button')).toBeVisible()
  })

  test('секция «Партнёры»: карусель из 14 логотипов со стрелками', async ({ page }, testInfo) => {
    await page.goto('/')

    const partners = page.getByTestId('partners-section')
    await expect(partners).toBeVisible()
    await expect(partners.getByTestId('partner-logo')).toHaveCount(14)

    const carousel = partners.getByTestId('partners-carousel')
    if (testInfo.project.name === 'mobile') {
      await expect(carousel.getByTestId('partners-prev')).toBeHidden()
      await expect(carousel.getByTestId('partners-next')).toBeHidden()
      return
    }

    await expect(carousel.getByTestId('partners-prev')).toBeDisabled()
    await expect(carousel.getByTestId('partners-next')).toBeDisabled()
  })

  test('секция «Контакты»: 3 карточки контактов', async ({ page }) => {
    await page.goto('/')

    const contacts = page.getByTestId('contacts-section')
    await expect(contacts).toBeVisible()
    await expect(contacts.getByTestId('contact-card')).toHaveCount(3)
  })

  test('футер: название, почта, адрес, кнопки', async ({ page }) => {
    await page.goto('/')

    const footer = page.getByTestId('footer')
    await expect(footer).toBeVisible()
    await expect(footer).toContainText('Студенческий совет ИУ')
    await expect(footer.getByTestId('footer-email')).toHaveAttribute('href', 'mailto:inbox@stud-iu.ru')
    await expect(footer.getByTestId('footer-address')).toContainText('Бригадирский пер., 13')
    await expect(footer.getByTestId('footer-join')).toBeVisible()
    await expect(footer.getByTestId('footer-partner')).toBeVisible()
  })

  test('навигация: CTA ведёт на анкету, «Все мероприятия» — на прошедшие', async (
    { page },
    testInfo,
  ) => {
    await page.goto('/')

    if (testInfo.project.name === 'mobile') {
      await page.getByTestId('navbar-burger').click()
      await page.getByTestId('navbar-menu-link-join').click()
      await expect(page).toHaveURL(/\/join$/)
      await expect(page.getByTestId('join-title')).toBeVisible()

      await page.goBack()
    } else {
      await page.getByTestId('navbar-cta').click()
      await expect(page).toHaveURL(/\/join$/)
      await expect(page.getByTestId('join-title')).toBeVisible()

      await page.goBack()
    }

    await page.getByTestId('past-events-all-button').click()
    await expect(page).toHaveURL(/\/events\/past$/)
    await expect(page.getByTestId('past-events-page')).toBeVisible()
  })
})
