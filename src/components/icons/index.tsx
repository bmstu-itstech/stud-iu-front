export interface IconProps {
  size?: number
  className?: string
}

function base(width: number, className?: string) {
  return {
    width,
    height: width,
    className,
    fill: 'none' as const,
    'aria-hidden': true as const,
  }
}

export function ArrowLeftIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size, className)}>
      <path
        d="M14.5 6 8.5 12l6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size, className)}>
      <path
        d="m9.5 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size, className)}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function PlusIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...base(size, className)}>
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MinusIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...base(size, className)}>
      <path d="M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function SearchIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...base(size, className)}>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...base(size, className)}>
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CheckIcon({ size = 12, className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" {...base(size, className)}>
      <path
        d="m2.5 6.5 2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CalendarIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...base(size, className)}>
      <rect x="3" y="4.5" width="14" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 8.5h14" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7 2.5v3M13 2.5v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function InboxIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size, className)}>
      <path
        d="M4 13.5 6.8 5.6A1.5 1.5 0 0 1 8.2 4.5h7.6a1.5 1.5 0 0 1 1.4 1.1L20 13.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18v-4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 13.5h4.3l1.4 2h4.6l1.4-2H20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SuccessIcon({ size = 64, className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="32" fill="var(--color-success)" />
      <path
        d="M20 33.5 28.5 42 44 24"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
