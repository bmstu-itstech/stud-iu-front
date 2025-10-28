'use client';

import { FutureEvent, getFutureEvents } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import Carousel, { CarouselSkeleton } from '../EventDetails';
import { Text, Title } from '@/shared/ui/Typography';
import Button from '@/shared/ui/Button';

const EventsCarousel: FC = () => {
  const { data: slides, isLoading, isError } = useQuery<FutureEvent[], Error>({
    queryKey: ['futureEventsCarousel'],
    queryFn: () => getFutureEvents({ limit: 5 }).then((res) => res.data.results),
  });

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-(6.25rem*2))]">
        <Title className="text-red-500">Не удалось загрузить мероприятия.</Title>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-(6.25rem*2))]">
        <Title className="text-black">Предстоящих мероприятий нет.</Title>
      </div>
    );
  }

  return <Carousel slides={slides.map(slide => {
    return {
          ...slide,
          before: (
            <Button
              variant="white"
              size="primary"
              onClick={() => 
                (window.location.href = slide.registration_link as string)
              }
            >
              <Title level={5}>Зарегистрироваться</Title>
            </Button>
          ),
          after: (
            <Text className="text-white/70" level={1}>
              Конгресс
            </Text>
          )
    }
  })} options={{ loop: true }} />;
};

export default EventsCarousel;
