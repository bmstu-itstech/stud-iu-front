export interface ContactProps {
    avatarUrl: string;
    name: string;
    role: string;
}

const contacts: ContactProps[] = [
    {
        avatarUrl: '/images/k_zhikharev.jpg',
        name: 'Кирилл Жихарев',
        role: 'Глава ITS BMSTU',
    },
    {
        avatarUrl: '/images/a_evdokimova.jpg',
        name: 'Анастасия Евдокимова',
        role: 'Председатель',
    },
    {
        avatarUrl: '/images/i_chistyakov.jpg',
        name: 'Илья Чистяков',
        role: 'Внешние коммуникации',
    },
];

export default contacts;
