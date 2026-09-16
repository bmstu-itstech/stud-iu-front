import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('успешная отправка после заполнения всех полей', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету и заполнить текстовые поля', async () => {
      await joinPage.open()
      await joinPage.fillField('full_name', 'Иванов Иван Сергеевич')
      await joinPage.fillField('group', 'ИУ6-42Б')
      await joinPage.fillField('telegram_url', 'https://t.me/ivanov')
      await joinPage.fillField('vk_url', 'https://vk.com/ivanov')
    })

    await test.step('Выбрать дату рождения через календарь', async () => {
      await joinPage.birthDate.chooseDate('2004-06-01', '2004', '5')
    })

    await test.step('Выбрать виды деятельности и связанные поля', async () => {
      await joinPage.categories.open()
      await joinPage.categories.toggleOption('programming')
      await joinPage.clickTitle()
      await joinPage.fillField('github_url', 'https://github.com/ivanov')
      await joinPage.page.getByTestId('join-field-tech_tasks').click()
      await joinPage.page.getByTestId('join-field-tech_tasks-option-web').click()
      await joinPage.clickTitle()
    })

    await test.step('Отправить форму', async () => {
      await joinPage.clickConsent()
      await joinPage.submit()
    })

    await test.step('Проверить успешную отправку', async () => {
      await joinPage.checkSuccessVisible()
      await joinPage.checkSuccessContains('Заявка отправлена')
    })
  })
})
