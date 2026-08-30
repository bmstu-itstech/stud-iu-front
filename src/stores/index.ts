import { mockApi } from '@/services/api/mockApi'
import { realApi } from '@/services/api/realApi'
import { ApplicationsStore } from './applications.store'
import { EventsStore } from './events.store'
import { NewsStore } from './news.store'
import { OrgStore } from './org.store'

export interface Stores {
  events: EventsStore
  news: NewsStore
  org: OrgStore
  applications: ApplicationsStore
}

const api = import.meta.env.VITE_ENABLE_MOCKS === 'true' ? mockApi : realApi

export function createStores(): Stores {
  return {
    events: new EventsStore(api),
    news: new NewsStore(api),
    org: new OrgStore(api),
    applications: new ApplicationsStore(api),
  }
}

export const stores = createStores()
