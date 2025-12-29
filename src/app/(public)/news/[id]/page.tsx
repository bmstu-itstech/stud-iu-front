'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useNewsDetails } from '@/shared/hooks/useNews';
import { Title, Text, Caption } from '@/shared/ui/Typography';
import Button from '@/shared/ui/Button';
import { formatDate } from '@/shared/utils';
import { getImageUrl } from '@/shared/utils/getImageUrl';

export default function NewsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const newsId = params?.id ? Number(params.id) : NaN;

    const { data: news, isLoading, isError } = useNewsDetails(newsId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError || !news) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <Title>Новость не найдена</Title>
                <Button variant="black" onClick={() => router.push('/news')}>
                    <Text level={4}>Ко всем новостям</Text>
                </Button>
            </div>
        );
    }

    return (
        <article className="flex flex-col w-full mx-auto px-6 2xl:px-0 max-w-primary py-12 pb-24 gap-10">
            <Button variant="outline" size="sm" onClick={() => router.back()} className="w-fit">
                ← Назад
            </Button>

            <div className="w-full aspect-video relative rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm">
                <Image
                    src={getImageUrl(news.cover_url)}
                    fill
                    className="object-cover"
                    alt={news.title}
                    priority
                />
            </div>

            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                    <Caption className="text-gray-400 font-bold uppercase tracking-wider">
                        {formatDate(news.created_at)}
                    </Caption>
                    <Title level={1} className="leading-tight">
                        {news.title}
                    </Title>
                </div>

                <div className="prose prose-lg prose-blue max-w-none">
                    <Text level={2} className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {news.description}
                    </Text>
                </div>
            </div>
        </article>
    );
}
