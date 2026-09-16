import { expect, type Locator, type Page } from '@playwright/test'

export class DateField {
  readonly input: Locator
  private readonly toggle: Locator
  private readonly calendar: Locator
  private readonly year: Locator
  private readonly month: Locator

  constructor(
    private readonly page: Page,
    private readonly key: string,
  ) {
    this.input = page.getByTestId(`join-field-${key}`)
    this.toggle = page.getByTestId(`join-field-${key}-toggle`)
    this.calendar = page.getByTestId(`join-field-${key}-calendar`)
    this.year = page.getByTestId(`join-field-${key}-year`)
    this.month = page.getByTestId(`join-field-${key}-month`)
  }

  day(iso: string): Locator {
    return this.page.getByTestId(`join-field-${this.key}-day-${iso}`)
  }

  async type(text: string) {
    await this.input.fill(text)
  }

  async checkValue(value: string) {
    await expect(this.input).toHaveValue(value)
  }

  async openCalendar() {
    await this.toggle.click()
  }

  async checkCalendarVisible() {
    await expect(this.calendar).toBeVisible()
  }

  async checkCalendarHidden() {
    await expect(this.calendar).toBeHidden()
  }

  async selectYear(year: string) {
    await this.year.selectOption(year)
  }

  async selectMonth(month: string) {
    await this.month.selectOption(month)
  }

  async clickDay(iso: string) {
    await this.day(iso).click()
  }

  async chooseDate(iso: string, year: string, month: string) {
    await this.openCalendar()
    await this.checkCalendarVisible()
    await this.selectYear(year)
    await this.selectMonth(month)
    await this.clickDay(iso)
    await this.checkCalendarHidden()
  }
}
