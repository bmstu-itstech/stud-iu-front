import { expect, type Locator, type Page } from '@playwright/test'

export class Footer {
  readonly root: Locator
  readonly email: Locator
  readonly address: Locator
  readonly joinButton: Locator
  readonly partnerButton: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('footer')
    this.email = this.root.getByTestId('footer-email')
    this.address = this.root.getByTestId('footer-address')
    this.joinButton = this.root.getByTestId('footer-join')
    this.partnerButton = this.root.getByTestId('footer-partner')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkEmailHref(href: string) {
    await expect(this.email).toHaveAttribute('href', href)
  }

  async checkAddressContains(text: string) {
    await expect(this.address).toContainText(text)
  }

  async checkJoinButtonVisible() {
    await expect(this.joinButton).toBeVisible()
  }

  async checkPartnerButtonVisible() {
    await expect(this.partnerButton).toBeVisible()
  }
}
