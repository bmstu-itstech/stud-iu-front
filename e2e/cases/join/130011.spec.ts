import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('телефон маскируется при вводе и проходит валидацию при отправке', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Ввести цифры номера', async () => {
      await joinPage.fillField('phone', '89255532401')
    })

    await test.step('Проверить маску отображения', async () => {
      await joinPage.checkFieldValue('phone', '+7(925)553-24-01')
    })

    await test.step('Заполнить остальные поля', async () => {
      await joinPage.fillField('full_name', 'Иванов Иван Сергеевич')
      await joinPage.fillField('group', 'ИУ6-42Б')
      await joinPage.birthDate.chooseDate('2004-06-01', '2004', '5')
      await joinPage.fillField('telegram', '@ivanov')
      await joinPage.fillField('vk_url', 'https://vk.ru/ivanov')
      await joinPage.categories.open()
      await joinPage.categories.toggleOption('programming')
      await joinPage.clickTitle()
      await joinPage.fillField('github_url', 'https://github.com/ivanov')
      await joinPage.page.getByTestId('join-field-tech_tasks').click()
      await joinPage.page.getByTestId('join-field-tech_tasks-option-web').click()
      await joinPage.clickTitle()
      await joinPage.clickConsent()
    })

    await test.step('Отправить заявку с отформатированным номером', async () => {
      await joinPage.submit()
      await joinPage.checkSuccessVisible()
    })
  })
})
