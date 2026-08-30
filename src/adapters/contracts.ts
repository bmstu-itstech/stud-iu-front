import { z } from 'zod'

const databaseId = z.string().min(1)
const nullableString = z.string().nullable()

export const eventImageContractSchema = z.object({
  id: databaseId,
  image: nullableString,
})

export const futureEventContractSchema = z.object({
  id: databaseId,
  title: z.string(),
  description: z.string(),
  extended_description: z.string(),
  place: z.string(),
  precision: z.string(),
  start_datetime: z.string(),
  end_datetime: nullableString,
  date_range_display: z.string(),
  registration_link: nullableString,
  images: z.array(eventImageContractSchema),
})

export const pastEventContractSchema = z.object({
  id: databaseId,
  title: z.string(),
  description: z.string(),
  extended_description: z.string(),
  place: z.string(),
  precision: z.string(),
  start_datetime: z.string(),
  end_datetime: nullableString,
  date_range_display: z.string(),
  album_link: nullableString,
  images: z.array(eventImageContractSchema),
})

export const newsContractSchema = z.object({
  id: databaseId,
  title: z.string(),
  description: z.string(),
  cover: nullableString,
  created_at: z.string(),
})

export const partnerContractSchema = z.object({
  id: databaseId,
  name: z.string(),
  url: nullableString,
  image: nullableString,
})

export const boardMemberContractSchema = z.object({
  id: databaseId,
  name: z.string(),
  link: z.string(),
  position: z.string(),
  image: nullableString,
})

export const formOptionContractSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const formDependencyContractSchema = z.object({
  field: z.string(),
  contains: z.string(),
})

export const formFieldContractSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['text', 'date', 'url', 'multiple_choice']),
  required: z.boolean().default(false),
  placeholder: z.string().nullable().default(null),
  pattern: z.string().nullable().default(null),
  options: z.array(formOptionContractSchema).nullable().default(null),
  depends_on: formDependencyContractSchema.nullable().default(null),
})

export const applicationContractSchema = z.object({
  id: databaseId,
})

export type EventImageContract = z.infer<typeof eventImageContractSchema>
export type FutureEventContract = z.infer<typeof futureEventContractSchema>
export type PastEventContract = z.infer<typeof pastEventContractSchema>
export type NewsContract = z.infer<typeof newsContractSchema>
export type PartnerContract = z.infer<typeof partnerContractSchema>
export type BoardMemberContract = z.infer<typeof boardMemberContractSchema>
export type FormFieldContract = z.infer<typeof formFieldContractSchema>
