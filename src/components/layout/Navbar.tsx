import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import closeIcon from '@/assets/icons/close.svg'
import burgerIcon from '@/assets/icons/burger.svg'
import externalLinkIcon from '@/assets/icons/external-link.svg'
import { Button } from '@/components/ui/button/Button'
import { Logo } from './Logo'
import styles from './navbar.module.css'

interface MenuItem {
  label: string
  to: string
  testId?: string
  external?: boolean
}

const DESKTOP_MENU: MenuItem[] = [
  { label: 'О нас', to: '/#about' },
  { label: 'Новости', to: '/#news' },
  { label: 'Мероприятия', to: '/#events' },
  { label: 'Контакты', to: '/#contacts' },
]

const MOBILE_MENU: MenuItem[] = [
  {
    label: 'Стать активистом',
    to: '/join',
    testId: 'navbar-menu-link-join',
    external: true,
  },
  ...DESKTOP_MENU,
]

const CTA_TEST_ID = 'navbar-cta'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className={styles.header} data-test-id="navbar">
      <div className={`container ${styles.inner}`}>
        <Logo testId="navbar-logo" />

        <nav className={styles.menuDesktop} aria-label="Основное меню">
          {DESKTOP_MENU.map((item) => (
            <Link key={item.to} to={item.to} className={styles.menuLink} data-test-id="navbar-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.ctaDesktop}>
          <Button to="/join" testId={CTA_TEST_ID}>
            Стать активистом
          </Button>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          data-test-id="navbar-burger"
        >
          <img src={burgerIcon} width={32} height={32} alt="" />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.overlay} data-test-id="navbar-menu">
          <div className={`container ${styles.overlayInner}`}>
            <div className={styles.overlayHeader}>
              <Logo testId="navbar-menu-logo" />
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Закрыть меню"
                onClick={() => setMenuOpen(false)}
                data-test-id="navbar-menu-close"
              >
                <img src={closeIcon} width={32} height={32} alt="" />
              </button>
            </div>

            <ul className={styles.overlayMenu}>
              {MOBILE_MENU.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={styles.overlayLink}
                    data-test-id={item.testId ?? 'navbar-menu-link'}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.external && (
                      <img
                        src={externalLinkIcon}
                        width={12}
                        height={12}
                        alt=""
                        className={styles.overlayLinkIcon}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
