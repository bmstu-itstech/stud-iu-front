import { AboutSection } from './sections/AboutSection'
import { ContactsSection } from './sections/ContactsSection'
import { DirectionsSection } from './sections/DirectionsSection'
import { NewsSection } from './sections/NewsSection'
import { PartnersSection } from './sections/PartnersSection'
import { PastEventsSection } from './sections/PastEventsSection'
import { UpcomingEventsSection } from './sections/UpcomingEventsSection'
import { FEATURE } from '@/config/featureFlags'

export function HomePage() {
  return (
    <>
      <AboutSection />
      {FEATURE.ENABLE_DIRECTIONS && <DirectionsSection />}
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
