import type { BoardMemberContract } from '@/adapters/contracts'
import { httpClient } from './http'

export class BoardMembersApi {
  constructor(private http = httpClient) {}

  async getBoardMembers(): Promise<BoardMemberContract[]> {
    const response = await this.http.get<BoardMemberContract[]>('/api/v0/board-members/')
    return response.data
  }
}
