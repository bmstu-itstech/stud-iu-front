import type { ApplicationPayload } from '@/types/domain'
import type { FormFieldContract } from '@/adapters/contracts'
import { httpClient } from './http'

export class ApplicationsApi {
  constructor(private http = httpClient) {}

  async getFormSchema(): Promise<FormFieldContract[]> {
    const response = await this.http.get<FormFieldContract[]>('/api/v0/application/schema/')
    return response.data
  }

  async createApplication(payload: ApplicationPayload): Promise<unknown> {
    const response = await this.http.post('/api/v0/application/', payload)
    return response.data
  }
}
