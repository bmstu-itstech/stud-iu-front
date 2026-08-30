import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/app/AppRoutes'
import '@/assets/styles/tokens.css'
import '@/assets/styles/global.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Не найден root-элемент для монтирования приложения')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
