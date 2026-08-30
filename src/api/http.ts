import axios from 'axios'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
})

export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  const base =
    apiBaseUrl !== ''
      ? apiBaseUrl
      : typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost'
  try {
    return new URL(path, base).toString()
  } catch {
    return path
  }
}
