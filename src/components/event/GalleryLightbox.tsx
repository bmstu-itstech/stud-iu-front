import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@/components/icons'
import styles from './gallery-lightbox.module.css'

interface GalleryLightboxProps {
  images: string[]
  initialIndex?: number
  title?: string
  onClose: () => void
}

export function GalleryLightbox({ images, initialIndex = 0, title, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)),
  )
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  const multiple = images.length > 1

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (!multiple) return
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, multiple, onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [index])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || !multiple) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) goNext()
      else goPrev()
    }
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Фотографии: ${title}` : 'Просмотр фотографий'}
      data-test-id="gallery-lightbox"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <header className={styles.header}>
        {multiple && (
          <span className={styles.counter} data-test-id="gallery-lightbox-counter">
            {index + 1} / {images.length}
          </span>
        )}
        <button
          type="button"
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть просмотр"
          data-test-id="gallery-lightbox-close"
        >
          <CloseIcon size={22} />
        </button>
      </header>

      <div
        className={styles.stage}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
        data-test-id="gallery-lightbox-stage"
      >
        {multiple && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navPrev}`}
            onClick={goPrev}
            aria-label="Предыдущее фото"
            data-test-id="gallery-lightbox-prev"
          >
            <ArrowLeftIcon size={26} />
          </button>
        )}

        <img
          key={index}
          src={images[index]}
          alt={title ? `${title} — фото ${index + 1}` : `Фото ${index + 1}`}
          className={styles.image}
          draggable={false}
          data-test-id="gallery-lightbox-image"
        />

        {multiple && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={goNext}
            aria-label="Следующее фото"
            data-test-id="gallery-lightbox-next"
          >
            <ArrowRightIcon size={26} />
          </button>
        )}
      </div>

      {multiple && (
        <div className={styles.thumbs} data-test-id="gallery-lightbox-thumbs">
          <div className={styles.thumbsList}>
            {images.map((image, thumbIndex) => (
              <button
                key={thumbIndex}
                type="button"
                ref={(node) => {
                  thumbRefs.current[thumbIndex] = node
                }}
                className={
                  thumbIndex === index ? `${styles.thumb} ${styles.thumbActive}` : styles.thumb
                }
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Фото ${thumbIndex + 1}`}
                aria-current={thumbIndex === index || undefined}
                data-test-id={`gallery-lightbox-thumb-${thumbIndex}`}
              >
                <img src={image} alt="" loading="lazy" draggable={false} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
