import Image from 'next/image';
import { FC } from 'react';

import { Title } from '@/shared/ui/Typography';

import Contact from './components/Contact';
import contacts from './contacts';
import partners from './partners';

const Additional: FC<{}> = () => {
  return (
    <section
      id="additional"
      className="bg-black flex flex-1 gap-16 flex-col w-dvw mx-auto px-6 2xl:px-0 py-40 pb-32 bg-linear-180 from-black to-blue-primary"
    >
      <div className="flex flex-col mx-auto max-w-full sm:max-w-primary gap-16">
        <Title
          level={1}
          className="sm:![calc(var(--text-7xl*(--dpr-ratio)))] text-white text-center"
        >
          Наши партнёры
        </Title>
        <div className="flex py-20">
          <div className="flex gap-6 w-dvw overflow-x-auto h-max sm:justify-center">
            {partners.map((partner, index) => (
              <Image
                width={80}
                height={80}
                src={partner}
                key={index}
                alt="partner logo"
                className="w-40 h-40"
              />
            ))}
          </div>
        </div>
        <Title
          id="contacts"
          level={1}
          className="sm:![calc(var(--text-7xl*2))] text-white text-center"
        >
          Контакты
        </Title>
        <div className="flex flex-col lg:flex-row justify-between max-w-primary gap-8">
          {contacts.map((contact) => (
            <Contact {...contact} key={contact.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Additional;
