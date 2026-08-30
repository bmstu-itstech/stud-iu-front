import type { FutureEventContract, PastEventContract } from '@/adapters/contracts'
import { httpClient } from './http'

export class EventsApi {
  constructor(private http = httpClient) {}

  async getFutureEvents(): Promise<FutureEventContract[]> {
    const response = await this.http.get<FutureEventContract[]>('/api/v0/events/')
    return response.data
  }

  async getFutureEvent(id: string): Promise<FutureEventContract> {
    const response = await this.http.get<FutureEventContract>(`/api/v0/events/${id}/`)
    return response.data
  }

  async getPastEvents(): Promise<PastEventContract[]> {
    const response = await this.http.get<PastEventContract[]>('/api/v0/events/past/')
    return response.data
  }

  async getPastEvent(id: string): Promise<PastEventContract> {
    const response = await this.http.get<PastEventContract>(`/api/v0/events/past/${id}/`)
    return response.data
  }
}
