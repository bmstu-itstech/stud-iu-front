import Link from 'next/link';
import { FC } from 'react';

import { Caption } from '@/shared/ui/Typography';

import { LinkProps } from '../links';

type Props = LinkProps;

const CLink: FC<Props> = ({ label, href }) => {
  return (
    <Link href={href}>
      <Caption className="text-black/40 cursor-pointer hover:text-black/60 transition-colors duration-300 ease-in">
        {label}
      </Caption>
    </Link>
  );
};

export default CLink;
