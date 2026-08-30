import telegramIcon from '@/assets/icons/telegram.svg'
import type { Contact } from '@/types/domain'
import { cn } from '@/utils/cn'
import styles from './contact-card.module.css'

interface ContactCardProps {
  contact: Contact
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function ContactCard({ contact }: ContactCardProps) {
  const clickable = contact.telegram !== undefined
  const body = (
    <>
      <div className={styles.info}>
        <h3 className={styles.name}>
          {contact.name}
          {clickable && (
            <span className={styles.telegram} aria-hidden="true">
              <img src={telegramIcon} width={16} height={16} alt="" />
            </span>
          )}
        </h3>
        <p className={styles.role}>{contact.role}</p>
      </div>
      {contact.avatar !== '' ? (
        <img
          src={contact.avatar}
          alt={contact.name}
          className={styles.avatar}
          loading="lazy"
        />
      ) : (
        <span
          className={cn(styles.avatar, styles.avatarFallback)}
          aria-hidden="true"
          data-test-id="contact-avatar-fallback"
        >
          {getInitials(contact.name)}
        </span>
      )}
    </>
  )

  if (clickable) {
    return (
      <a
        href={contact.telegram}
        target="_blank"
        rel="noreferrer"
        className={cn(styles.card, styles.clickable)}
        aria-label={`Telegram ${contact.name}`}
        data-test-id="contact-card"
      >
        {body}
      </a>
    )
  }

  return (
    <article className={styles.card} data-test-id="contact-card">
      {body}
    </article>
  )
}
