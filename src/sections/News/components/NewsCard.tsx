import Image from 'next/image';
import { FC } from 'react';

import { Caption, Text, Title } from '@/shared/ui/Typography';
import { News } from '@/shared/api';

type LoadingProps = {
  loading: true;
};

type LoadedProps = {
  loading?: false;
} & News;

type Props = LoadingProps | LoadedProps;

const NewsCard: FC<Props> = (props) => {
  if (props.loading) {
    return (
      <div className="flex flex-col gap-4 w-full xl:max-w-300 2xl:max-w-350 mx-auto lg:mx-0 animate-pulse">
        <div className="bg-gray-200 rounded-3xl w-full h-180"></div>
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/5"></div>
        </div>
        <div className="space-y-2">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-8 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full xl:max-w-300 2xl:max-w-350 mx-auto lg:mx-0">
      <Image
        src={props.cover_url}
        width={700}
        height={360}
        className="object-cover rounded-3xl max-h-180 w-full"
        alt="news cover"
      />
      <div className="flex justify-between items-start">
        <Title level={4}>{props.title}</Title>
        <Caption level={2} className="text-black/40 whitespace-nowrap pl-2">
          {props.created_at}
        </Caption>
      </div>
      <Text level={4}>{props.description}</Text>
    </div>
  );
};

export default NewsCard;
