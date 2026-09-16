import { expect, type Locator, type Page } from '@playwright/test'

export class MultiSelect {
  readonly trigger: Locator

  constructor(
    private readonly page: Page,
    private readonly key: string,
  ) {
    this.trigger = page.getByTestId(`join-field-${key}`)
  }

  option(value: string): Locator {
    return this.page.getByTestId(`join-field-${this.key}-option-${value}`)
  }

  async open() {
    await this.trigger.click()
  }

  async toggleOption(value: string) {
    await this.option(value).click()
  }

  async checkOptionVisible(value: string) {
    await expect(this.option(value)).toBeVisible()
  }

  async checkOptionHidden(value: string) {
    await expect(this.option(value)).toHaveCount(0)
  }

  async checkSelectedCount(count: number) {
    await expect(this.trigger).toContainText(`Выбрано: ${count}`)
  }
}
