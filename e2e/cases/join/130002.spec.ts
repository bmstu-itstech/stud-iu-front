import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('условные поля скрыты, пока не выбрано направление', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Проверить, что условные поля скрыты', async () => {
      await joinPage.checkFieldHidden('github_url')
      await joinPage.checkFieldHidden('tech_tasks')
      await joinPage.checkFieldHidden('portfolio_url')
      await joinPage.checkFieldHidden('visual_content_types')
    })

    await test.step('Выбрать «программирование»', async () => {
      await joinPage.categories.open()
      await joinPage.categories.toggleOption('programming')
    })

    await test.step('Появились поля программирования', async () => {
      await joinPage.checkFieldVisible('github_url')
      await joinPage.checkFieldVisible('tech_tasks')
    })

    await test.step('Выбрать «создание контента»', async () => {
      await joinPage.categories.toggleOption('content_creation')
    })

    await test.step('Появились поля контента', async () => {
      await joinPage.checkFieldVisible('portfolio_url')
      await joinPage.checkFieldVisible('visual_content_types')
    })
  })
})
