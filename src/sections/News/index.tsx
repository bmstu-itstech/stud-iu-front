import { FC } from 'react';

import Button from '@/shared/ui/Button';
import { Text, Title } from '@/shared/ui/Typography';

import NewsCard from './components/NewsCard';
import news from './news';

const News: FC<{}> = () => {
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
        {news
          .sort((a, b) => b.created.getTime() - a.created.getTime())
          .map((newsItem) => (
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
