import { useEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'

import { Footer } from './Footer'
import { Navbar } from './Navbar'
import styles from './layout.module.css'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    if (navigationType === 'POP') {
      const state = window.history.state?.usr as { scrollY?: number } | undefined
      const savedY = state?.scrollY
      if (typeof savedY === 'number') {
        window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior })
        return
      }
    }

    window.scrollTo({ top: 0 })
  }, [pathname, hash, navigationType])

  return null
}

export function Layout() {
  return (
    <div className={styles.page}>
      <ScrollManager />
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
