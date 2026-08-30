import { useEffect, useRef, useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons'
import type { Partner } from '@/types/domain'
import { cn } from '@/utils/cn'
import styles from './partners-carousel.module.css'

interface PartnersCarouselProps {
  partners: Partner[]
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  function updateArrows(): void {
    const element = viewportRef.current
    if (!element) return
    setCanPrev(element.scrollLeft > 4)
    setCanNext(element.scrollLeft < element.scrollWidth - element.clientWidth - 4)
  }

  useEffect(() => {
    updateArrows()
  }, [partners.length])

  function scrollByPage(direction: number): void {
    const element = viewportRef.current
    if (!element) return
    element.scrollBy({ left: direction * element.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <div className={styles.root} data-test-id="partners-carousel">
      <div className={styles.viewport} ref={viewportRef} onScroll={updateArrows}>
        <ul className={styles.track}>
          {partners.map((partner) => (
            <li key={partner.id} className={styles.item}>
              <div className={styles.card} title={partner.name} data-test-id="partner-logo">
                {partner.logo !== '' ? (
                  <img
                    src={partner.logo}
                    width={44}
                    height={44}
                    alt={partner.name}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.logoFallback} aria-hidden="true">
                    {partner.name}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={cn(styles.arrow, styles.prev)}
        aria-label="Предыдущие партнёры"
        disabled={!canPrev}
        onClick={() => scrollByPage(-1)}
        data-test-id="partners-prev"
      >
        <ArrowLeftIcon size={20} />
      </button>
      <button
        type="button"
        className={cn(styles.arrow, styles.next)}
        aria-label="Следующие партнёры"
        disabled={!canNext}
        onClick={() => scrollByPage(1)}
        data-test-id="partners-next"
      >
        <ArrowRightIcon size={20} />
      </button>
    </div>
  )
}
