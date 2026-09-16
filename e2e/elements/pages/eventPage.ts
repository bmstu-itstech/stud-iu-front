import { expect, type Locator, type Page } from '@playwright/test'

export class RegistrationCard {
  readonly root: Locator
  readonly registerButton: Locator
  private readonly seatsProgress: Locator
  private readonly registerSuccess: Locator

  constructor(page: Page) {
    this.root = page.getByTestId('registration-card')
    this.seatsProgress = this.root.getByTestId('seats-progress')
    this.registerButton = page.getByTestId('register-button')
    this.registerSuccess = page.getByTestId('register-success')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkContains(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkSeatsProgressVisible() {
    await expect(this.seatsProgress).toBeVisible()
  }

  async checkRegisterButtonText(text: string) {
    await expect(this.registerButton).toContainText(text)
  }

  async checkRegisterDisabled() {
    await expect(this.registerButton).toBeDisabled()
  }

  async clickRegister() {
    await this.registerButton.click()
  }

  async checkRegisterSuccessVisible() {
    await expect(this.registerSuccess).toBeVisible()
  }
}

export class FaqList {
  readonly questions: Locator
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.questions = page.getByTestId('faq-question')
  }

  answer(index: number): Locator {
    return this.page.getByTestId('faq-answer').nth(index)
  }

  async checkQuestionsCount(count: number) {
    await expect(this.questions).toHaveCount(count)
  }

  async checkAnswersCount(count: number) {
    await expect(this.page.getByTestId('faq-answer')).toHaveCount(count)
  }

  async toggleQuestion(index: number) {
    await this.questions.nth(index).click()
  }

  async checkAnswerVisible(index: number) {
    await expect(this.answer(index)).toBeVisible()
  }

  async checkAnswerContains(index: number, text: string) {
    await expect(this.answer(index)).toContainText(text)
  }
}

export class EventGallery {
  readonly section: Locator
  readonly images: Locator
  readonly lightbox: Locator
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.section = page.getByTestId('event-gallery')
    this.images = page.getByTestId('gallery-image')
    this.lightbox = page.getByTestId('gallery-lightbox')
  }

  private lightboxElement(kind: string): Locator {
    return this.page.getByTestId(`gallery-lightbox-${kind}`)
  }

  get counter(): Locator {
    return this.lightboxElement('counter')
  }

  thumb(index: number): Locator {
    return this.lightboxElement(`thumb-${index}`)
  }

  async checkSectionVisible() {
    await expect(this.section).toBeVisible()
  }

  async checkImagesCount(count: number) {
    await expect(this.images).toHaveCount(count)
  }

  async openLightbox(index: number) {
    await this.images.nth(index).click()
  }

  async checkLightboxVisible() {
    await expect(this.lightbox).toBeVisible()
  }

  async checkLightboxHidden() {
    await expect(this.lightbox).toHaveCount(0)
  }

  async checkCounter(text: string) {
    await expect(this.counter).toHaveText(text)
  }

  async checkLightboxImageVisible() {
    await expect(this.lightboxElement('image')).toBeVisible()
  }

  async clickNext() {
    await this.lightboxElement('next').click()
  }

  async clickPrev() {
    await this.lightboxElement('prev').click()
  }

  async clickClose() {
    await this.lightboxElement('close').click()
  }

  async clickThumb(index: number) {
    await this.thumb(index).click()
  }

  async pressEscape() {
    await this.page.keyboard.press('Escape')
  }

  async pressArrowLeft() {
    await this.page.keyboard.press('ArrowLeft')
  }

  async clickStageCorner() {
    await this.lightboxElement('stage').click({ position: { x: 2, y: 2 } })
  }
}

export class EventPage {
  readonly page: Page
  readonly root: Locator
  readonly title: Locator
  readonly aboutHeading: Locator
  readonly registration: RegistrationCard
  readonly faq: FaqList
  readonly gallery: EventGallery
  private readonly speakerCards: Locator
  private readonly backHomeLink: Locator

  constructor(page: Page) {
    this.page = page
    this.root = page.getByTestId('event-page')
    this.title = page.getByTestId('event-title')
    this.aboutHeading = page.getByRole('heading', { name: 'О мероприятии' })
    this.registration = new RegistrationCard(page)
    this.faq = new FaqList(page)
    this.gallery = new EventGallery(page)
    this.speakerCards = page.getByTestId('speaker-card')
    this.backHomeLink = page.getByTestId('back-home-link')
  }

  async open(id: string) {
    await this.page.goto(`/events/${id}`)
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkTitle(text: string) {
    await expect(this.title).toContainText(text)
  }

  async checkUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }

  async checkSpeakersCount(count: number) {
    await expect(this.speakerCards).toHaveCount(count)
  }

  async checkSpeakerContains(index: number, text: string) {
    await expect(this.speakerCards.nth(index)).toContainText(text)
  }

  async checkNotFoundVisible() {
    await expect(this.page.getByText('Мероприятие не найдено')).toBeVisible()
  }

  async checkBackHomeLinkVisible() {
    await expect(this.backHomeLink).toBeVisible()
  }
}
