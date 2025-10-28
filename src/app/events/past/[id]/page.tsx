'use client';
import { useParams } from 'next/navigation';

import { getPastEventById, PastEvent } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { Title } from '@/shared/ui/Typography';
import Carousel, { CarouselSkeleton } from '@/widgets/EventDetails';
import { FC } from 'react';
import Button from '@/shared/ui/Button';

const PastEventDetailsPage: FC = () => {
  const params = useParams();
  console.log(params);
  const eventId = Number(params.id);

  const { data: event, isLoading, isError } = useQuery<PastEvent, Error>({
    queryKey: ['pastEvent', eventId],
    queryFn: async () => {
      const response = await getPastEventById(eventId);
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
      <Button variant="white" size="primary">
        <Title level={5}>Обратная связь</Title>
      </Button>
    ),
    after: (
      <div className="flex flex-col gap-4">
        <Button variant="white" size="primary">
          <Title level={5}>Фотоальбом</Title>
        </Button>
        <Button variant="white" size="primary">
          <Title level={5}>Видеоотчёт</Title>
        </Button>
      </div>
    )
  }]} options={{ loop: false }} />;
};

export default PastEventDetailsPage;
