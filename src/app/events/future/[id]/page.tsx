'use client';
import { useParams } from 'next/navigation';
import { FutureEvent, getFutureEventById } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { Text, Title } from '@/shared/ui/Typography';
import Carousel, { CarouselSkeleton } from '@/widgets/EventDetails';
import { FC } from 'react';
import Button from '@/shared/ui/Button';

const PastEventDetailsPage: FC = () => {
  const params = useParams();
  console.log(params);
  const eventId = Number(params.id);

  const {
    data: event, 
    isLoading, 
    isError
  } = useQuery<FutureEvent, Error>({
    queryKey: ['futureEvent', eventId],
    queryFn: async () => {
      const response = await getFutureEventById(eventId);
      return response.data;
    },
    enabled: !isNaN(eventId),
  });

  if (isLoading || isNaN(eventId)) {
    return <CarouselSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-(6.25rem*2))]">
        <Title className="text-red-500">Не удалось загрузить мероприятие.</Title>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-(6.25rem*2))]">
        <Title className="text-black">Мероприятие не найдено.</Title>
      </div>
    );
  }

  return <Carousel slides={[{
          ...event,
          before: (
            <Button variant="white" size="primary" onClick={() => window.location.href = event.registration_link as string}>
              <Title level={5}>Зарегистрироваться</Title>
            </Button>
          ),
          after: (
            <Text className="text-white/70" level={1}>
              Конгресс-центр
            </Text>
          )
  }]} options={{ loop: false }} />;
};

export default PastEventDetailsPage;
