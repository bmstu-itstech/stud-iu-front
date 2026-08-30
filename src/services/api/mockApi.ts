import { z } from 'zod'

import {
  eventSchema,
  newsItemSchema,
  orgInfoSchema,
  pastEventSchema,
} from '@/adapters/schemas'
import { formFieldsToDomain } from '@/adapters/applicationsAdapter'
import { applicationFormSchema } from '@/mocks/applications'
import { pastEvents, upcomingEvents } from '@/mocks/events'
import { news } from '@/mocks/news'
import { orgInfo } from '@/mocks/org'
import type { ApplicationPayload, EventItem, FormField, NewsItem, OrgInfo, PastEvent } from '@/types/domain'

const DEFAULT_DELAY_MS = 200

function delay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const mockApi = {
  async getUpcomingEvents(): Promise<EventItem[]> {
    await delay()
    return z.array(eventSchema).parse(upcomingEvents)
  },

  async getPastEvents(): Promise<PastEvent[]> {
    await delay()
    return z.array(pastEventSchema).parse(pastEvents)
  },

  async getEvent(id: string): Promise<EventItem | undefined> {
    await delay()
    const upcoming = upcomingEvents.find((event) => event.id === id)
    if (upcoming) return eventSchema.parse(upcoming)

    const past = pastEvents.find((event) => event.id === id)
    if (!past) return undefined

    return eventSchema.parse({
      ...past,
      shortDescription: past.shortDescription ?? '',
      description: past.description ?? '',
      status: 'far',
    })
  },

  async getNews(): Promise<NewsItem[]> {
    await delay()
    return z.array(newsItemSchema).parse(news)
  },

  async getOrgInfo(): Promise<OrgInfo> {
    await delay()
    return orgInfoSchema.parse(orgInfo)
  },

  async getFormSchema(): Promise<FormField[]> {
    await delay()
    return formFieldsToDomain(applicationFormSchema)
  },

  async submitApplication(payload: ApplicationPayload): Promise<{ ok: true }> {
    await delay(400)
    const categories = payload['categories']
    const selected = Array.isArray(categories) ? categories : []
    for (const field of applicationFormSchema) {
      const dependency = 'depends_on' in field ? field.depends_on : null
      if (dependency && !selected.includes(dependency.contains)) continue
      if (!field.required) continue

      const value = payload[field.key]
      const empty =
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      if (empty) {
        throw new Error(`Заполните поле «${field.label}»`)
      }
    }
    return { ok: true } as const
  },
}
