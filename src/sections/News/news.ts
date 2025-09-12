export interface NewsItemProps {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  created: Date;
};

const news: NewsItemProps[] = [
  {
    id: '1',
    title: 'Выборы председателя',
    description: 'Председателем ССФ ИУ выбрана Анастасия Евдокимова',
    coverUrl: '/images/evdokimova.png',
    created: new Date('2023-08-08')
  },
  {
    id: '2',
    title: 'Выборы кота',
    description: 'Председателем Отдела вайба выбран Тимоша',
    coverUrl: '/images/timosha.jpeg',
    created: new Date('2024-01-01')
  },
  {
    id: '3',
    title: 'Выборы в ITS Tech',
    description: 'Председателем ITS Tech выбран Кирилл Жихарев. Других кандидатов не существовало',
    coverUrl: '/images/kirzhikh.jpeg',
    created: new Date('2025-05-05')
  }
];

export default news;
