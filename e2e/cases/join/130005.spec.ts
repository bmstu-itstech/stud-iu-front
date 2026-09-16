import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('мультиселект закрывается по клику мимо', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету и раскрыть мультиселект', async () => {
      await joinPage.open()
      await joinPage.categories.open()
      await joinPage.categories.checkOptionVisible('programming')
    })

    await test.step('Кликнуть мимо селекта', async () => {
      await joinPage.clickTitle()
      await joinPage.categories.checkOptionHidden('programming')
    })
  })
})
