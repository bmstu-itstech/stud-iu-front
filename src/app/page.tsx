import About from '@/sections/About';
import Additional from '@/sections/Additional';
import Events from '@/sections/Events';
import News from '@/sections/News';
import EventsCarousel from '@/widgets/EventsCarousel';

export default function Home() {
  return (
    <div>
      <EventsCarousel />
      <About />
      <News />
      <Events />
      <Additional />
    </div>
  );
}
