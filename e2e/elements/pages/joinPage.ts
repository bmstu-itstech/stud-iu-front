import { expect, type Locator, type Page } from '@playwright/test'

import { DateField } from '../widgets/dateField'
import { MultiSelect } from '../widgets/multiselect'

export class JoinPage {
  readonly page: Page
  readonly root: Locator
  readonly form: Locator
  readonly title: Locator
  readonly consent: Locator
  readonly categories: MultiSelect
  readonly birthDate: DateField
  private readonly submitButton: Locator
  private readonly success: Locator

  constructor(page: Page) {
    this.page = page
    this.root = page.getByTestId('join-page')
    this.form = page.getByTestId('join-form')
    this.title = page.getByTestId('join-title')
    this.consent = page.getByTestId('consent-checkbox')
    this.categories = new MultiSelect(page, 'categories')
    this.birthDate = new DateField(page, 'birth_date')
    this.submitButton = page.getByTestId('submit-button')
    this.success = page.getByTestId('form-success')
  }

  async open(query = '') {
    await this.page.goto(`/join${query}`)
  }

  field(key: string): Locator {
    return this.page.getByTestId(`join-field-${key}`)
  }

  async checkFormVisible() {
    await expect(this.form).toBeVisible()
  }

  async checkFieldVisible(key: string) {
    await expect(this.field(key)).toBeVisible()
  }

  async checkFieldHidden(key: string) {
    await expect(this.field(key)).toHaveCount(0)
  }

  async fillField(key: string, value: string) {
    await this.field(key).fill(value)
  }

  async checkFieldPlaceholder(key: string, placeholder: string) {
    await expect(this.field(key)).toHaveAttribute('placeholder', placeholder)
  }

  async checkConsentVisible() {
    await expect(this.consent).toBeVisible()
  }

  async clickConsent() {
    await this.consent.click()
  }

  async checkSubmitButtonVisible() {
    await expect(this.submitButton).toBeVisible()
  }

  async submit() {
    await this.submitButton.click()
  }

  async clickTitle() {
    await this.title.click()
  }

  async checkSuccessVisible() {
    await expect(this.success).toBeVisible()
  }

  async checkSuccessContains(text: string) {
    await expect(this.success).toContainText(text)
  }

  async checkErrorVisible(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible()
  }

  async checkErrorHidden(text: string) {
    await expect(this.page.getByText(text)).toHaveCount(0)
  }

  async checkSelectedCount(count: number) {
    await this.categories.checkSelectedCount(count)
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }
}
