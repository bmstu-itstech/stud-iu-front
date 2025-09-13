import Link from 'next/link';
import { FC } from 'react';

import Button from '@/shared/ui/Button';
import { Text, Title } from '@/shared/ui/Typography';

import { CardProps } from '../cards.props';

type Props = CardProps;

const Card: FC<Props> = (props) => {
  return (
    <div className="bg-blue-primary rounded-3xl p-8 min-w-full sm:min-w-238 max-w-full flex flex-col">
      <Title level={3} className="text-white">
        {props.title}
      </Title>
      <Text level={4} className="text-white/70">
        {props.description}
      </Text>
      <Link href={props.href} className="mt-auto pt-8 flex">
        <Button variant="white" size="full">
          <Text level={4}>{props.caption}</Text>
        </Button>
      </Link>
    </div>
  );
};

export default Card;
