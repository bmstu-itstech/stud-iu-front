import Button from "@/shared/ui/Button";
import { Text, Title } from "@/shared/ui/Typography";
import Image from "next/image";
import { FC } from "react";
import Card from "./components/Card";
import { cards } from "./cards.usecase";

const About: FC<{}> = () => {

  return (
    <section id="about" className="flex flex-1 gap-16 flex-col w-dvw mx-auto mt-24 sm:mt-48 px-6 2xl:px-0 max-w-primary">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-8">
          <Title level={2}><span className="text-blue-primary">Студ_ИУ</span> - это мы.<br/>Наше время - действовать</Title>
          <Text level={4}>Мы - команда из 250 человек, развивающая айти-сообщество. Студсовет объединяет инициативных ребят, готовых создавать проекты и организовывать мероприятия</Text>
          <Button variant='blue' size='full' className="flex-none mt-auto"><Text level={4}>Стать активистом</Text></Button>
        </div>
        <Image
          src="/images/team.png"
          className="rounded-lg mx-auto lg:mx-0 object-contain xl:object-cover"
          width={542}
          height={402}
          alt="team"
        />
      </div>
      <div className="flex">
        <div className="flex gap-3 w-dvw overflow-x-auto h-max">
          {cards.map(card => <Card {...card} key={card.title} />)}
        </div>
      </div>
    </section>
  );

};

export default About;
