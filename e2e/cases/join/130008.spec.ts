import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('ссылки на Telegram и VK проверяются по формату', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету и заполнить ссылки без протокола', async () => {
      await joinPage.open()
      await joinPage.fillField('telegram_url', '@ivanov')
      await joinPage.fillField('vk_url', 'vk.com/ivanov')
      await joinPage.submit()
    })

    await test.step('Проверить ошибки формата', async () => {
      await joinPage.checkErrorVisible('Некорректная ссылка — пример: https://t.me/durov')
      await joinPage.checkErrorVisible('Некорректная ссылка — пример: https://vk.ru/durov')
    })

    await test.step('Заполнить корректные ссылки', async () => {
      await joinPage.fillField('telegram_url', 'https://t.me/ivanov')
      await joinPage.fillField('vk_url', 'https://vk.ru/ivanov')
      await joinPage.submit()
      await joinPage.checkErrorHidden('Некорректная ссылка — пример: https://t.me/durov')
    })
  })
})
