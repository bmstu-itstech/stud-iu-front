import { useEffect } from 'react'

import { PartnersCarousel } from '@/components/partners/PartnersCarousel'
import { Button } from '@/components/ui/button/Button'
import { EmptyState } from '@/components/ui/empty-state/EmptyState'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'

export const PartnersSection = observer(function PartnersSection() {
  const { org } = stores

  useEffect(() => {
    void org.load()
  }, [org])

  const partners = org.info?.partners ?? []
  const loading = org.loading && partners.length === 0
  const failed = org.error !== null && partners.length === 0
  const empty = !loading && !failed && partners.length === 0

  return (
    <section className="container home-section" id="partners" data-test-id="partners-section">
      <h2 className="text-title text-title-center">Партнёры</h2>

      {loading && <p className="section-loading" data-test-id="section-loading">Загрузка…</p>}

      {failed && (
        <EmptyState
          dark
          title="Не удалось загрузить партнёров"
          description="Проверь соединение и попробуй ещё раз"
          action={
            <Button variant="secondary" onClick={() => void org.load(true)} testId="section-retry">
              Повторить
            </Button>
          }
          testId="section-error"
        />
      )}

      {empty && (
        <EmptyState
          dark
          title="Партнёров пока нет"
          description="Скоро расскажем о компаниях, которые нам помогают"
          testId="section-empty"
        />
      )}

      {partners.length > 0 && <PartnersCarousel partners={partners} />}
    </section>
  )
})
