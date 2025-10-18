import About from '@/sections/About';
import Additional from '@/sections/Additional';
import Events from '@/sections/Events';
import News from '@/sections/News';
import { events } from '@/shared/events';
import Carousel from '@/widgets/EventDetails';

export default function Home() {
  return (
    <div>
      <Carousel slides={events} options={{ loop: true }} />
      <About />
      <News />
      <Events />
      <Additional />
    </div>
  );
}
