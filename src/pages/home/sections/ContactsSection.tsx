import { useEffect } from 'react'

import { ContactCard } from '@/components/cards/ContactCard'
import { Button } from '@/components/ui/button/Button'
import { EmptyState } from '@/components/ui/empty-state/EmptyState'
import { stores } from '@/stores'
import { observer } from 'mobx-react-lite'
import styles from './contacts-section.module.css'

export const ContactsSection = observer(function ContactsSection() {
  const { org } = stores

  useEffect(() => {
    void org.load()
  }, [org])

  const contacts = org.info?.contacts ?? []
  const loading = org.loading && contacts.length === 0
  const failed = org.error !== null && contacts.length === 0
  const empty = !loading && !failed && contacts.length === 0

  return (
    <section className="container home-section" id="contacts" data-test-id="contacts-section">
      <h2 className="text-title text-title-center">Контакты</h2>

      {loading && <p className="section-loading" data-test-id="section-loading">Загрузка…</p>}

      {failed && (
        <EmptyState
          dark
          title="Не удалось загрузить контакты"
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
          title="Контакты пока не заполнены"
          description="Загляни позже — мы добавим способы связи"
          testId="section-empty"
        />
      )}

      {contacts.length > 0 && (
        <div className={styles.list}>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </section>
  )
})
