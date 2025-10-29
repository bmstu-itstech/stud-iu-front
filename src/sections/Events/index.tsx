'use client';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFutureEvents, FutureEvent } from '@/shared/api';

import Button from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Typography';
import EventCard from './components/EventCard';

const Events: FC = () => {
  const { data: events, isLoading, isError, error } = useQuery<FutureEvent[], Error>({
    queryKey: ['futureEvents'], 
    queryFn: async () => {
      const response = await getFutureEvents({ limit: 6 });
      return response.data.results;
    },
    staleTime: 1000 * 60 * 5
  });

  if (isError) {
    return (
      <section id="events" className="flex justify-center items-center w-dvw mx-auto mt-24 sm:mt-48 px-6 pt-40 min-h-[400px]">
        <Text level={3} className="text-red-500">
          Не удалось загрузить события: {error.message}
        </Text>
      </section>
    );
  };

  if (isLoading) {
    return (
      <section
        id="events"
        className="bg-black flex flex-1 gap-16 flex-col w-dvw mx-auto mt-24 sm:mt-48 px-6 2xl:px-0 pt-40"
      >
        <div className="flex flex-col mx-auto max-w-primary gap-16">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-10">
            {Array.from({ length: 9 }).map((_, index) => <EventCard key={index} loading />)}
          </div>
          <Button variant="white" size="full">
            <Text level={4}>Все мероприятия</Text>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section
      id="events"
      className="bg-black flex flex-1 gap-16 flex-col w-dvw mx-auto mt-24 sm:mt-48 px-6 2xl:px-0 pt-40"
    >
      <div className="flex flex-col mx-auto max-w-primary gap-16">
        {events && events.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-10">
            {!isLoading && events.map((event) => (
              <EventCard
                key={event.id}
                {...event}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Text className='text-white'>Нет событий</Text>
          </div>
        )}

        <Button variant="white" size="full">
          <Text level={4}>Все мероприятия</Text>
        </Button>
      </div>
    </section>
  );
};

export default Events;