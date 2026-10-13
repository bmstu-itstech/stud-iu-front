import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, DownloadIcon, LinkIcon, MoreIcon } from '@/components/icons'
import { cn } from '@/utils/cn'
import styles from './gallery-lightbox.module.css'

interface GalleryLightboxProps {
  images: string[]
  initialIndex?: number
  title?: string
  onClose: () => void
}

type MenuPhase = 'closed' | 'open' | 'closing'

const MENU_EXIT_MS = 150
const TOAST_VISIBLE_MS = 2000
const TOAST_EXIT_MS = 200

function absoluteImageUrl(src: string): string {
  return new URL(src, window.location.origin).href
}

function imageFileName(src: string, title: string | undefined, index: number): string {
  const pathname = new URL(src, window.location.href).pathname
  const raw = pathname.split('/').pop()
  const ext = raw !== undefined && raw.includes('.') ? raw.slice(raw.lastIndexOf('.')) : '.jpg'
  return title ? `${title} — фото ${index + 1}${ext}` : raw ?? `фото-${index + 1}${ext}`
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    return copied
  }
}

export function GalleryLightbox({ images, initialIndex = 0, title, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)),
  )
  const [closing, setClosing] = useState(false)
  const [menuPhase, setMenuPhase] = useState<MenuPhase>('closed')
  const [toast, setToast] = useState<string | null>(null)
  const [toastClosing, setToastClosing] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuCloseTimer = useRef<number | undefined>(undefined)
  const toastTimer = useRef<number | undefined>(undefined)
  const toastHideTimer = useRef<number | undefined>(undefined)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  const multiple = images.length > 1

  const openMenu = useCallback(() => {
    window.clearTimeout(menuCloseTimer.current)
    setMenuPhase('open')
  }, [])

  const closeMenu = useCallback(() => {
    setMenuPhase((phase) => (phase === 'open' ? 'closing' : phase))
    window.clearTimeout(menuCloseTimer.current)
    menuCloseTimer.current = window.setTimeout(() => setMenuPhase('closed'), MENU_EXIT_MS)
  }, [])

  const hideMenuNow = useCallback(() => {
    window.clearTimeout(menuCloseTimer.current)
    setMenuPhase('closed')
  }, [])

  const close = useCallback(() => {
    hideMenuNow()
    setClosing(true)
  }, [hideMenuNow])

  useEffect(() => {
    if (!closing) return
    const timer = window.setTimeout(onClose, 200)
    return () => window.clearTimeout(timer)
  }, [closing, onClose])

  useEffect(() => () => {
    window.clearTimeout(menuCloseTimer.current)
    window.clearTimeout(toastTimer.current)
    window.clearTimeout(toastHideTimer.current)
  }, [])

  const showToast = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current)
    window.clearTimeout(toastHideTimer.current)
    setToast(message)
    setToastClosing(false)
    toastTimer.current = window.setTimeout(() => {
      setToastClosing(true)
      toastHideTimer.current = window.setTimeout(() => setToast(null), TOAST_EXIT_MS)
    }, TOAST_VISIBLE_MS)
  }, [])

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (menuPhase !== 'closed') {
        if (event.key === 'Escape') {
          if (menuPhase === 'closing') {
            close()
          } else {
            closeMenu()
            moreButtonRef.current?.focus()
          }
          return
        }
        if (menuPhase === 'open' && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
          event.preventDefault()
          const items = Array.from(
            menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [],
          )
          if (items.length === 0) return
          const currentIndex = items.findIndex((item) => item === document.activeElement)
          const nextIndex = event.key === 'ArrowDown'
            ? (currentIndex + 1) % items.length
            : (currentIndex - 1 + items.length) % items.length
          items[nextIndex]?.focus()
        }
        return
      }
      if (event.key === 'Escape') {
        close()
        return
      }
      if (!multiple) return
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [close, closeMenu, goNext, goPrev, menuPhase, multiple])

  useEffect(() => {
    if (menuPhase !== 'open') return
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (moreButtonRef.current?.contains(target) || menuRef.current?.contains(target)) return
      closeMenu()
    }
    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [closeMenu, menuPhase])

  useEffect(() => {
    closeMenu()
  }, [closeMenu, index])

  useEffect(() => {
    if (menuPhase !== 'open') return
    menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus()
  }, [menuPhase])

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

  const copyLink = async () => {
    closeMenu()
    const copied = await copyText(absoluteImageUrl(images[index]))
    showToast(copied ? 'Ссылка скопирована' : 'Не удалось скопировать ссылку')
  }

  const saveImage = async () => {
    closeMenu()
    const src = images[index]
    const fileName = imageFileName(src, title, index)
    try {
      const response = await fetch(src)
      if (!response.ok) throw new Error(String(response.status))
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      const link = document.createElement('a')
      link.href = src
      link.download = fileName
      link.target = '_blank'
      link.rel = 'noopener'
      link.click()
    }
    showToast('Фото сохраняется')
  }

  return (
    <div
      className={cn(styles.overlay, closing && styles.closing)}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Фотографии: ${title}` : 'Просмотр фотографий'}
      data-test-id="gallery-lightbox"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.backdrop} onClick={close} aria-hidden="true" />

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
          onClick={close}
          aria-label="Закрыть просмотр"
          data-test-id="gallery-lightbox-close"
        >
          <CloseIcon size={22} />
        </button>
      </header>

      <div
        className={styles.stage}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
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

        <div className={styles.menuWrap}>
          <button
            type="button"
            ref={moreButtonRef}
            className={styles.moreButton}
            onClick={menuPhase === 'open' ? closeMenu : openMenu}
            aria-label="Действия с фотографией"
            aria-haspopup="menu"
            aria-expanded={menuPhase === 'open'}
            data-test-id="gallery-lightbox-more"
          >
            <MoreIcon size={22} />
          </button>

          {menuPhase !== 'closed' && (
            <div
              ref={menuRef}
              className={cn(styles.menu, menuPhase === 'closing' && styles.menuClosing)}
              role="menu"
              aria-label="Действия с фотографией"
              data-test-id="gallery-lightbox-menu"
            >
              <button
                type="button"
                role="menuitem"
                className={styles.menuItem}
                onClick={() => void copyLink()}
                data-test-id="gallery-lightbox-copy-link"
              >
                <LinkIcon size={18} />
                <span>Скопировать ссылку</span>
              </button>
              <button
                type="button"
                role="menuitem"
                className={styles.menuItem}
                onClick={() => void saveImage()}
                data-test-id="gallery-lightbox-save"
              >
                <DownloadIcon size={18} />
                <span>Сохранить</span>
              </button>
            </div>
          )}
        </div>

        {toast !== null && (
          <div
            className={cn(styles.toast, toastClosing && styles.toastClosing)}
            role="status"
            data-test-id="gallery-lightbox-toast"
          >
            {toast}
          </div>
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
