import type { StatItem } from '@/types/domain'

export const defaultOrgStats: StatItem[] = [
  {
    id: 'stat-activists',
    value: '250 активистов',
    label: 'сплочённая команда, работающая на результат',
    cta: { label: 'Присоединиться к команде', to: '/join' },
  },
  {
    id: 'stat-events',
    value: '50 мероприятий',
    label: 'проводим в стенах Бауманки за год',
    cta: { label: 'Посмотреть все', to: '/events/past' },
  },
  {
    id: 'stat-ideas',
    value: '∞ идей',
    label: 'генерируем и воплощаем каждый день',
    cta: { label: 'Предложить свою', to: '/join' },
  },
  {
    id: 'stat-availability',
    value: '24/7',
    label: 'на связи со студентами и деканатом',
    cta: { label: 'Написать нам', href: 'mailto:inbox@stud-iu.ru' },
  },
]
