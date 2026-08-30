import { z } from 'zod'

import { formFieldContractSchema } from './contracts'
import type { FormField } from '@/types/domain'

export function formFieldsToDomain(raw: unknown): FormField[] {
  return z.array(formFieldContractSchema).parse(raw).map((field) => ({
    key: field.key,
    label: field.label,
    type: field.type,
    required: field.required,
    placeholder: field.placeholder,
    pattern: field.pattern,
    options: field.options ?? null,
    dependsOn: field.depends_on ?? null,
  }))
}
