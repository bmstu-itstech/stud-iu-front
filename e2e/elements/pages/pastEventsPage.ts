import { expect, type Locator, type Page } from '@playwright/test'

export class PastEventsPage {
  readonly page: Page
  readonly root: Locator
  readonly cards: Locator
  private readonly search: Locator
  private readonly emptyState: Locator

  constructor(page: Page) {
    this.page = page
    this.root = page.getByTestId('past-events-page')
    this.cards = this.root.getByTestId('event-card')
    this.search = this.root.getByTestId('events-search')
    this.emptyState = this.root.getByTestId('events-empty')
  }

  async open() {
    await this.page.goto('/events/past')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkCardsCount(count: number) {
    await expect(this.cards).toHaveCount(count)
  }

  async checkCardsContain(text: string) {
    await expect(this.cards).toContainText(text)
  }

  async checkSearchVisible() {
    await expect(this.search).toBeVisible()
  }

  async fillSearch(text: string) {
    await this.search.fill(text)
  }

  async checkEmptyVisible() {
    await expect(this.emptyState).toBeVisible()
  }

  async openFirstCard() {
    await this.cards.first().click()
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }
}
