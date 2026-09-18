import { test } from '@playwright/test'

import { PrivacyPage } from '../../elements/pages/privacyPage'

test.describe('Политика конфиденциальности', () => {
  test('содержит данные оператора и порядок обработки данных', async ({ page }) => {
    const privacyPage = new PrivacyPage(page)

    await test.step('Открыть политику по прямой ссылке', async () => {
      await privacyPage.open()
      await privacyPage.checkVisible()
      await privacyPage.checkBackVisible()
    })

    await test.step('Проверить данные оператора', async () => {
      await privacyPage.checkContains('Евдокимова Анастасия Андреевна')
      await privacyPage.checkContains('ИНН 7701002521')
    })

    await test.step('Проверить содержание политики', async () => {
      await privacyPage.checkContains('152-ФЗ')
      await privacyPage.checkContains('Права субъекта персональных данных')
      await privacyPage.checkContains('inbox@stud-iu.ru')
    })
  })
})
