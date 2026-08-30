import { Link } from 'react-router-dom'

import type { NewsItem } from '@/types/domain'
import { formatDottedDate } from '@/utils/format-date'
import styles from './news-card.module.css'

interface NewsCardProps {
  item: NewsItem
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Link to={`/news/${item.id}`} className={styles.card} data-test-id="news-card">
      {item.image !== '' && (
        <img src={item.image} alt="" className={styles.image} loading="lazy" />
      )}
      <div className={styles.header}>
        <h3 className={styles.title}>{item.title}</h3>
        <time dateTime={item.date} className={styles.date}>
          {formatDottedDate(item.date)}
        </time>
      </div>
      <p className={styles.excerpt}>{item.excerpt}</p>
    </Link>
  )
}
