import { expect, test } from 'bun:test'

import { EventsStore, type EventsApi } from './events.store'
import type { EventItem, PastEvent } from '@/types/domain'

const upcoming: EventItem[] = [
  {
    id: 'e1',
    title: 'День программиста 2026',
    shortDescription: 'Фестиваль кода',
    description: '...',
    date: '2026-06-14T12:00',
    place: 'Бауманка',
    image: 'slide-1.png',
    status: 'active',
  },
]

const past: PastEvent[] = [
  { id: 'p1', title: 'ITS FEST 2026', date: '2026-03-26', place: 'Бауманка', image: 'x.png' },
  { id: 'p2', title: 'Квест «Бауманка»', date: '2026-02-15', place: 'Бауманка', image: 'x.png' },
  { id: 'p3', title: 'Новый год СтудИУ', date: '2025-12-20', place: 'Бауманка', image: 'x.png' },
]

const fakeApi: EventsApi = {
  async getUpcomingEvents() {
    return upcoming
  },
  async getPastEvents() {
    return past
  },
  async getEvent(id) {
    return upcoming.find((event) => event.id === id)
  },
}

test('loadUpcoming загружает и кеширует данные', async () => {
  const store = new EventsStore(fakeApi)
  expect(store.upcoming).toHaveLength(0)

  await store.loadUpcoming()
  expect(store.upcoming).toHaveLength(1)
  expect(store.loading).toBe(false)

  await store.loadUpcoming()
  expect(store.upcoming).toHaveLength(1)
})

test('filteredPast без запроса возвращает все мероприятия', async () => {
  const store = new EventsStore(fakeApi)
  await store.loadPast()
  expect(store.filteredPast).toHaveLength(3)
})

test('filteredPast фильтрует по подстроке без учёта регистра', async () => {
  const store = new EventsStore(fakeApi)
  await store.loadPast()

  store.setSearchQuery('  its  ')
  expect(store.filteredPast.map((event) => event.id)).toEqual(['p1'])

  store.setSearchQuery('бауманка')
  expect(store.filteredPast.map((event) => event.id)).toEqual(['p2'])
})

test('filteredPast возвращает пустой список, если ничего не нашлось', async () => {
  const store = new EventsStore(fakeApi)
  await store.loadPast()

  store.setSearchQuery('абракадабра')
  expect(store.filteredPast).toHaveLength(0)
})

test('loadEvent находит мероприятие по id', async () => {
  const store = new EventsStore(fakeApi)
  const event = await store.loadEvent('e1')
  expect(event?.title).toBe('День программиста 2026')
  expect(await store.loadEvent('missing')).toBeUndefined()
})
