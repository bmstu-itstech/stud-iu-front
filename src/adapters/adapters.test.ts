import { expect, test } from 'bun:test'

import {
  futureEventToDomain,
  pastEventToDomain,
} from './eventsAdapter'
import { newsToDomain } from './newsAdapter'
import { boardMemberToDomain, partnerToDomain } from './orgAdapter'
import { formFieldsToDomain } from './applicationsAdapter'
import type {
  BoardMemberContract,
  FutureEventContract,
  NewsContract,
  PastEventContract,
  PartnerContract,
} from './contracts'

const futureEvent: FutureEventContract = {
  id: '0b8f6d1e-0000-4000-8000-000000000001',
  title: 'День программиста',
  description: 'Фестиваль кода и технологий',
  extended_description: 'Подробная программа фестиваля: лекции, воркшопы и нетворкинг.',
  place: 'Бауманка',
  precision: 'time',
  start_datetime: '14.06.2026 12:00',
  end_datetime: '14.06.2026 18:00',
  date_range_display: '14 июня 2026 12:00-18:00',
  registration_link: 'https://reg.example.com/event',
  images: [
    { id: 'img-1', image: '/media/images/events/a.png' },
    { id: 'img-2', image: 'https://cdn.example.com/b.png' },
    { id: 'img-3', image: null },
  ],
}

test('futureEventToDomain мапит контракт в домен', () => {
  const event = futureEventToDomain(futureEvent)

  expect(event.id).toBe(futureEvent.id)
  expect(event.title).toBe('День программиста')
  expect(event.shortDescription).toBe('Фестиваль кода и технологий')
  expect(event.extendedDescription).toBe(
    'Подробная программа фестиваля: лекции, воркшопы и нетворкинг.',
  )
  expect(event.dateDisplay).toBe('14 июня 2026 12:00-18:00')
  expect(event.startAt).toBe('14.06.2026 12:00')
  expect(event.endAt).toBe('14.06.2026 18:00')
  expect(event.status).toBe('upcoming')
  expect(event.registrationLink).toBe('https://reg.example.com/event')
  expect(event.image).toBe('http://localhost/media/images/events/a.png')
  expect(event.gallery).toEqual([
    'http://localhost/media/images/events/a.png',
    'https://cdn.example.com/b.png',
  ])
})

test('futureEventToDomain без изображений и ссылки', () => {
  const event = futureEventToDomain({
    ...futureEvent,
    registration_link: null,
    end_datetime: null,
    extended_description: '',
    images: [],
  })

  expect(event.image).toBe('')
  expect(event.gallery).toBeUndefined()
  expect(event.registrationLink).toBeUndefined()
  expect(event.endAt).toBeUndefined()
  expect(event.extendedDescription).toBeUndefined()
})

const pastEvent: PastEventContract = {
  id: '0b8f6d1e-0000-4000-8000-000000000002',
  title: 'ITS FEST 2026',
  description: 'Главный фестиваль факультета',
  extended_description: '',
  place: 'Бауманка',
  precision: 'day',
  start_datetime: '26.03.2026',
  end_datetime: '28.03.2026',
  date_range_display: '26 марта 2026',
  album_link: 'https://vk.com/album',
  images: [{ id: 'img-4', image: '/media/images/events/c.png' }],
}

test('pastEventToDomain мапит контракт в домен', () => {
  const event = pastEventToDomain(pastEvent)

  expect(event.title).toBe('ITS FEST 2026')
  expect(event.dateDisplay).toBe('26 марта 2026')
  expect(event.startAt).toBe('26.03.2026')
  expect(event.endAt).toBe('28.03.2026')
  expect(event.albumLink).toBe('https://vk.com/album')
  expect(event.image).toBe('http://localhost/media/images/events/c.png')
})

test('newsToDomain: description идёт в анонс и полный текст', () => {
  const raw: NewsContract = {
    id: 'n1',
    title: 'Выборы председателя',
    description: 'Отчётно-выборная конференция завершилась.',
    cover: '/media/images/news/cover.png',
    created_at: '2026-04-12T10:00:00Z',
  }

  const item = newsToDomain(raw)

  expect(item.date).toBe('2026-04-12T10:00:00Z')
  expect(item.excerpt).toBe('Отчётно-выборная конференция завершилась.')
  expect(item.content).toEqual(['Отчётно-выборная конференция завершилась.'])
  expect(item.image).toBe('http://localhost/media/images/news/cover.png')
  expect(item.source).toBeUndefined()
})

