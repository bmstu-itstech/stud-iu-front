import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('ник в Telegram и ссылка на VK проверяются по формату', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету и заполнить некорректные значения', async () => {
      await joinPage.open()
      await joinPage.fillField('telegram', 'ivanov')
      await joinPage.fillField('vk_url', 'vk.com/ivanov')
      await joinPage.submit()
    })

    await test.step('Проверить ошибки формата', async () => {
      await joinPage.checkErrorVisible('Некорректное значение — пример: @username')
      await joinPage.checkErrorVisible('Некорректная ссылка — пример: https://vk.ru/durov')
    })

    await test.step('Заполнить корректные значения', async () => {
      await joinPage.fillField('telegram', '@ivanov')
      await joinPage.fillField('vk_url', 'https://vk.ru/ivanov')
      await joinPage.submit()
      await joinPage.checkErrorHidden('Некорректное значение — пример: @username')
      await joinPage.checkErrorHidden('Некорректная ссылка — пример: https://vk.ru/durov')
    })
  })
})
