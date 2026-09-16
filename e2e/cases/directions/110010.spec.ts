import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Направления', () => {
  test('прямая ссылка /join?direction=… предзаполняет анкету', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету с параметром direction=content_creation', async () => {
      await joinPage.open('?direction=content_creation')
    })

    await test.step('Проверить предзаполнение и условные поля', async () => {
      await joinPage.checkSelectedCount(1)
      await joinPage.checkFieldVisible('portfolio_url')
      await joinPage.checkFieldVisible('visual_content_types')
      await joinPage.checkUrl(/\/join$/)
    })
  })
})
