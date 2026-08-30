import { AboutSection } from './sections/AboutSection'
import { ContactsSection } from './sections/ContactsSection'
import { NewsSection } from './sections/NewsSection'
import { PartnersSection } from './sections/PartnersSection'
import { PastEventsSection } from './sections/PastEventsSection'
import { UpcomingEventsSection } from './sections/UpcomingEventsSection'

export function HomePage() {
  return (
    <>
      <AboutSection />
      <UpcomingEventsSection />
      <NewsSection />
      <PastEventsSection />
      <div className="gradient-band">
        <PartnersSection />
        <ContactsSection />
      </div>
    </>
  )
}
