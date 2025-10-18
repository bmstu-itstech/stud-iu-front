import Image from 'next/image';
import { FC } from 'react';

import { EventDTO } from '@/shared/dto';
import { Caption, Title } from '@/shared/ui/Typography';

type Props = EventDTO & {
  mode?: 'full' | 'compact' | 'minified';
};

const EventCard: FC<Props> = (props) => {
  if (props.mode === 'compact') {
    return (
      <div
        className="rounded-3xl overflow-hidden max-w-220 h-max flex cursor-pointer select-none"
        style={{ backgroundColor: props.fillColor }}
      >
        <div className="flex flex-col gap-4 text-white p-6">
          <Title level={4}>{props.title}</Title>
          <Caption level={1}>{props.caption}</Caption>
        </div>
        <Image
          width={460}
          height={220}
          alt="event cover"
          src={props.coverUrl}
          className="rounded-3xl object-cover max-w-100 min-h-100"
        />
      </div>
    );
  }

  if (props.mode === 'minified') {
    return (
      <div className="rounded-3xl bg-white overflow-hidden max-w-173 max-sm:max-w-full cursor-pointer select-none">
        <Image
          src={props.coverUrl}
          width={460}
          height={240}
          className="object-cover w-full z-10 h-110"
          alt="event cover"
        />
        <div className="text-center font-bold flex justify-center items-center">
          <Title level={4} className="!text-[3.5rem]">
            {props.title}
          </Title>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white overflow-hidden max-w-220 relative cursor-pointer select-none">
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
