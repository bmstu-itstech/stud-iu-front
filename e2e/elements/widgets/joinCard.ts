import { expect, type Locator } from '@playwright/test'

export class JoinCard {
  readonly root: Locator
  readonly joinButton: Locator

  constructor(root: Locator) {
    this.root = root
    this.joinButton = root.getByTestId('direction-join-button')
  }

  async checkVisible() {
    await expect(this.root).toBeVisible()
  }

  async checkLeader(name: string) {
    await expect(this.root).toContainText('Руководитель')
    await expect(this.root).toContainText(name)
  }

  async checkNoLeader() {
    await expect(this.root).not.toContainText('Руководитель')
  }

  async checkNote(text: string) {
    await expect(this.root).toContainText(text)
  }

  async checkJoinHref(href: string) {
    await expect(this.joinButton).toHaveAttribute('href', href)
  }

  async clickJoin() {
    await this.joinButton.click()
  }
}
