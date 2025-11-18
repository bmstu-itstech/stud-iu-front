'use client';
import Image from 'next/image';
import { FC } from 'react';

import { Caption, Title } from '@/shared/ui/Typography';
import { FutureEvent } from '@/shared/api';
import { useRouter } from 'next/navigation';

type BaseProps = {
  mode?: 'full' | 'compact' | 'minified';
};

type LoadingProps = BaseProps & {
  loading: true;
};

type LoadedProps = BaseProps & {
  loading?: false;
} & FutureEvent;

type Props = LoadingProps | LoadedProps;

const EventCard: FC<Props> = (props) => {

  const router = useRouter();

  if (props.loading) {
    if (props.mode === 'compact') {
      return (
        <div className="rounded-3xl overflow-hidden max-w-220 w-[350px] h-[152px] flex bg-gray-200 animate-pulse">
          <div className="flex flex-col gap-4 p-6 flex-1 justify-center">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="bg-gray-300 rounded-3xl w-100 min-w-100 h-100 min-h-100 m-auto mr-6"></div>
        </div>
      );
    }

    if (props.mode === 'minified') {
      return (
        <div className="rounded-3xl bg-gray-200 overflow-hidden max-w-173 md:w-[270px] animate-pulse cursor-pointer">
          <div className="bg-gray-300 w-full h-[110px]"></div>
          <div className="py-6 px-4 flex justify-center items-center h-[96px]">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl bg-gray-200 overflow-hidden max-w-220 w-[350px] animate-pulse">
        <div className="bg-gray-300 w-full h-[110px]"></div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (props.mode === 'compact') {
    return (
      <div
        className="rounded-3xl overflow-hidden max-w-220 h-max max-h-100 flex cursor-pointer select-none"
        style={{ backgroundColor: props.color }}
        onClick={() => router.push(`/events/future/${props.id}`)}
      >
        <div className="flex flex-col gap-4 text-white p-6">
          <Title level={4}>{props.name}</Title>
          <Caption level={1}>{props.description}</Caption>
        </div>
        <Image
          width={460}
          height={220}
          alt="event cover"
          src={props.images?.[0]?.image || '/event.png'}
          className="rounded-3xl object-cover max-w-100 min-h-100"
        />
      </div>
    );
  }

  if (props.mode === 'minified') {
    return (
      <div className="rounded-3xl bg-white overflow-hidden max-w-173 max-sm:w-full cursor-pointer select-none" onClick={() => router.push(`/events/past/${props.id}`)}>
        <Image
          src={props.images?.[0]?.image || '/event.png'}
          width={460}
          height={240}
          className="object-cover w-full z-10 h-110"
          alt="event cover"
        />
        <div className="text-center font-bold flex justify-center items-center p-4 h-[96px]">
          <Title level={4} className="!text-[2rem] leading-tight">
            {props.name}
          </Title>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white overflow-hidden max-w-220 relative cursor-pointer select-none" onClick={() => router.push(`/events/past/${props.id}`)}>
      <Image
        src={props.images?.[0]?.image || '/event.png'}
        width={460}
        height={220}
        className="object-cover w-full z-10 h-110"
        alt="event cover"
      />
      <div
        className="absolute top-0 left-0 right-0 bottom-40"
        style={{
          backgroundImage: `linear-gradient(135deg, ${props.color}, rgba(0 0 0 / 0.4), rgba(0 0 0 / 0))`,
        }}
      />
      <Title level={4} className="absolute top-6 left-6 text-white z-20">
        {props.name}
      </Title>
      <div
        className="rounded-3xl text-center px-8 py-4 absolute bottom-46 left-6 z-20"
        style={{ backgroundColor: props.color }}
      >
        <Caption level={2} className="text-white">
          Как это было
        </Caption>
      </div>
      <div className="p-6 min-h-40">
        <Caption level={2}>{props.description}</Caption>
      </div>
    </div>
  );
};

export default EventCard;