import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('пустая отправка показывает ошибки валидации', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Отправить пустую форму', async () => {
      await joinPage.submit()
    })

    await test.step('Проверить ошибки обязательных полей', async () => {
      await joinPage.checkErrorVisible('Заполните поле «ФИО»')
      await joinPage.checkErrorVisible('Заполните поле «Учебная группа»')
      await joinPage.checkErrorVisible('Заполните поле «Дата рождения»')
      await joinPage.checkErrorVisible('Заполните поле «Ссылка на Telegram»')
      await joinPage.checkErrorVisible('Заполните поле «Ссылка на профиль в VK»')
      await joinPage.checkErrorVisible('Выберите хотя бы один вариант')
      await joinPage.checkErrorVisible('Подтвердите согласие')
    })
  })
})
