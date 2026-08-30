export type CnPart = string | false | null | undefined

export function cn(...parts: CnPart[]): string {
  return parts.filter(Boolean).join(' ')
}
