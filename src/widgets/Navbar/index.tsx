'use client';
import Link from 'next/link';
import { FC } from 'react';

import Button from '@/shared/ui/Button';
import { Caption } from '@/shared/ui/Typography';

import Links from './components/Links';
import Logo from './components/Logo';

const Navbar: FC<{}> = () => {
  return (
    <div className="bg-white flex justify-center items-center select-none">
      <div className="h-50 flex justify-between items-center w-primary px-3 2xl:px-0">
        <Link href="/">
          <Logo />
        </Link>
        <Links />
        <Button variant="black" size="inline">
          <Caption level={2} className="text-white">
            Стать активистом
          </Caption>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
