'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaTelegram, FaVk } from 'react-icons/fa6';

import Button from '@/shared/ui/Button';
import { Text, Title } from '@/shared/ui/Typography';

import Field from './components/Field';

const Footer: FC<{}> = () => {
  return (
    <div className="bg-black flex justify-center items-center select-none py-20">
      <div className="flex flex-col w-primary px-6 2xl:px-0 gap-8">
        <div className="flex gap-8 items-center">
          <Title level={2} className="text-white">
            Студенческий совет ИУ
          </Title>
          <Link href="/#">
            <FaTelegram fill="white" size="5rem" />
          </Link>
          <Link href="/#">
            <FaVk fill="white" size="5rem" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between bg-black">
          <div className="flex flex-col sm:gap-4">
            <Field label="Почта:" value="studsovetiu@yandex.ru" />
            <Field label="Телефон:" value="8 (800) 555-35-35" />
          </div>
          <div className="flex flex-col justify-center">
            <Field
              label="Адрес:"
              value="Бригадирский пер., 13, Москва"
              className="sm:text-right"
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="flex flex-col sm:flex-row gap-8">
            <Button variant="blue" size="inline">
              <Text level={3}>Хочу к вам</Text>
              <Image
                src="/icons/arrow_right.svg"
                alt="arrow right"
                width={36}
                height={36}
              />
            </Button>
            <Button variant="black" size="inlineWithBorder">
              <Text level={3}>Стать партнёром</Text>
              <Image
                src="/icons/arrow_right.svg"
                alt="arrow right"
                width={36}
                height={36}
              />
            </Button>
          </div>
          <div className="flex gap-8 items-center justify-center mx-auto sm:mx-0 mt-8 lg:mt-0">
            <Image
              src="/icons/itstech_logo.svg"
              alt="ITS Tech logo"
              width={50}
              height={50}
            />
            <Text level={3} className="text-white/70">
              Создано в ITS TECH
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
