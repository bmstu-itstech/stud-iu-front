import { resolveMediaUrl } from '@/api/http'
import { contactSchema, partnerSchema } from './schemas'
import type { BoardMemberContract, PartnerContract } from './contracts'
import type { Contact, Partner } from '@/types/domain'

export function partnerToDomain(raw: PartnerContract): Partner {
  return partnerSchema.parse({
    id: raw.id,
    name: raw.name,
    logo: resolveMediaUrl(raw.image),
  })
}

export function boardMemberToDomain(raw: BoardMemberContract): Contact {
  return contactSchema.parse({
    id: raw.id,
    name: raw.name,
    role: raw.position,
    avatar: resolveMediaUrl(raw.image),
    telegram: raw.link !== '' ? raw.link : undefined,
  })
}
