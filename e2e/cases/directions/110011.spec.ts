import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Направления', () => {
  test('некорректный direction не ломает анкету', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету с неизвестным значением direction', async () => {
      await joinPage.open('?direction=unknown_value')
    })

    await test.step('Проверить, что форма работает без предзаполнения', async () => {
      await joinPage.checkFormVisible()
      await joinPage.checkFieldHidden('github_url')
      await joinPage.checkUrl(/\/join$/)
    })
  })
})
