import About from '@/sections/About';
import Additional from '@/sections/Additional';
import Events from '@/sections/Events';
import News from '@/sections/News';
import Button from '@/shared/ui/Button';
import { Title } from '@/shared/ui/Typography';
import EventDetails from '@/widgets/EventDetails';

export default function Home() {
  return (
    <div>
      <EventDetails
        id="1"
        title="День программиста 2025"
        description="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        coverUrl="/images/cover.png"
        date={new Date('2025-09-01')}
        fillColor="blue"
        caption=""
        before={(
        <Button variant="white" size="primary">
          <Title level={5}>Зарегистрироваться</Title>
        </Button>)}
      />
      <About />
      <News />
      <Events />
      <Additional />
    </div>
  );
}
