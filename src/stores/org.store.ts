import { makeAutoObservable, runInAction } from 'mobx'

import type { OrgInfo } from '@/types/domain'

export interface OrgApi {
  getOrgInfo(): Promise<OrgInfo>
}

export class OrgStore {
  info: OrgInfo | null = null
  loading = false
  error: string | null = null

  private loaded = false

  constructor(private api: OrgApi) {
    makeAutoObservable(this)
  }

  async load(force = false): Promise<void> {
    if (this.loaded && !force) return
    this.loading = true
    this.error = null
    try {
      const info = await this.api.getOrgInfo()
      runInAction(() => {
        this.info = info
        this.loaded = true
      })
    } catch (cause) {
      runInAction(() => {
        this.error = 'Не удалось загрузить информацию. Попробуйте ещё раз.'
      })
      console.error('OrgStore: request failed', cause)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
