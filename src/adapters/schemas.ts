import { z } from 'zod'

const isoDateString = z.string().min(1)

export const speakerSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
})

export const faqEntrySchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
})

export const registrationInfoSchema = z.object({
  startsAt: isoDateString,
  opensAt: isoDateString,
  closesAt: isoDateString,
  seatsTotal: z.number().int().positive(),
  seatsTaken: z.number().int().nonnegative(),
  expired: z.boolean().optional(),
})

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  extendedDescription: z.string().optional(),
  date: z.string(),
  dateDisplay: z.string().optional(),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
  place: z.string(),
  image: z.string(),
  status: z.enum(['active', 'upcoming', 'far']),
  registrationLink: z.string().optional(),
  albumLink: z.string().optional(),
  registration: registrationInfoSchema.optional(),
  speakers: z.array(speakerSchema).optional(),
  gallery: z.array(z.string()).optional(),
  faq: z.array(faqEntrySchema).optional(),
})

export const pastEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  dateDisplay: z.string().optional(),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
  place: z.string(),
  image: z.string(),
  description: z.string().optional(),
  extendedDescription: z.string().optional(),
  albumLink: z.string().optional(),
  gallery: z.array(z.string()).optional(),
})

export const newsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: isoDateString,
  excerpt: z.string(),
  image: z.string(),
  content: z.array(z.string()),
  source: z.string().optional(),
})

export const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
})

export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
  telegram: z.string().optional(),
})

export const statItemSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  cta: z.object({
    label: z.string(),
    to: z.string().optional(),
    href: z.string().optional(),
  }),
})

export const orgInfoSchema = z.object({
  stats: z.array(statItemSchema),
  partners: z.array(partnerSchema),
  contacts: z.array(contactSchema),
})

export const joinApplicationSchema = z.object({
  fullName: z.string().trim().min(1, 'Укажите ФИО'),
  studyGroup: z.string().trim().min(1, 'Укажите учебную группу'),
  telegram: z.string().trim().min(1, 'Укажите ссылку на Telegram'),
  vk: z.string().trim().min(1, 'Укажите ссылку на профиль в VK'),
  github: z.string().trim().optional(),
  birthDate: z.string().min(1, 'Укажите дату рождения'),
  interests: z.array(z.string()).min(1, 'Выберите хотя бы один вариант'),
  techTasks: z.array(z.string()).min(1, 'Выберите хотя бы один вариант'),
  consent: z.literal(true, { message: 'Подтвердите согласие на обработку персональных данных' }),
})

export type JoinApplicationInput = z.infer<typeof joinApplicationSchema>
