import { expect, type Locator, type Page } from '@playwright/test'

export class DirectionsSection {
  readonly root: Locator
  readonly tags: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('directions-section')
    this.tags = this.root.getByTestId('direction-card')
  }

  getTag(title: string): Locator {
    return this.tags.filter({ hasText: title })
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkTagsCount(count: number) {
    await expect(this.tags).toHaveCount(count)
  }

  async checkTagVisible(title: string) {
    await expect(this.getTag(title)).toBeVisible()
  }

  async clickTag(title: string) {
    await this.getTag(title).click()
  }
}
