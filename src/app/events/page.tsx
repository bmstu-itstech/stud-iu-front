'use client';
import EventCard from '@/sections/Events/components/EventCard';
import events from '@/sections/Events/events.usecase';
import { Text, Title } from '@/shared/ui/Typography';
import { useHorizontalScroll } from '@/shared/utils';

export default function Events() {
  const scrollRef = useHorizontalScroll();

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
          className="
            flex
            items-center
            gap-6
            overflow-x-auto
            scrollbar-thin
            scrollbar-thumb-gray-400
            scrollbar-track-transparent
            pb-4
            snap-x
            snap-mandatory
          "
        >
          {events.map((event) => (
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
          <div className="flex flex-wrap gap-8 mt-12 justify-center items-center">
            {events.map((event) => (
              <div key={event.id + 1000} className=" w-fit">
                <EventCard mode="minified" {...event} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
