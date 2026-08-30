export type EventStatus = 'active' | 'upcoming' | 'far'

export interface RegistrationInfo {
  startsAt: string
  opensAt: string
  closesAt: string
  seatsTotal: number
  seatsTaken: number
  expired?: boolean
}

export interface Speaker {
  id: string
  name: string
  role: string
  avatar: string
}

export interface FaqEntry {
  id: string
  question: string
  answer: string
}

export interface EventItem {
  id: string
  title: string
  shortDescription: string
  description: string
  extendedDescription?: string
  date: string
  dateDisplay?: string
  startAt?: string
  endAt?: string
  place: string
  image: string
  status: EventStatus
  registrationLink?: string
  albumLink?: string
  registration?: RegistrationInfo
  speakers?: Speaker[]
  gallery?: string[]
  faq?: FaqEntry[]
}

export type PastEvent = Pick<EventItem, 'id' | 'title' | 'date' | 'place' | 'image'> &
  Partial<
    Pick<
      EventItem,
      | 'shortDescription'
      | 'description'
      | 'extendedDescription'
      | 'gallery'
      | 'speakers'
      | 'faq'
      | 'registration'
      | 'dateDisplay'
      | 'startAt'
      | 'endAt'
      | 'albumLink'
    >
  >

export interface NewsItem {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  content: string[]
  source?: string
}

export interface Partner {
  id: string
  name: string
  logo: string
}

export interface Contact {
  id: string
  name: string
  role: string
  avatar: string
  telegram?: string
}

export interface StatItem {
  id: string
  value: string
  label: string
  cta: {
    label: string
    to?: string
    href?: string
  }
}

export interface OrgInfo {
  stats: StatItem[]
  partners: Partner[]
  contacts: Contact[]
}

export interface JoinApplication {
  fullName: string
  studyGroup: string
  telegram: string
  vk: string
  github?: string
  birthDate: string
  interests: string[]
  techTasks: string[]
}

export type FormFieldType = 'text' | 'date' | 'url' | 'multiple_choice'

export interface FormFieldOption {
  value: string
  label: string
}

export interface FormFieldDependency {
  field: string
  contains: string
}

export interface FormField {
  key: string
  label: string
  type: FormFieldType
  required: boolean
  placeholder: string | null
  pattern: string | null
  options: FormFieldOption[] | null
  dependsOn: FormFieldDependency | null
}

export type ApplicationPayload = Record<string, string | string[]>
