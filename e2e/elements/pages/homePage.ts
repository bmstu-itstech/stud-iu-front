import { expect, type Locator, type Page } from '@playwright/test'

import { DirectionsSection } from '../widgets/directionsSection'
import { Footer } from '../widgets/footer'
import { Navbar } from '../widgets/navbar'

export class AboutSection {
  readonly root: Locator
  readonly cta: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('about-section')
    this.cta = this.root.getByTestId('about-cta')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }
}

export class StatsSection {
  readonly root: Locator
  readonly cards: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('stats-section')
    this.cards = this.root.getByTestId('stat-card')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkCardsCount(count: number) {
    await expect(this.cards).toHaveCount(count)
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }
}

export class UpcomingCarousel {
  readonly root: Locator
  readonly activeSlide: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('upcoming-carousel')
    this.activeSlide = this.root.getByTestId('carousel-slide-active')
  }

  indicator(index: number): Locator {
    return this.root.getByTestId(`carousel-indicator-${index}`)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkActiveSlideContains(text: string) {
    await expect(this.activeSlide).toContainText(text)
  }

  async checkIndicatorsCount(count: number) {
    await expect(this.root.getByTestId(/carousel-indicator-\d/)).toHaveCount(count)
  }

  async checkIndicatorColor(index: number, color: string) {
    await expect(this.indicator(index)).toHaveCSS('background-color', color)
  }

  async clickNext() {
    await this.root.getByTestId('carousel-next').click()
  }

  async clickPrev() {
    await this.root.getByTestId('carousel-prev').click()
  }

  async clickActiveSlide() {
    await this.activeSlide.click()
  }
}

export class UpcomingGallery {
  readonly root: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('upcoming-gallery')
  }

  slide(index: number): Locator {
    return this.root.getByTestId(`gallery-slide-${index}`)
  }

  indicator(index: number): Locator {
    return this.root.getByTestId(`gallery-indicator-${index}`)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkSlidesCount(count: number) {
    await expect(this.root.getByTestId(/gallery-slide-\d/)).toHaveCount(count)
  }

  async checkSlideContains(index: number, text: string) {
    await expect(this.slide(index)).toContainText(text)
  }

  async checkIndicatorColor(index: number, color: string) {
    await expect(this.indicator(index)).toHaveCSS('background-color', color)
  }

  async clickSlide(index: number) {
    await this.slide(index).click()
  }
}

export class UpcomingEvents {
  readonly carousel: UpcomingCarousel
  readonly gallery: UpcomingGallery

  constructor(page: Page) {
    this.carousel = new UpcomingCarousel(page)
    this.gallery = new UpcomingGallery(page)
  }
}

export class NewsSection {
  readonly root: Locator
  readonly cards: Locator
  private readonly allButton: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('news-section')
    this.cards = this.root.getByTestId('news-card')
    this.allButton = this.root.getByTestId('news-all-button')
  }

  card(index: number): Locator {
    return this.cards.nth(index)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkCardsCount(count: number) {
    await expect(this.cards).toHaveCount(count)
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkAllButtonVisible() {
    await expect(this.allButton).toBeVisible()
  }

  async clickCard(index: number) {
    await this.card(index).click()
  }

  async checkInViewport() {
    await expect(this.root).toBeInViewport()
  }
}

export class PastEventsSection {
  readonly root: Locator
  readonly cards: Locator
  private readonly allButton: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('past-events-section')
    this.cards = this.root.getByTestId('event-card')
    this.allButton = this.root.getByTestId('past-events-all-button')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkCardsCount(count: number) {
    await expect(this.cards).toHaveCount(count)
  }

  async checkAllButtonVisible() {
    await expect(this.allButton).toBeVisible()
  }

  async clickAllButton() {
    await this.allButton.click()
  }
}

export class PartnersSection {
  readonly root: Locator
  readonly logos: Locator
  private readonly carousel: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('partners-section')
    this.logos = this.root.getByTestId('partner-logo')
    this.carousel = this.root.getByTestId('partners-carousel')
  }

  private arrow(kind: 'prev' | 'next'): Locator {
    return this.carousel.getByTestId(`partners-${kind}`)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkLogosCount(count: number) {
    await expect(this.logos).toHaveCount(count)
  }

  async checkArrowsHidden() {
    await expect(this.arrow('prev')).toBeHidden()
    await expect(this.arrow('next')).toBeHidden()
  }

  async checkArrowsDisabled() {
    await expect(this.arrow('prev')).toBeDisabled()
    await expect(this.arrow('next')).toBeDisabled()
  }
}

export class ContactsSection {
  readonly root: Locator
  readonly cards: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('contacts-section')
    this.cards = this.root.getByTestId('contact-card')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkCardsCount(count: number) {
    await expect(this.cards).toHaveCount(count)
  }
}

export class HomePage {
  readonly page: Page
  readonly navbar: Navbar
  readonly about: AboutSection
  readonly stats: StatsSection
  readonly upcoming: UpcomingEvents
  readonly directions: DirectionsSection
  readonly news: NewsSection
  readonly past: PastEventsSection
  readonly partners: PartnersSection
  readonly contacts: ContactsSection
  readonly footer: Footer

  constructor(page: Page) {
    this.page = page
    this.navbar = new Navbar(page)
    this.about = new AboutSection(page)
    this.stats = new StatsSection(page)
    this.upcoming = new UpcomingEvents(page)
    this.directions = new DirectionsSection(page)
    this.news = new NewsSection(page)
    this.past = new PastEventsSection(page)
    this.partners = new PartnersSection(page)
    this.contacts = new ContactsSection(page)
    this.footer = new Footer(page)
  }

  async open() {
    await this.page.goto('/')
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }
}
