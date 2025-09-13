import About from '@/sections/About';
import Additional from '@/sections/Additional';
import Carousel from '@/sections/Carousel';
import Events from '@/sections/Events';
import News from '@/sections/News';

export default function Home() {
  return (
    <div>
      <Carousel
        id="1"
        title="День программиста 2025"
        description="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        coverUrl="/images/cover.png"
        date={new Date('2025-09-01')}
        fillColor="blue"
        caption=""
      />
      <About />
      <News />
      <Events />
      <Additional />
    </div>
  );
}
