'use client';

import { useQuery } from '@tanstack/react-query';

import { getFutureEvents, getPastEvents, FutureEvent } from '@/shared/api';
import EventCard from '@/sections/Events/components/EventCard';
import { Text, Title } from '@/shared/ui/Typography';
import { useHorizontalScroll } from '@/shared/utils';

export default function Events() {
  const scrollRef = useHorizontalScroll();

  const {
    data: futureEvents,
    isLoading: isLoadingFuture,
    isError: isErrorFuture,
  } = useQuery<FutureEvent[], Error>({
    queryKey: ['futureEvents'],
    queryFn: () => getFutureEvents({ limit: 10 }).then((res) => res.data.results),
  });

  const {
    data: pastEvents,
    isLoading: isLoadingPast,
    isError: isErrorPast,
  } = useQuery({
    queryKey: ['pastEvents'],
    queryFn: () => getPastEvents({ limit: 6 }).then((res) => res.data.results),
  });

  return (
    <>
      <section className="flex flex-1 max-sm:flex-col gap-30 w-dvw mx-auto px-6 2xl:px-0 max-w-primary pb-24">
        <div className="flex flex-col gap-4 max-w-250">
          <Title level={2} className="leading-none">
            Будущие мероприятия
          </Title>
          <Text level={2}>Регистрируйтесь на наши новые мероприятия</Text>
        </div>

        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pb-4 snap-x snap-mandatory min-h-[150px]"
        >
          {isLoadingFuture
            ?
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 snap-start">
                  <EventCard loading mode="compact" />
                </div>
              ))
            : isErrorFuture
            ? <Text className="text-red-500">Не удалось загрузить мероприятия.</Text>
            : futureEvents?.map((event) => (
                <div key={event.id} className="flex-shrink-0 snap-start">
                  <EventCard mode="compact" {...event} />
                </div>
              ))}
        </div>
      </section>

      <section className="flex flex-1 py-12 gap-30 w-dvw mx-auto px-6 2xl:px-0 bg-gradient-to-b from-blue-primary via-blue-primary via-60% to-black">
        <div className="flex flex-col flex-1 max-w-primary mx-auto">
          <Title level={2} className="text-white">
            Прошедшие мероприятия
          </Title>
          <div className="flex flex-wrap gap-8 mt-12 justify-center items-center min-h-[200px]">
            {isLoadingPast
              ?
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-fit">
                    <EventCard loading mode="minified" />
                  </div>
                ))
              : isErrorPast
              ? <Text className="text-gray-300">Не удалось загрузить мероприятия.</Text>
              : pastEvents?.map((event) => (
                  <div key={event.id} className="w-fit">
                    <EventCard mode="minified" {...event} />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};
