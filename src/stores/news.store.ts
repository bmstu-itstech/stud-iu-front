import { makeAutoObservable, runInAction } from 'mobx'

import type { NewsItem } from '@/types/domain'

export interface NewsApi {
  getNews(): Promise<NewsItem[]>
}

export class NewsStore {
  items: NewsItem[] = []
  loading = false
  error: string | null = null

  private loaded = false

  constructor(private api: NewsApi) {
    makeAutoObservable(this)
  }

  async load(force = false): Promise<void> {
    if (this.loaded && !force) return
    this.loading = true
    this.error = null
    try {
      const items = await this.api.getNews()
      runInAction(() => {
        this.items = items
        this.loaded = true
      })
    } catch (cause) {
      runInAction(() => {
        this.error = 'Не удалось загрузить новости. Попробуйте ещё раз.'
      })
      console.error('NewsStore: request failed', cause)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
