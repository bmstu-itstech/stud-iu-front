import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('поля формы приходят из схемы бэкенда', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Проверить поля формы', async () => {
      await joinPage.checkFormVisible()
      await joinPage.checkFieldVisible('full_name')
      await joinPage.checkFieldVisible('group')
      await joinPage.checkFieldVisible('birth_date')
      await joinPage.checkFieldVisible('telegram_url')
      await joinPage.checkFieldVisible('vk_url')
      await joinPage.checkFieldVisible('categories')
      await joinPage.checkConsentVisible()
      await joinPage.checkSubmitButtonVisible()
    })
  })
})
