export interface ContactProps {
    avatarUrl: string;
    name: string;
    role: string;
    tg_link: string;
}

const contacts: ContactProps[] = [
    {
        avatarUrl: '/images/k_zhikharev.jpg',
        name: 'Кирилл Жихарев',
        role: 'Глава ITS BMSTU',
        tg_link: '@zhikhkirill'
    },
    {
        avatarUrl: '/images/a_evdokimova.jpg',
        name: 'Анастасия Евдокимова',
        role: 'Председатель',
        tg_link: '@epkoliptik'
    },
    {
        avatarUrl: '/images/i_chistyakov.jpg',
        name: 'Илья Чистяков',
        role: 'Внешние коммуникации',
        tg_link: '@Bragadir'
    },
];

export default contacts;
