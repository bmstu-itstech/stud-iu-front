import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowLeftIcon } from '@/components/icons'
import { Button } from '@/components/ui/button/Button'
import { GalleryLightbox } from '@/components/event/GalleryLightbox'
import { FaqList } from '@/components/event/FaqList'
import { RegistrationCard } from '@/components/event/RegistrationCard'
import { SpeakerCard } from '@/components/cards/SpeakerCard'
import { useMediaQuery } from '@/hooks/use-media-query'
import { stores } from '@/stores'
import type { EventItem } from '@/types/domain'
import styles from './event-page.module.css'

export function EventPage() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<EventItem | undefined | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    let cancelled = false
    setEvent(null)
    void stores.events.loadEvent(id ?? '').then((data) => {
      if (!cancelled) setEvent(data ?? undefined)
    })
    return () => {
      cancelled = true
    }
  }, [id])

  if (event === null) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p data-test-id="page-loading">Загрузка…</p>
        </div>
      </div>
    )
  }

  if (event === undefined) {
    return (
      <div className={styles.page}>
        <div className="container">
          <h1 className="text-title">Мероприятие не найдено</h1>
          <p className={styles.description}>
            Возможно, оно ещё не опубликовано или уже прошло.{' '}
            <Link to="/" className={styles.link} data-test-id="back-home-link">
              На главную
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const registration = event.registration
  const isPast = event.status === 'far'
  const registrationWidget =
    registration !== undefined ? (
      <RegistrationCard registration={registration} />
    ) : event.registrationLink !== undefined || isPast ? (
      <div className={styles.registrationLinkCard} data-test-id="event-register">
        <h2 className={styles.registrationLinkTitle}>Регистрация</h2>
        <div className={styles.registrationLinkRow}>
          <span className={styles.registrationLinkLabel}>Дата начала</span>
          <span className={styles.registrationLinkValue}>{event.startAt}</span>
        </div>
        {event.endAt !== undefined && (
          <div className={styles.registrationLinkRow}>
            <span className={styles.registrationLinkLabel}>Дата завершения</span>
            <span className={styles.registrationLinkValue}>{event.endAt}</span>
          </div>
        )}
        {event.registrationLink !== undefined ? (
          <Button
            href={event.registrationLink}
            target="_blank"
            rel="noreferrer"
            fullWidth
            testId="event-register-button"
          >
            Зарегистрироваться
          </Button>
        ) : (
          <Button disabled fullWidth testId="event-register-button">
            Регистрация завершена
          </Button>
        )}
      </div>
    ) : null
  const showTopRegistration =
    isMobile &&
    registrationWidget !== null &&
    !isPast &&
    (!registration || !registration.expired)

  return (
    <div className={styles.page} data-test-id="event-page">
      <div className="container">
        <Link to="/" className={styles.back} data-test-id="event-back">
          <ArrowLeftIcon size={20} />
          Назад
        </Link>

        <div className={styles.layout}>
          <div className={styles.main}>
            <h1 className="text-title" data-test-id="event-title">
              {event.title}
            </h1>
            {event.shortDescription !== '' && (
              <p className={styles.shortDescription}>{event.shortDescription}</p>
            )}

            {showTopRegistration && registrationWidget}

            {(event.extendedDescription !== undefined || event.description !== '') && (
              <section className={styles.block}>
                <h2 className="text-subtitle">О мероприятии</h2>
                <p className={styles.description}>
                  {event.extendedDescription ?? event.description}
                </p>
              </section>
            )}

            {event.status === 'far' && event.gallery && event.gallery.length > 0 && (
              <section className={styles.block} data-test-id="event-gallery">
                <h2 className="text-subtitle">Как это было</h2>
                <div className={styles.gallery}>
                  {event.gallery.map((image, index) => (
                    <button
                      key={`${event.id}-gallery-${index}`}
                      type="button"
                      className={styles.galleryItem}
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Фото ${index + 1} — открыть просмотр`}
                      data-test-id="gallery-image"
                    >
                      <img
                        src={image}
                        alt={`Фото ${index + 1}`}
                        className={styles.galleryImage}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
                {event.albumLink !== undefined && (
                  <a
                    href={event.albumLink}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.albumLink}
                    data-test-id="event-album-link"
                  >
                    Смотреть фотоальбом
                  </a>
                )}
              </section>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <section className={styles.block}>
                <h2 className="text-subtitle">Спикеры и организаторы</h2>
                <div className={styles.speakers}>
                  {event.speakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                  ))}
                </div>
              </section>
            )}

            {event.faq && event.faq.length > 0 && (
              <section className={styles.block}>
                <h2 className="text-subtitle">FAQ</h2>
                <FaqList items={event.faq} />
              </section>
            )}
          </div>

          {registrationWidget && !showTopRegistration && registrationWidget}
        </div>
      </div>

      {lightboxIndex !== null && event.gallery && (
        <GalleryLightbox
          images={event.gallery}
          initialIndex={lightboxIndex}
          title={event.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
