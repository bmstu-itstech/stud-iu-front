import { useState } from 'react'

import { MinusIcon, PlusIcon } from '@/components/icons'
import type { FaqEntry } from '@/types/domain'
import styles from './faq-list.module.css'

interface FaqListProps {
  items: FaqEntry[]
}

export function FaqList({ items }: FaqListProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <ul className={styles.list} data-test-id="faq-list">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <li key={item.id} className={styles.item}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
              data-test-id="faq-question"
            >
              <span>{item.question}</span>
              {open ? <MinusIcon size={20} /> : <PlusIcon size={20} />}
            </button>
            {open && (
              <p className={styles.answer} data-test-id="faq-answer">
                {item.answer}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
