import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import closeIcon from '@/assets/icons/close.svg'
import burgerIcon from '@/assets/icons/burger.svg'
import externalLinkIcon from '@/assets/icons/external-link.svg'
import { Button } from '@/components/ui/button/Button'
import { cn } from '@/utils/cn'
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
const MENU_CLOSE_ANIMATION_MS = 200

type MenuState = 'closed' | 'open' | 'closing'

export function Navbar() {
  const [menuState, setMenuState] = useState<MenuState>('closed')
  const location = useLocation()

  const closeMenuAnimated = useCallback(() => {
    setMenuState((state) => (state === 'open' ? 'closing' : state))
  }, [])

  const closeMenuInstant = useCallback(() => setMenuState('closed'), [])

  useEffect(() => {
    if (menuState !== 'closing') return
    const timer = window.setTimeout(() => setMenuState('closed'), MENU_CLOSE_ANIMATION_MS)
    return () => window.clearTimeout(timer)
  }, [menuState])

  useEffect(() => {
    setMenuState('closed')
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (menuState === 'closed') return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuState((state) => (state === 'open' ? 'closing' : state))
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuState])

  useEffect(() => {
    if (menuState === 'closed') return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuState])

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
          aria-expanded={menuState === 'open'}
          onClick={() => setMenuState('open')}
          data-test-id="navbar-burger"
        >
          <img src={burgerIcon} width={32} height={32} alt="" />
        </button>
      </div>

      {menuState !== 'closed' && (
        <div
          className={cn(styles.overlay, menuState === 'closing' && styles.overlayClosing)}
          data-test-id="navbar-menu"
        >
          <div className={`container ${styles.overlayInner}`}>
            <div className={styles.overlayHeader}>
              <Logo testId="navbar-menu-logo" />
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Закрыть меню"
                onClick={closeMenuAnimated}
                data-test-id="navbar-menu-close"
              >
                <img src={closeIcon} width={32} height={32} alt="" />
              </button>
            </div>

            <ul className={styles.overlayMenu}>
              {MOBILE_MENU.map((item, index) => (
                <li key={item.to} style={{ animationDelay: `${index * 30}ms` }}>
                  <Link
                    to={item.to}
                    className={styles.overlayLink}
                    data-test-id={item.testId ?? 'navbar-menu-link'}
                    onClick={closeMenuInstant}
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
