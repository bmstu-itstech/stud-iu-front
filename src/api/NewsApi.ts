import type { NewsContract } from '@/adapters/contracts'
import { httpClient } from './http'

export class NewsApi {
  constructor(private http = httpClient) {}

  async getNews(): Promise<NewsContract[]> {
    const response = await this.http.get<NewsContract[]>('/api/v0/news/')
    return response.data
  }

  async getNewsItem(id: string): Promise<NewsContract> {
    const response = await this.http.get<NewsContract>(`/api/v0/news/${id}/`)
    return response.data
  }
}
