import { formFieldsToDomain } from '@/adapters/applicationsAdapter'
import {
  futureEventToDomain,
  pastEventToDomain,
} from '@/adapters/eventsAdapter'
import { newsToDomain } from '@/adapters/newsAdapter'
import { boardMemberToDomain, partnerToDomain } from '@/adapters/orgAdapter'
import { eventSchema } from '@/adapters/schemas'
import { ApplicationsApi } from '@/api/ApplicationsApi'
import { BoardMembersApi } from '@/api/BoardMembersApi'
import { EventsApi } from '@/api/EventsApi'
import { isNotFoundError } from '@/api/errors'
import { NewsApi } from '@/api/NewsApi'
import { PartnersApi } from '@/api/PartnersApi'
import { defaultOrgStats } from '@/config/organization'
import type { ApplicationPayload, EventItem, FormField, NewsItem, OrgInfo, PastEvent } from '@/types/domain'

const eventsApi = new EventsApi()
const newsApi = new NewsApi()
const partnersApi = new PartnersApi()
const boardMembersApi = new BoardMembersApi()
const applicationsApi = new ApplicationsApi()

function pastEventToEventItem(raw: Awaited<ReturnType<EventsApi['getPastEvent']>>): EventItem {
  const past = pastEventToDomain(raw)
  return eventSchema.parse({
    ...past,
    shortDescription: past.description ?? '',
    description: past.description ?? '',
    status: 'far',
  })
}

export const realApi = {
  async getUpcomingEvents(): Promise<EventItem[]> {
    const raw = await eventsApi.getFutureEvents()
    return raw.map(futureEventToDomain)
  },

  async getPastEvents(): Promise<PastEvent[]> {
    const raw = await eventsApi.getPastEvents()
    return raw.map(pastEventToDomain)
  },

  async getEvent(id: string): Promise<EventItem | undefined> {
    try {
      return futureEventToDomain(await eventsApi.getFutureEvent(id))
    } catch (error) {
      if (!isNotFoundError(error)) throw error
    }
    try {
      return pastEventToEventItem(await eventsApi.getPastEvent(id))
    } catch (error) {
      if (isNotFoundError(error)) return undefined
      throw error
    }
  },

  async getNews(): Promise<NewsItem[]> {
    const raw = await newsApi.getNews()
    return raw.map(newsToDomain)
  },

  async getOrgInfo(): Promise<OrgInfo> {
    const [partners, members] = await Promise.all([
      partnersApi.getPartners(),
      boardMembersApi.getBoardMembers(),
    ])
    return {
      stats: defaultOrgStats,
      partners: partners.map(partnerToDomain),
      contacts: members.map(boardMemberToDomain),
    }
  },

  async getFormSchema(): Promise<FormField[]> {
    return formFieldsToDomain(await applicationsApi.getFormSchema())
  },

  async submitApplication(payload: ApplicationPayload): Promise<{ ok: true }> {
    await applicationsApi.createApplication(payload)
    return { ok: true } as const
  },
}
