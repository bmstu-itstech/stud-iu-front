import { expect, type Locator, type Page } from '@playwright/test'

export class MobileMenu {
  readonly root: Locator
  readonly links: Locator
  readonly joinLink: Locator
  private readonly closeButton: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('navbar-menu')
    this.links = this.root.getByTestId('navbar-menu-link')
    this.joinLink = this.root.getByTestId('navbar-menu-link-join')
    this.closeButton = this.root.getByTestId('navbar-menu-close')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkHidden() {
    await expect(this.root).toBeHidden()
  }

  async checkLinksCount(count: number) {
    await expect(this.links).toHaveCount(count)
  }

  async checkJoinLinkVisible() {
    await expect(this.joinLink).toBeVisible()
  }

  async clickLink(title: string) {
    await this.links.filter({ hasText: title }).click()
  }

  async clickJoinLink() {
    await this.joinLink.click()
  }

  async close() {
    await this.closeButton.click()
  }
}

export class Navbar {
  readonly root: Locator
  readonly logo: Locator
  readonly links: Locator
  readonly cta: Locator
  readonly burger: Locator
  readonly mobileMenu: MobileMenu

  constructor(page: Page) {
    this.root = page.getByTestId('navbar')
    this.logo = this.root.getByTestId('navbar-logo')
    this.links = this.root.getByTestId('navbar-link')
    this.cta = page.getByTestId('navbar-cta')
    this.burger = this.root.getByTestId('navbar-burger')
    this.mobileMenu = new MobileMenu(page)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkLogoVisible() {
    await expect(this.logo).toBeVisible()
  }

  async checkLinksCount(count: number) {
    await expect(this.links).toHaveCount(count)
  }

  async checkLinksHidden() {
    await expect(this.links.first()).toBeHidden()
  }

  async checkCtaVisible() {
    await expect(this.cta).toBeVisible()
  }

  async checkBurgerVisible() {
    await expect(this.burger).toBeVisible()
  }

  async clickCta() {
    await this.cta.click()
  }

  async openMobileMenu() {
    await this.burger.click()
  }
}
