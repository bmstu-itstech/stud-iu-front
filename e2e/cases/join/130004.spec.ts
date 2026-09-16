import { test } from '@playwright/test'

import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Анкета активиста', () => {
  test('мультиселект: выбор и снятие опций обновляют счётчик', async ({ page }) => {
    const joinPage = new JoinPage(page)

    await test.step('Открыть анкету', async () => {
      await joinPage.open()
    })

    await test.step('Выбрать две опции', async () => {
      await joinPage.categories.open()
      await joinPage.categories.toggleOption('programming')
      await joinPage.categories.toggleOption('event_planning')
      await joinPage.categories.checkSelectedCount(2)
    })

    await test.step('Снять одну опцию', async () => {
      await joinPage.categories.toggleOption('programming')
      await joinPage.categories.checkSelectedCount(1)
    })
  })
})
