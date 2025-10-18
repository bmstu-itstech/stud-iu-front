import { events } from '@/shared/events';
import Carousel from '@/widgets/EventDetails';

export default function PastEvent() {
  return <Carousel slides={events} options={{ loop: true }} />;
}
