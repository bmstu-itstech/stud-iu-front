import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('ввод даты с клавиатуры: точки ставятся автоматически', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Ввести полную дату без точек', async () => {
      await joinPage.birthDate.type('01062004')
      await joinPage.birthDate.checkValue('01.06.2004')
    })

    await test.step('Ввести неполную дату', async () => {
      await joinPage.birthDate.type('0106')
      await joinPage.birthDate.checkValue('01.06')
    })

    await test.step('Отправить форму и проверить ошибку', async () => {
      await joinPage.submit()
      await joinPage.checkErrorVisible('Заполните поле «Дата рождения»')
    })
  })
})
