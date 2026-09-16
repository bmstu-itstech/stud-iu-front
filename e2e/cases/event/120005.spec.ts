import { test } from '@playwright/test'

import { EventPage } from '../../elements/pages/eventPage'

test.describe('Страница мероприятия', () => {
  test('FAQ раскрывается по клику на вопрос', async ({ page }) => {
    const eventPage = new EventPage(page)

    await test.step('Открыть страницу мероприятия', async () => {
      await eventPage.open('den-programmista-2026')
    })

    await test.step('Раскрыть первый вопрос', async () => {
      await eventPage.faq.checkQuestionsCount(4)
      await eventPage.faq.toggleQuestion(0)
    })

    await test.step('Проверить ответ', async () => {
      await eventPage.faq.checkAnswerVisible(0)
      await eventPage.faq.checkAnswerContains(0, 'Никак')
    })

    await test.step('Свернуть вопрос', async () => {
      await eventPage.faq.toggleQuestion(0)
      await eventPage.faq.checkAnswersCount(0)
    })
  })
})
