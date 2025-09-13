import { FC } from 'react';

import Button from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Typography';

import EventCard from './components/EventCard';
import events from './events.usecase';

const Events: FC<{}> = () => {
  return (
    <section
      id="events"
      className="bg-black flex flex-1 gap-16 flex-col w-dvw mx-auto mt-24 sm:mt-48 px-6 2xl:px-0 pt-40"
    >
      <div className="flex flex-col mx-auto max-w-primary gap-16">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-10">
          {events.map((event) => (
            <EventCard {...event} key={event.id} />
          ))}
        </div>
        <Button variant="white" size="full">
          <Text level={4}>Все мероприятия</Text>
        </Button>
      </div>
    </section>
  );
};

export default Events;
