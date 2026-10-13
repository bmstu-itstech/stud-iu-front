import { ArrowLeftIcon } from '@/components/icons'
import { cn } from '@/utils/cn'
import { useNavigate } from 'react-router-dom'
import styles from './back-link.module.css'

interface BackLinkProps {
  fallbackTo: string
  label?: string
  testId?: string
  className?: string
}

export function BackLink({ fallbackTo, label = 'Назад', testId, className }: BackLinkProps) {
  const navigate = useNavigate()

  const historyIndex = (window.history.state?.idx as number | undefined) ?? 0

  function handleClick(): void {
    if (historyIndex > 0) {
      navigate(-1)
    } else {
      navigate(fallbackTo)
    }
  }

  return (
    <button type="button" className={cn(styles.back, className)} onClick={handleClick} data-test-id={testId}>
      <ArrowLeftIcon size={20} />
      {label}
    </button>
  )
}
