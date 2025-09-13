import Image from 'next/image';
import { FC } from 'react';

import { Text, Title } from '@/shared/ui/Typography';

import { ContactProps } from '../contacts';

type Props = ContactProps;

const Contact: FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-4 max-w-[clamp(calc(12.5rem*2), 5vw, calc(18rem*2))] items-center">
      <Image
        src={props.avatarUrl}
        alt="contact avatar"
        width={360}
        height={360}
        className="rounded-full mx-auto max-w-[36rem]"
      />
      <Title level={3} className="text-white text-center max-w-[36rem]">
        {props.name}
      </Title>
      <Text className="text-white/70 text-center max-w-[36rem]">
        {props.role}
      </Text>
    </div>
  );
};

export default Contact;
