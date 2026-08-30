import { images } from '@/mocks/images'
import type { EventItem, PastEvent, RegistrationInfo, Speaker } from '@/types/domain'

const speakers: Speaker[] = [
  { id: 'speaker-1', name: 'Анастасия Евдокимова', role: 'Председатель', avatar: images.avatar },
  { id: 'speaker-2', name: 'Мария Ковалёва', role: 'Заместитель председателя', avatar: images.avatar },
  { id: 'speaker-3', name: 'Дмитрий Соколов', role: 'Куратор технических направлений', avatar: images.avatar },
]

export const upcomingEvents: EventItem[] = [
  {
    id: 'den-programmista-2026',
    title: 'День программиста 2026',
    shortDescription: 'Фестиваль кода и технологий от Студенческого совета факультета ИУ',
    description:
      'День программиста — главный фестиваль кода и технологий факультета ИУ. Лекции от практиков индустрии, воркшопы, стендап-батл и нетворкинг с компаниями-партнёрами. Участников ждёт зона настолок, мерч и конкурс «код на салфетке».',
    date: '2026-06-14T12:00',
    place: 'Бауманка',
    image: images.slides[0],
    status: 'active',
    registration: {
      startsAt: '2026-06-14T12:00',
      opensAt: '2026-05-20T10:00',
      closesAt: '2026-06-13T23:59',
      seatsTotal: 200,
      seatsTaken: 158,
      expired: false,
    },
    speakers,
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    faq: [
      {
        id: 'faq-1',
        question: 'Как получить пропуск в вуз?',
        answer: 'Никак. Шутка. Оформим приглашение на входе — достаточно паспорта.',
      },
      {
        id: 'faq-2',
        question: 'Нужна ли регистрация?',
        answer: 'Да, количество мест ограничено. Регистрация закрывается за день до мероприятия.',
      },
      {
        id: 'faq-3',
        question: 'Можно ли прийти с другом?',
        answer: 'Конечно, но зарегистрируйте его отдельно — места закрепляются за участниками.',
      },
      {
        id: 'faq-4',
        question: 'Будет ли запись докладов?',
        answer: 'Да, запись лекций опубликуем на нашем VK-канале в течение недели.',
      },
    ],
  },
  {
    id: 'hakaton-iu',
    title: 'Хакатон ИУ',
    shortDescription: '48 часов кода, менторы из индустрии и призовой фонд',
    description: 'Классический хакатон факультета: команды, треки, менторы и защита проектов.',
    date: '2026-10-03T10:00',
    place: 'Бауманка',
    image: images.slides[1],
    status: 'upcoming',
  },
  {
    id: 'kybersport-turnir',
    title: 'Киберспортивный турнир',
    shortDescription: 'Турнир по CS2 и Dota 2 между потоками факультета',
    description: 'Турнир между потоками: CS2, Dota 2 и Mario Kart на приставке в коворкинге.',
    date: '2026-09-12T18:00',
    place: 'Бауманка',
    image: images.slides[2],
    status: 'upcoming',
  },
  {
    id: 'den-pervokursnika',
    title: 'День первокурсника',
    shortDescription: 'Знакомство с факультетом, студсоветом и студенческими организациями',
    description: 'Традиционная встреча первокурсников со студенческими организациями факультета.',
    date: '2026-11-08T14:00',
    place: 'Бауманка',
    image: images.slides[3],
    status: 'far',
  },
  {
    id: 'nauchnaya-konferenciya',
    title: 'Научная конференция СтудИУ',
    shortDescription: 'Секция студенческих научных работ по направлениям ИУ',
    description: 'Годовая конференция с защитой студенческих научных работ и публикацией тезисов.',
    date: '2026-12-05T11:00',
    place: 'Бауманка',
    image: images.slides[4],
    status: 'far',
  },
]

function pastRegistration(eventDate: string): RegistrationInfo {
  return {
    startsAt: `${eventDate}T12:00`,
    opensAt: '2025-09-01T10:00',
    closesAt: eventDate,
    seatsTotal: 200,
    seatsTaken: 200,
    expired: true,
  }
}

export const pastEvents: PastEvent[] = [
  {
    id: 'its-fest-2026',
    title: 'ITS FEST 2026',
    date: '2026-03-26T10:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Главный фестиваль технологий факультета — как это было',
    description:
      'ITS FEST 2026 собрал более 800 участников: лекции от практиков индустрии, воркшопы, стендап-батл и ярмарка вакансий от компаний-партнёров.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2026-03-26'),
  },
  {
    id: 'kyvest-baumanka',
    title: 'Квест «Бауманка»',
    date: '2026-02-15T13:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Увлекательный квест по корпусам и легендам университета',
    description:
      'Команды первокурсников разгадывали загадки о легендах факультета ИУ и знакомились с корпусами МГТУ. Победители получили мерч и сладкие призы.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2026-02-15'),
  },
  {
    id: 'novyy-god-ss-iu',
    title: 'Новый год СтудИУ',
    date: '2025-12-20T17:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Традиционный праздник для активистов совета',
    description:
      'Тёплый вечер для команды совета: итоги года, награждение активистов, поздравления от деканата и новогодняя программа.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2025-12-20'),
  },
  {
    id: 'den-otkrytyh-dverey',
    title: 'День открытых дверей',
    date: '2025-11-30T12:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Рассказали абитуриентам о факультете ИУ',
    description:
      'Провели день открытых дверей для абитуриентов: экскурсии по лабораториям, встречи с преподавателями и ответы на вопросы о поступлении.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2025-11-30'),
  },
  {
    id: 'kviz-po-programmirovaniyu',
    title: 'Квиз по программированию',
    date: '2025-10-18T19:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Шестьдесят команд и восемь туров вопросов',
    description:
      'Квиз собрал шестьдесят команд: алгоритмы, история языков программирования и вопросы на смекалку. Победители получили призы от партнёров.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2025-10-18'),
  },
  {
    id: 'lekciya-o-ai',
    title: 'Лекция об искусственном интеллекте',
    date: '2025-09-25T18:30',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Приглашённый спикер — о нейросетях на практике',
    description:
      'Приглашённый спикер из индустрии рассказал, как нейросети применяются в реальных продуктах, и ответил на вопросы студентов.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2025-09-25'),
  },
  {
    id: 'turnir-po-shahmatam',
    title: 'Турнир по шахматам',
    date: '2025-05-10T15:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Турнир между потоками факультета',
    description:
      'Шахматный турнир между потоками: блиц и классика, болельщики и крутое настроение. Победил третий курс — в следующем году вернёмся.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2025-05-10'),
  },
  {
    id: 'posledniy-zvonok',
    title: 'Последний звонок',
    date: '2025-04-05T16:00',
    place: 'Бауманка',
    image: images.pastEvent,
    shortDescription: 'Провожали выпускников совета',
    description:
      'Тёплые речи, воспоминания и напутствия: провожали выпускников совета. Часть команды осталась в совете уже в роли менторов.',
    gallery: Array.from({ length: 6 }, () => images.newsThumb),
    registration: pastRegistration('2025-04-05'),
  },
]
