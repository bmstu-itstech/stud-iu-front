import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from '@/shared/ui/Typography';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

const Field: FC<FieldProps> = (props) => {
  return (
    <div
      {...props}
      className={twMerge('flex flex-col sm:gap-8 max-w-170', props.className)}
    >
      <Text level={4} className="text-white/70">
        {props.label}
      </Text>
      <Text className="text-white">{props.value}</Text>
    </div>
  );
};

export default Field;
