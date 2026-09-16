import { expect, type Locator, type Page } from '@playwright/test'

import { JoinCard } from '../widgets/joinCard'

export class DirectionPage {
  readonly page: Page
  readonly root: Locator
  readonly title: Locator
  readonly backLink: Locator
  readonly join: JoinCard

  constructor(page: Page) {
    this.page = page
    this.root = page.getByTestId('direction-page')
    this.title = page.getByTestId('direction-title')
    this.backLink = page.getByTestId('direction-back')
    this.join = new JoinCard(page.getByTestId('direction-join-card'))
  }

  async open(slug: string) {
    await this.page.goto(`/directions/${slug}`)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkTitle(title: string) {
    await expect(this.title).toContainText(title)
  }

  async checkContentContains(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }

  async clickBack() {
    await this.backLink.click()
  }

  async checkNotFoundVisible() {
    await expect(this.page.getByText('Направление не найдено')).toBeVisible()
  }

  async clickBackHome() {
    await this.page.getByTestId('back-home-link').click()
  }
}
