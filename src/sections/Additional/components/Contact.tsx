import Image from 'next/image';
import { FC } from 'react';

import { Text, Title } from '@/shared/ui/Typography';
import { ContactProps } from '../contacts';

const Contact: FC<ContactProps> = ({ avatarUrl, name, role }) => {
    return (
        <div className="flex flex-col gap-8 items-center text-center group">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-white/30 transition-colors duration-300">
                <Image
                    src={avatarUrl}
                    alt={`Фото ${name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 288px, 384px"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Title level={3} className="text-white leading-tight">
                    {name}
                </Title>
                <Text level={4} className="text-white/60 font-medium">
                    {role}
                </Text>
            </div>
        </div>
    );
};

export default Contact;
