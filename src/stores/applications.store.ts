import { makeAutoObservable, runInAction } from 'mobx'

import type { ApplicationPayload, FormField } from '@/types/domain'

export interface ApplicationsApi {
  getFormSchema(): Promise<FormField[]>
  submitApplication(payload: ApplicationPayload): Promise<{ ok: true }>
}

export class ApplicationsStore {
  schema: FormField[] | null = null
  loading = false
  error: string | null = null
  submitting = false
  submitError: string | null = null

  private loaded = false

  constructor(private api: ApplicationsApi) {
    makeAutoObservable(this)
  }

  async loadSchema(force = false): Promise<void> {
    if (this.loaded && !force) return
    this.loading = true
    this.error = null
    try {
      const schema = await this.api.getFormSchema()
      runInAction(() => {
        this.schema = schema
        this.loaded = true
      })
    } catch (cause) {
      runInAction(() => {
        this.error = 'Не удалось загрузить форму. Попробуйте ещё раз.'
      })
      console.error('ApplicationsStore: schema request failed', cause)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async submit(payload: ApplicationPayload): Promise<boolean> {
    this.submitting = true
    this.submitError = null
    try {
      await this.api.submitApplication(payload)
      return true
    } catch (cause) {
      runInAction(() => {
        this.submitError = 'Не удалось отправить заявку. Попробуйте ещё раз.'
      })
      console.error('ApplicationsStore: submit failed', cause)
      return false
    } finally {
      runInAction(() => {
        this.submitting = false
      })
    }
  }
}
