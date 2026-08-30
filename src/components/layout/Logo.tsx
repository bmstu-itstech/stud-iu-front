import { Link } from 'react-router-dom'

import logoUrl from '@/assets/icons/logo.svg'
import styles from './logo.module.css'

interface LogoProps {
  testId?: string
}

export function Logo({ testId }: LogoProps) {
  return (
    <Link to="/" className={styles.link} aria-label="СтудИУ — на главную" data-test-id={testId}>
      <img src={logoUrl} width={173} height={48} alt="СтудИУ" className={styles.image} />
    </Link>
  )
}
