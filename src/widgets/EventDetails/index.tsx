import Image from 'next/image';
import { FC, ReactNode } from 'react';

import { EventDTO } from '@/shared/dto';
import { Text, Title } from '@/shared/ui/Typography';

type Props = EventDTO & {
  before?: ReactNode;
  after?: ReactNode;
  status?: string;
  details?: string[];
};

const Carousel: FC<Props> = (props) => {
  return (
    <section
      id="carousel"
      className="relative w-full h-[calc(100dvh-(6.25rem*2))] flex justify-center select-none"
    >
      <Image
        src={props.coverUrl}
        width={1920}
        height={980}
        className="absolute inset-0 object-cover brightness-80 h-full w-full"
        alt="event cover"
      />
      <div className="absolute inset-0 w-full z-2 bg-linear-180 from-black/0 via-black/0 to-blue-primary" />
      <div className="flex flex-col flex-1 max-w-primary px-3 2xl:px-0 py-10 sm:py-18 gap-4 sm:gap-10 z-10">
        {props.details && (
          <div className="flex justify-between">
            {props.details.map((detail) => (
              <Text className="text-white/70" key={detail}>
                {detail}
              </Text>
            ))}
          </div>
        )}
        <div className="flex gap-8 items-center">
          <Title className="text-white">{props.title}</Title>
          {props.status && (
            <div
              className={`${props.status === 'Завершено' ? 'bg-[#bbff3a]' : 'bg-blue-primary'} rounded-2xl px-8 py-4 h-fit`}
            >
              <Text
                level={4}
                className={`!text-4xl !font-medium ${props.status === 'Завершено' ? 'text-black' : 'text-white'}`}
              >
                {props.status}
              </Text>
            </div>
          )}
        </div>
        <Text level={2} className="text-white/80">
          {props.description}
        </Text>
        <div className="flex max-w-primary mt-auto justify-between mb-6 sm:mb-0 items-end">
          {props.before}
          {props.after}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
