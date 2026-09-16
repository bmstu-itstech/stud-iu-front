import { Link } from 'react-router-dom'

import { directions } from '@/config/directions'
import styles from './directions-section.module.css'

export function DirectionsSection() {
  return (
    <section className="container home-section" id="directions" data-test-id="directions-section">
      <h2 className="text-title text-title-center">Направления</h2>
      <p className={styles.subtitle}>Выбери, чем хочешь заниматься.</p>

      <div className={styles.tags}>
        {directions.map((direction) => (
          <Link
            key={direction.slug}
            to={`/directions/${direction.slug}`}
            className={styles.tag}
            data-test-id="direction-card"
          >
            {direction.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
