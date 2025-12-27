'use client';
import Image from 'next/image';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Caption, Title } from '@/shared/ui/Typography';
import type { FutureEvent } from '@/shared/api';

type Props = FutureEvent & {
    mode?: 'full' | 'compact' | 'minified';
};

const EventCard: FC<Props> = ({ mode = 'full', ...props }) => {
    const router = useRouter();
    const imageUrl = props.images?.[0]?.image || '/event.png';

    const handleClick = () => {
        const path = mode === 'compact' ? 'future' : 'past';
        router.push(`/events/${path}/${props.id}`);
    };

    if (mode === 'compact') {
        return (
            <div
                onClick={handleClick}
                className="rounded-3xl overflow-hidden w-full max-w-220 min-w-[300px] h-full flex cursor-pointer select-none transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: props.color || 'var(--color-blue-primary)' }}
            >
                <div className="flex flex-col gap-4 text-white p-6 flex-1 justify-center">
                    <Title level={4}>{props.name}</Title>
                    <Caption level={1} className="line-clamp-2 text-white/80">{props.description}</Caption>
                </div>
                <Image
                    width={150}
                    height={150}
                    alt={props.name}
                    src={`/api/storage/${imageUrl}`}
                    className="rounded-3xl object-cover w-[100px] h-[100px] my-auto mr-6 bg-white/10 shrink-0 self-center"
                />
            </div>
        );
    }

    if (mode === 'minified') {
        return (
            <div
                onClick={handleClick}
                className="rounded-[2.5rem] bg-white overflow-hidden w-full aspect-[3/4] relative cursor-pointer select-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
                <Image
                    src={`/api/storage/${imageUrl}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={props.name}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                    <Title level={4} className="text-white leading-tight line-clamp-2 drop-shadow-md">
                        {props.name}
                    </Title>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={handleClick}
            className="rounded-[2rem] bg-white overflow-hidden w-full min-w-[320px] max-w-220 relative cursor-pointer select-none group shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="h-110 relative w-full">
                <Image src={`/api/storage/${imageUrl}`} fill className="object-cover z-10" alt={props.name} />

                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(135deg, ${props.color}, rgba(0,0,0,0) 90%)`,
                    }}
                />

                <Title level={4} className="absolute top-8 left-8 text-white z-20 max-w-[85%] break-words leading-tight">
                    {props.name}
                </Title>

                <div
                    className="absolute bottom-6 left-8 z-20 rounded-2xl px-6 py-3 shadow-lg"
                    style={{ backgroundColor: props.color }}
                >
                    <Caption level={2} className="text-white font-bold whitespace-nowrap">
                        Как это было
                    </Caption>
                </div>
            </div>

            <div className="p-8 bg-gray-50 min-h-35">
                <Caption level={2} className="text-gray-600 line-clamp-3 break-words text-base leading-relaxed">
                    {props.description}
                </Caption>
            </div>
        </div>
    );
};

export default EventCard;
