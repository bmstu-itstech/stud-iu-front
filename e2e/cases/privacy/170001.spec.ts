import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'
import { PrivacyPage } from '../../elements/pages/privacyPage'

test.describe('Политика конфиденциальности', () => {
  test('открывается по ссылке из чекбокса анкеты', async ({ page }) => {
    const joinPage = new JoinPage(page)
    const privacyPage = new PrivacyPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
      await joinPage.checkFormVisible()
    })

    await test.step('Кликнуть по ссылке политики в чекбоксе', async () => {
      await page.getByTestId('privacy-policy-link').click()
    })

    await test.step('Проверить страницу политики', async () => {
      await privacyPage.checkUrl(/\/privacy$/)
      await privacyPage.checkVisible()
      await privacyPage.checkTitleContains('Политика конфиденциальности')
    })
  })
})
