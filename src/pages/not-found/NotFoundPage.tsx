import { Link } from 'react-router-dom'

import styles from './not-found-page.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page} data-test-id="not-found-page">
      <h1 className="text-title">Страница не найдена</h1>
      <p>
        Кажется, такой страницы у нас нет.{' '}
        <Link to="/" className={styles.link} data-test-id="back-home-link">
          На главную
        </Link>
      </p>
    </div>
  )
}
