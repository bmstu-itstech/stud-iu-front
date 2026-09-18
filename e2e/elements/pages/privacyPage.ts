import { expect, type Locator, type Page } from '@playwright/test'

export class PrivacyPage {
  readonly page: Page
  readonly root: Locator
  readonly title: Locator
  readonly back: Locator

  constructor(page: Page) {
    this.page = page
    this.root = page.getByTestId('privacy-page')
    this.title = page.getByTestId('privacy-title')
    this.back = page.getByTestId('privacy-back')
  }

  async open() {
    await this.page.goto('/privacy')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkTitleContains(text: string) {
    await expect(this.title).toContainText(text)
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkBackVisible() {
    await expect(this.back).toBeVisible()
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }
}
