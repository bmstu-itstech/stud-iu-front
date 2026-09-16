import { expect, type Locator, type Page } from '@playwright/test'

export class NewsPage {
  readonly page: Page
  readonly root: Locator
  readonly title: Locator
  readonly content: Locator
  readonly back: Locator
  private readonly source: Locator
  private readonly notFound: Locator

  constructor(page: Page) {
    this.page = page
    this.root = page.getByTestId('news-page')
    this.title = page.getByTestId('news-title')
    this.content = page.getByTestId('news-content')
    this.back = page.getByTestId('news-back')
    this.source = page.getByTestId('news-source')
    this.notFound = page.getByTestId('news-not-found')
  }

  async open(id: string) {
    await this.page.goto(`/news/${id}`)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkTitleContains(text: string) {
    await expect(this.title).toContainText(text)
  }

  async checkTitleVisible() {
    await expect(this.title).toBeVisible()
  }

  async checkContentContains(text: string) {
    await expect(this.content).toContainText(text)
  }

  async checkSourceContains(text: string) {
    await expect(this.source).toContainText(text)
  }

  async checkSourceHidden() {
    await expect(this.source).toHaveCount(0)
  }

  async checkBackVisible() {
    await expect(this.back).toBeVisible()
  }

  async checkNotFoundAttached() {
    await expect(this.notFound).toBeAttached()
  }

  async checkNotFoundTextVisible() {
    await expect(this.page.getByText('Новость не найдена')).toBeVisible()
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }
}
