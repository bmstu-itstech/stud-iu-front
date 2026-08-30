import { images } from '@/mocks/images'
import { defaultOrgStats } from '@/config/organization'
import type { OrgInfo } from '@/types/domain'

export const orgInfo: OrgInfo = {
  stats: defaultOrgStats,
  partners: [
    'Яндекс',
    'VK',
    'Т-Банк',
    'Сбер',
    'Авито',
    'Ozon',
    'JetBrains',
    '1С',
    'Postgres Pro',
    'Kaspersky',
    'Yandex Cloud',
    'МТС',
    'Ростелеком',
    'Skillbox',
  ].map((name, index) => ({
    id: `partner-${index + 1}`,
    name,
    logo: images.partnerLogo,
  })),
  contacts: [
    {
      id: 'contact-1',
      name: 'Анастасия Евдокимова',
      role: 'Председатель',
      avatar: images.avatar,
      telegram: 'https://t.me/studsovet_iu',
    },
    {
      id: 'contact-2',
      name: 'Мария Ковалёва',
      role: 'Заместитель председателя',
      avatar: images.avatar,
      telegram: 'https://t.me/studsovet_iu',
    },
    {
      id: 'contact-3',
      name: 'Дмитрий Соколов',
      role: 'Куратор технических направлений',
      avatar: images.avatar,
      telegram: 'https://t.me/studsovet_iu',
    },
  ],
}
