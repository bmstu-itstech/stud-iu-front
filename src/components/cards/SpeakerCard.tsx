import type { Speaker } from '@/types/domain'
import styles from './speaker-card.module.css'

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <article className={styles.card} data-test-id="speaker-card">
      <img src={speaker.avatar} alt={speaker.name} className={styles.avatar} loading="lazy" />
      <div className={styles.info}>
        <h3 className={styles.name}>{speaker.name}</h3>
        <p className={styles.role}>{speaker.role}</p>
      </div>
    </article>
  )
}
