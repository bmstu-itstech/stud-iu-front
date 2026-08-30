import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
