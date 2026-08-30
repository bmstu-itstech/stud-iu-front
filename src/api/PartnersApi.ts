import type { PartnerContract } from '@/adapters/contracts'
import { httpClient } from './http'

export class PartnersApi {
  constructor(private http = httpClient) {}

  async getPartners(): Promise<PartnerContract[]> {
    const response = await this.http.get<PartnerContract[]>('/api/v0/partners/')
    return response.data
  }
}
