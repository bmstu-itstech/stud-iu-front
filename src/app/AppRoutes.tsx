import { Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'
import { EventPage } from '@/pages/event/EventPage'
import { HomePage } from '@/pages/home/HomePage'
import { JoinPage } from '@/pages/join/JoinPage'
import { NewsPage } from '@/pages/news/NewsPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { PastEventsPage } from '@/pages/past-events/PastEventsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/past" element={<PastEventsPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
