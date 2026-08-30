import { useEffect } from 'react'

import { NewsCard } from '@/components/cards/NewsCard'
import { Button } from '@/components/ui/button/Button'
import { EmptyState } from '@/components/ui/empty-state/EmptyState'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'
import styles from './news-section.module.css'

export const NewsSection = observer(function NewsSection() {
  const { news } = stores

  useEffect(() => {
    void news.load()
  }, [news])

  const loading = news.loading && news.items.length === 0
  const failed = news.error !== null && news.items.length === 0
  const empty = !loading && !failed && news.items.length === 0

  return (
    <section className="container home-section" id="news" data-test-id="news-section">
      <h2 className="text-title text-title-center">Новости</h2>
      <p className={styles.subtitle}>
        Свежая информация о последних событиях в жизни факультета.
      </p>

      {loading && <p className="section-loading" data-test-id="section-loading">Загрузка…</p>}

      {failed && (
        <EmptyState
          title="Не удалось загрузить новости"
          description="Проверь соединение и попробуй ещё раз"
          action={
            <Button variant="secondary" onClick={() => void news.load(true)} testId="section-retry">
              Повторить
            </Button>
          }
          testId="section-error"
        />
      )}

      {empty && (
        <EmptyState
          title="Новостей пока нет"
          description="Свежие новости факультета появятся здесь"
          testId="section-empty"
        />
      )}

      {news.items.length > 0 && (
        <div className={styles.grid}>
          {news.items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <Button href="#news" variant="dark" testId="news-all-button">
          Все новости
        </Button>
      </div>
    </section>
  )
})
