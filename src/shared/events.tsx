import { ReactNode } from 'react';

import { EventDTO } from './dto';
import Button from './ui/Button';
import { Title } from './ui/Typography';

type Slide = EventDTO & {
  before?: ReactNode;
  after?: ReactNode;
  status?: string;
  details?: string[];
};

export const events: Slide[] = [
  {
    id: '1',
    title: 'День программиста 2025',
    description:
      'Присоединяйтесь к нам, чтобы отпраздновать главный профессиональный праздник всех разработчиков! Вас ждут интересные доклады, мастер-классы и много нетворкинга.',
    coverUrl: '/images/cover.png',
    status: '20.11.2025',
    before: (
      <Button variant="white" size="primary">
        <Title level={5}>Зарегистрироваться</Title>
      </Button>
    ),
    after: null,
    date: new Date('20-11-2025'),
    fillColor: 'var(--blue-primary-color)',
    caption: 'Последний хакатон в 2025 году',
  },
  {
    id: '2',
    title: 'Хакатон "Future Web"',
    description:
      'Двухдневный марафон кодинга, где лучшие команды будут соревноваться в создании инновационных веб-приложений. Призовой фонд - 1 000 000 рублей.',
    coverUrl: '/images/cover.png',
    status: '20.12.2025',
    before: (
      <Button variant="white" size="primary">
        <Title level={5}>Зарегистрироваться</Title>
      </Button>
    ),
    after: null,
    date: new Date('20-12-2025'),
    fillColor: 'var(--blue-primary-color)',
    caption: 'Последний хакатон в 2025 году',
  },
  {
    id: '3',
    title: 'Frontend Conf 2025',
    description:
      'Главная конференция для фронтенд-разработчиков. Мы уже завершили основную программу, но вы можете посмотреть все доклады в записи.',
    coverUrl: '/images/cover.png',
    details: ['10 июня 2025', 'Санкт-Петербург, Экспофорум'],
    status: 'Завершено',
    before: (
      <Button variant="white" size="primary">
        <Title level={5}>Обратная связь</Title>
      </Button>
    ),
    after: (
      <div className="flex flex-col gap-4">
        <Button variant="white" size="primary">
          <Title level={5}>Фотоальбом</Title>
        </Button>
        <Button variant="white" size="primary">
          <Title level={5}>Видеоотчёт</Title>
        </Button>
      </div>
    ),
    date: new Date('20-11-2025'),
    fillColor: 'var(--blue-primary-color)',
    caption: 'Последний хакатон в 2025 году',
  },
];
