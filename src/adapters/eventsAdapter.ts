import { resolveMediaUrl } from '@/api/http'
import { eventSchema, pastEventSchema } from './schemas'
import type { FutureEventContract, PastEventContract } from './contracts'
import type { EventItem, PastEvent } from '@/types/domain'

function collectImages(images: { image: string | null }[]): string[] {
  return images
    .map((item) => resolveMediaUrl(item.image))
    .filter((url) => url !== '')
}

export function futureEventToDomain(raw: FutureEventContract): EventItem {
  const gallery = collectImages(raw.images)
  return eventSchema.parse({
    id: raw.id,
    title: raw.title,
    shortDescription: raw.description,
    description: raw.description,
    extendedDescription: raw.extended_description !== '' ? raw.extended_description : undefined,
    date: '',
    dateDisplay: raw.date_range_display,
    startAt: raw.start_datetime,
    endAt: raw.end_datetime ?? undefined,
    place: raw.place,
    image: gallery[0] ?? '',
    status: 'upcoming',
    registrationLink: raw.registration_link ?? undefined,
    gallery: gallery.length > 0 ? gallery : undefined,
  })
}

export function pastEventToDomain(raw: PastEventContract): PastEvent {
  const gallery = collectImages(raw.images)
  return pastEventSchema.parse({
    id: raw.id,
    title: raw.title,
    date: '',
    dateDisplay: raw.date_range_display,
    startAt: raw.start_datetime,
    endAt: raw.end_datetime ?? undefined,
    place: raw.place,
    image: gallery[0] ?? '',
    description: raw.description,
    extendedDescription: raw.extended_description !== '' ? raw.extended_description : undefined,
    albumLink: raw.album_link ?? undefined,
    gallery: gallery.length > 0 ? gallery : undefined,
  })
}