test('newsToDomain разбивает текст на абзацы по переносам строк', () => {
  const item = newsToDomain({
    id: 'n3',
    title: 'Новость с абзацами',
    description: 'Первый абзац.\n\nВторой абзац.\n\n\nТретий абзац.',
    cover: null,
    created_at: '2026-04-12T10:00:00Z',
  })

  expect(item.content).toEqual(['Первый абзац.', 'Второй абзац.', 'Третий абзац.'])
  expect(item.excerpt).toBe('Первый абзац.')
})

test('newsToDomain обрезает длинный анонс', () => {
  const item = newsToDomain({
    id: 'n2',
    title: 'Длинная новость',
    description: 'Слово '.repeat(80).trim(),
    cover: null,
    created_at: '2026-04-12T10:00:00Z',
  })

  expect(item.excerpt.length).toBeLessThanOrEqual(181)
  expect(item.excerpt.endsWith('…')).toBe(true)
  expect(item.image).toBe('')
  expect(item.content).toHaveLength(1)
})

test('partnerToDomain: без логотипа приходит пустая строка (заглушку рисует UI)', () => {
  const partner = partnerToDomain({
    id: 'p1',
    name: 'Яндекс',
    url: null,
    image: null,
  } satisfies PartnerContract)

  expect(partner.name).toBe('Яндекс')
  expect(partner.logo).toBe('')
})

test('boardMemberToDomain: position → роль, link → telegram', () => {
  const contact = boardMemberToDomain({
    id: 'b1',
    name: 'Анастасия Евдокимова',
    link: 'https://t.me/studsovet_iu',
    position: 'Председатель',
    image: '/media/images/board/a.png',
  } satisfies BoardMemberContract)

  expect(contact.role).toBe('Председатель')
  expect(contact.telegram).toBe('https://t.me/studsovet_iu')
  expect(contact.avatar).toBe('http://localhost/media/images/board/a.png')
})

test('boardMemberToDomain: без фото и ссылки заглушки остаются пустыми', () => {
  const contact = boardMemberToDomain({
    id: 'b2',
    name: 'Мария Ковалёва',
    link: '',
    position: 'Заместитель председателя',
    image: null,
  } satisfies BoardMemberContract)

  expect(contact.avatar).toBe('')
  expect(contact.telegram).toBeUndefined()
})

test('formFieldsToDomain мапит контракт анкеты', () => {
  const fields = formFieldsToDomain([
    {
      key: 'full_name',
      label: 'ФИО',
      type: 'text',
      required: true,
      placeholder: 'Иванов Иван Сергеевич',
      pattern: null,
      options: null,
      depends_on: null,
    },
    {
      key: 'github_url',
      label: 'Профиль на GitHub',
      type: 'url',
      required: false,
      placeholder: 'https://github.com/username',
      pattern: '^https://github\\.com/[A-Za-z0-9-]{1,39}/?$',
      options: null,
      depends_on: { field: 'categories', contains: 'programming' },
    },
    {
      key: 'categories',
      label: 'Направления',
      type: 'multiple_choice',
      required: true,
      placeholder: null,
      pattern: null,
      options: [{ value: 'programming', label: 'Программирование' }],
      depends_on: null,
    },
  ])

  expect(fields).toHaveLength(3)
  expect(fields[0]).toEqual({
    key: 'full_name',
    label: 'ФИО',
    type: 'text',
    required: true,
    placeholder: 'Иванов Иван Сергеевич',
    pattern: null,
    options: null,
    dependsOn: null,
  })
  expect(fields[1]?.placeholder).toBe('https://github.com/username')
  expect(fields[1]?.pattern).toBe('^https://github\\.com/[A-Za-z0-9-]{1,39}/?$')
  expect(fields[1]?.dependsOn).toEqual({ field: 'categories', contains: 'programming' })
  expect(fields[2]?.options).toEqual([
    { value: 'programming', label: 'Программирование' },
  ])
})
