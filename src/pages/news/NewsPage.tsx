import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowLeftIcon } from '@/components/icons'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'
import { formatLongDate } from '@/utils/format-date'
import styles from './news-page.module.css'

export const NewsPage = observer(function NewsPage() {
  const { id } = useParams<{ id: string }>()
  const { news } = stores

  useEffect(() => {
    void news.load()
  }, [news])

  if (news.loading && news.items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.article}>
            <p data-test-id="page-loading">Загрузка…</p>
          </div>
        </div>
      </div>
    )
  }

  const item = news.items.find((newsItem) => newsItem.id === id)

  if (!item) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.article}>
            <h1 className={styles.title}>Новость не найдена</h1>
            <p className={styles.date}>
              Возможно, она ещё не опубликована.{' '}
              <Link to="/" className={styles.back} data-test-id="news-not-found-link">
                На главную
              </Link>
            </p>
            <span className="sr-only" data-test-id="news-not-found" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page} data-test-id="news-page">
      <div className="container">
        <article className={styles.article}>
          <Link to="/#news" className={styles.back} data-test-id="news-back">
            <ArrowLeftIcon size={20} />
            Все новости
          </Link>

          <h1 className={styles.title} data-test-id="news-title">
            {item.title}
          </h1>
          <time dateTime={item.date} className={styles.date}>
            {formatLongDate(item.date)}
          </time>

          {item.image !== '' && <img src={item.image} alt="" className={styles.image} />}

          <div className={styles.content} data-test-id="news-content">
            {item.content.map((paragraph, index) => (
              <p key={`${item.id}-paragraph-${index}`} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          {item.source && (
            <p className={styles.source} data-test-id="news-source">
              Источник: {item.source}
            </p>
          )}
        </article>
      </div>
    </div>
  )
})
