import { events } from '@/shared/events';
import Carousel from '@/widgets/EventDetails';

export default function FutureEvent() {
  return <Carousel slides={events} options={{ loop: true }} />;
}
