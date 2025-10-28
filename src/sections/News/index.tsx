'use client';

import { FC, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getNews, News as NewsType } from '@/shared/api';

import Button from '@/shared/ui/Button';
import { Text, Title } from '@/shared/ui/Typography';
import NewsCard from './components/NewsCard';

const News: FC<{}> = () => {
  const {
    data: news,
    isLoading,
    isError,
  } = useQuery<NewsType[], Error>({
    queryKey: ['newsList'],
    queryFn: () => getNews({ limit: 3 }).then((res) => res.data.results),
  });

  const sortedNews = useMemo(() => {
    if (!news) return [];
    return news
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [news]);

  return (
    <section
      id="news"
      className="flex flex-1 gap-16 flex-col w-dvw mx-auto mt-24 sm:mt-48 px-6 2xl:px-0 max-w-primary"
    >
      <div className="flex flex-wrap gap-10 2xl:gap-20">
        <div className="flex flex-col gap-10 w-full 2xl:w-350 2xl:max-w-350">
          <Title>Наши новости</Title>
          <Text>
            Здесь вы можете найти наши новости, а также информацию о том, какой
            корм обожает Тимоша по субботам
          </Text>
        </div>

        {isLoading
          ? 
            Array.from({ length: 3 }).map((_, index) => (
              <NewsCard key={index} loading />
            ))
          : isError
          ? 
            <div className="flex items-center justify-center flex-1">
              <Text className="text-red-500">Не удалось загрузить новости.</Text>
            </div>
          : 
            sortedNews.map((newsItem) => (
              <NewsCard {...newsItem} key={newsItem.id} />
            ))}
      </div>
      <Button variant="black" size="full">
        <Text level={4}>Смотреть все</Text>
      </Button>
    </section>
  );
};

export default News;
