import { Link } from 'react-router-dom'

import type { NewsItem } from '@/types/domain'
import { formatDottedDate } from '@/utils/format-date'
import { truncate } from '@/utils/truncate'
import styles from './news-card.module.css'

const MAX_TITLE_LENGTH = 38;

interface NewsCardProps {
  item: NewsItem
}

export function NewsCard({ item }: NewsCardProps) {
  const truncatedTitle = truncate(item.title, MAX_TITLE_LENGTH)

  return (
    <Link to={`/news/${item.id}`} className={styles.card} data-test-id="news-card">
      {item.image !== '' && (
        <img src={item.image} alt="" className={styles.image} loading="lazy" />
      )}
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.titleTruncated}>{truncatedTitle}</span>
          <span className={styles.titleFull}>{item.title}</span>
        </h3>
        <time dateTime={item.date} className={styles.date}>
          {formatDottedDate(item.date)}
        </time>
      </div>
      <p className={styles.excerpt}>{item.excerpt}</p>
    </Link>
  )
}
