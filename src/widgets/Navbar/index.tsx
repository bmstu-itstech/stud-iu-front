'use client'
import Link from 'next/link';
import type { FC } from 'react';

import Button from '@/shared/ui/Button';
import { Caption } from '@/shared/ui/Typography';
import Links from './components/Links';
import Image from 'next/image';
import { useModal } from '@/shared/context/ModalContext';

const Navbar: FC = () => {

    const { openJoinModal } = useModal();

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex justify-center items-center py-6">
                <div className="flex justify-between items-center w-full max-w-primary px-6">

                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Image src="/icons/logo.svg" width={140} height={40} alt="СтудИУ" priority />
                    </Link>

                    <Links />

                    <Button variant="black" size="inline" className="hidden sm:flex" onClick={openJoinModal}>
                        <Caption level={2} className="text-white">
                            Стать активистом
                        </Caption>
                    </Button>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
