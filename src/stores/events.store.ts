import { makeAutoObservable, runInAction } from 'mobx'

import type { EventItem, PastEvent } from '@/types/domain'

export interface EventsApi {
  getUpcomingEvents(): Promise<EventItem[]>
  getPastEvents(): Promise<PastEvent[]>
  getEvent(id: string): Promise<EventItem | undefined>
}

export class EventsStore {
  upcoming: EventItem[] = []
  past: PastEvent[] = []
  loading = false
  error: string | null = null
  searchQuery = ''

  private upcomingLoaded = false
  private pastLoaded = false

  constructor(private api: EventsApi) {
    makeAutoObservable(this)
  }

  get filteredPast(): PastEvent[] {
    const query = this.searchQuery.trim().toLowerCase()
    if (!query) return this.past
    return this.past.filter((event) => event.title.toLowerCase().includes(query))
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query
  }

  async loadUpcoming(force = false): Promise<void> {
    if (this.upcomingLoaded && !force) return
    await this.run(() => this.api.getUpcomingEvents(), (data) => {
      this.upcoming = data
      this.upcomingLoaded = true
    })
  }

  async loadPast(force = false): Promise<void> {
    if (this.pastLoaded && !force) return
    await this.run(() => this.api.getPastEvents(), (data) => {
      this.past = data
      this.pastLoaded = true
    })
  }

  async loadEvent(id: string): Promise<EventItem | undefined> {
    return this.api.getEvent(id)
  }

  getEventById(id: string): EventItem | undefined {
    return this.upcoming.find((event) => event.id === id)
  }

  private async run<T>(
    request: () => Promise<T>,
    apply: (data: T) => void,
  ): Promise<void> {
    this.loading = true
    this.error = null
    try {
      const data = await request()
      runInAction(() => apply(data))
    } catch (cause) {
      runInAction(() => {
        this.error = 'Не удалось загрузить данные. Попробуйте ещё раз.'
      })
      console.error('EventsStore: request failed', cause)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
