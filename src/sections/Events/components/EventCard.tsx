import Image from 'next/image';
import { FC } from 'react';

import { EventDTO } from '@/shared/dto';
import { Caption, Title } from '@/shared/ui/Typography';

type Props = EventDTO;

const EventCard: FC<Props> = (props) => {
  return (
    <div className="rounded-3xl bg-white overflow-hidden max-w-220 relative">
      <Image
        src={props.coverUrl}
        width={460}
        height={220}
        className="object-cover w-full z-10 h-110"
        alt="event cover"
      />
      <div
        className="absolute top-0 left-0 right-0 bottom-40"
        style={{
          backgroundImage: `linear-gradient(135deg, ${props.fillColor}, rgba(0 0 0 / 0.4), rgba(0 0 0 / 0))`,
        }}
      />
      <Title level={4} className="absolute top-6 left-6 text-white z-20">
        {props.title}
      </Title>
      <div
        className="rounded-3xl text-center px-8 py-4 absolute bottom-46 left-6 z-20"
        style={{ backgroundColor: props.fillColor }}
      >
        <Caption level={2} className="text-white">
          Как это было
        </Caption>
      </div>
      <div className="p-6 min-h-40">
        <Caption level={2}>{props.caption}</Caption>
      </div>
    </div>
  );
};

export default EventCard;
