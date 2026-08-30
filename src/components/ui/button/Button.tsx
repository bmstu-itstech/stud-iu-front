import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'
import styles from './button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'dark'

interface CommonProps {
  children: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  fullWidth?: boolean
  testId?: string
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string
    href?: undefined
  }

type ButtonAsExternal = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: undefined
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  testId,
  className,
  ...rest
}: ButtonProps) {
  const classNames = cn(
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className,
  )

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...anchorProps } = rest
    return (
      <Link to={to} className={classNames} data-test-id={testId} {...anchorProps}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest
    return (
      <a href={href} className={classNames} data-test-id={testId} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonAsButton
  return (
    <button
      type={buttonProps.type ?? 'button'}
      className={classNames}
      disabled={disabled}
      data-test-id={testId}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
