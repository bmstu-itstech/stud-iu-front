import { Link, useParams } from 'react-router-dom'

import { NotFoundState } from '@/components/not-found/NotFoundState'
import { ArrowLeftIcon } from '@/components/icons'
import { Button } from '@/components/ui/button/Button'
import { getDirectionBySlug, type DirectionBlock } from '@/config/directions'
import styles from './direction-page.module.css'

function renderBlock(block: DirectionBlock, index: number) {
  const key = `block-${index}`

  if (block.type === 'text') {
    return (
      <section className={styles.block} key={key}>
        {block.title !== undefined && <h2 className="text-subtitle">{block.title}</h2>}
        {block.paragraphs.map((paragraph, paragraphIndex) => (
          <p className={styles.text} key={paragraphIndex}>
            {paragraph}
          </p>
        ))}
      </section>
    )
  }

  if (block.type === 'list') {
    return (
      <section className={styles.block} key={key}>
        <h2 className="text-subtitle">{block.title}</h2>
        {block.intro !== undefined && <p className={styles.text}>{block.intro}</p>}
        <ul className={styles.list}>
          {block.items.map((item, itemIndex) => (
            <li className={styles.listItem} key={itemIndex}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section className={styles.block} key={key}>
      <h2 className="text-subtitle">{block.title}</h2>
      {block.intro !== undefined && <p className={styles.text}>{block.intro}</p>}
      <div className={`${styles.cardsGrid} ${styles[`cols${block.columns ?? 2}`]}`}>
        {block.cards.map((card) => (
          <div className={styles.infoCard} key={card.name}>
            <h3 className={styles.infoCardName}>{card.name}</h3>
            {card.description !== undefined && (
              <p className={styles.infoCardText}>{card.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export function DirectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const direction = getDirectionBySlug(slug ?? '')

  if (direction === undefined) {
    return (
      <NotFoundState
        testId="direction-not-found"
        title="Направление не найдено"
        description="Проверь адрес или загляни на главную — там есть список всех направлений."
      />
    )
  }

  return (
    <div className={styles.page} data-test-id="direction-page">
      <div className="container">
        <Link to="/" className={styles.back} data-test-id="direction-back">
          <ArrowLeftIcon size={20} />
          Назад
        </Link>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.header}>
              <h1 className="text-title" data-test-id="direction-title">
                {direction.title}
              </h1>
              <p className={styles.tagline}>{direction.tagline}</p>
            </div>

            {direction.blocks.map((block, index) => renderBlock(block, index))}
          </div>

          <aside className={styles.aside}>
            <div className={styles.joinCard} data-test-id="direction-join-card">
              <h2 className={styles.joinTitle}>Вступление</h2>
              {direction.lead !== null && (
                <div className={styles.joinRow}>
                  <span className={styles.joinLabel}>Руководитель</span>
                  <span className={styles.joinValue}>{direction.lead}</span>
                </div>
              )}
              {direction.joinNote !== undefined && (
                <p className={styles.joinNote}>{direction.joinNote}</p>
              )}
              <Button
                to={`/join?direction=${direction.activityValue}`}
                fullWidth
                testId="direction-join-button"
              >
                Вступить в направление
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
