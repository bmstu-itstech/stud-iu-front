import Image from 'next/image';
import type { FC } from 'react';

import { Caption, Text, Title } from '@/shared/ui/Typography';
import type { News } from '@/shared/api';
import { formatDate } from '@/shared/utils';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/shared/utils/getImageUrl';

type Props = News & {
    mode?: 'default' | 'preview';
};

const NewsCard: FC<Props> = ({ mode = 'default', ...props }) => {
    const isPreview = mode === 'preview';
    const imageUrl = getImageUrl(props.cover_url);

    return (
        <div
            className={cn(
                "flex flex-col gap-5 w-full group cursor-pointer h-full",
                isPreview
                    ? "max-w-[380px] mx-auto bg-white rounded-[2rem] shadow-sm p-5"
                    : "w-full"
            )}
        >
            <div className="overflow-hidden rounded-[2rem] relative w-full bg-gray-100">
                <Image
                    src={imageUrl}
                    width={800}
                    height={400}
                    className={cn(
                        "object-cover w-full transition-transform duration-500 group-hover:scale-105",
                        isPreview
                            ? "h-[220px]"
                            : "h-[240px] sm:h-[280px]"
                    )}
                    alt={props.title}
                />
            </div>

            <div className="flex flex-col gap-3 px-1">
                <div className="flex justify-between items-start gap-4">
                    <Title level={4} className="leading-tight line-clamp-2 font-bold">
                        {props.title}
                    </Title>
                    <Caption level={2} className="text-gray-400 whitespace-nowrap pt-1">
                        {formatDate(props.created_at)}
                    </Caption>
                </div>

                <Text level={4} className="text-gray-600 line-clamp-3 leading-relaxed">
                    {props.description}
                </Text>
            </div>
        </div>
    );
};

export default NewsCard;
