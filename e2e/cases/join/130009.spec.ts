import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('у успешной отправки поля заполнены плейсхолдерами схемы', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Проверить плейсхолдеры из схемы', async () => {
      await joinPage.checkFieldPlaceholder('full_name', 'Иванов Иван Сергеевич')
      await joinPage.checkFieldPlaceholder('telegram_url', 'https://t.me/durov')
    })
  })
})
