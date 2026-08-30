import { resolveMediaUrl } from '@/api/http'
import { newsItemSchema } from './schemas'
import type { NewsContract } from './contracts'
import type { NewsItem } from '@/types/domain'

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text
  const cutoff = text.slice(0, limit)
  const lastSpace = cutoff.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cutoff.slice(0, lastSpace) : cutoff).trimEnd()}…`
}

export function newsToDomain(raw: NewsContract): NewsItem {
  const paragraphs = raw.description
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

  return newsItemSchema.parse({
    id: raw.id,
    title: raw.title,
    date: raw.created_at,
    excerpt: truncate(paragraphs[0] ?? '', 180),
    image: resolveMediaUrl(raw.cover),
    content: paragraphs,
  })
}
