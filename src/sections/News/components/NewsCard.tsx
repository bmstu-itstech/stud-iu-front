import Image from 'next/image';
import { FC } from 'react';

import { Caption, Text, Title } from '@/shared/ui/Typography';
import { formatDate } from '@/shared/utils';

import { NewsItemProps } from '../news';

type Props = NewsItemProps;

const NewsCard: FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-4 w-full xl:max-w-300 2xl:max-w-350 mx-auto lg:mx-0">
      <Image
        src={props.coverUrl}
        width={700}
        height={360}
        className="object-cover rounded-3xl max-h-180 w-full"
        alt="news cover"
      />
      <div className="flex justify-between">
        <Title level={4}>{props.title}</Title>
        <Caption level={2} className="text-black/40">
          {formatDate(props.created)}
        </Caption>
      </div>
      <Text level={4}>{props.description}</Text>
    </div>
  );
};

export default NewsCard;
