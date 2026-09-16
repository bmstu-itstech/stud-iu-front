import { test } from '@playwright/test'

import { DirectionPage } from '../../elements/pages/directionPage'
import { JoinPage } from '../../elements/pages/joinPage'

test.describe('Направления', () => {
  test('CTA ведёт на анкету с предзаполненным направлением', async ({ page }) => {
    const directionPage = new DirectionPage(page)
    const joinPage = new JoinPage(page)

    await test.step('Открыть страницу IT-направления', async () => {
      await directionPage.open('it')
    })

    await test.step('Нажать «Вступить в направление»', async () => {
      await directionPage.join.clickJoin()
    })

    await test.step('Проверить предзаполнение анкеты', async () => {
      await joinPage.checkUrl(/\/join$/)
      await joinPage.checkSelectedCount(1)
      await joinPage.checkFieldVisible('github_url')
      await joinPage.checkFieldVisible('tech_tasks')
    })
  })
})
