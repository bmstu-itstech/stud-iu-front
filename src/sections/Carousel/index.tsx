import { FC } from "react";
import { EventDTO as Props } from "@/shared/dto";
import Image from "next/image";
import { Text, Title } from "@/shared/ui/Typography";
import Button from "@/shared/ui/Button";

const Carousel: FC<Props> = (props) => {

  return (
    <section
      id="carousel"
      className='relative w-full h-[calc(100dvh-(6.25rem*1.5))] flex justify-center select-none'
    >
      <Image
        src={props.coverUrl}
        width={1920}
        height={980}
        className='absolute inset-0 object-cover brightness-80 h-full w-full'
        alt='event cover'
      />
      <div
        className='absolute inset-0 w-full z-2 bg-linear-180 from-black/0 via-black/0 to-blue-primary'
      />
      <div className='flex flex-col flex-1 max-w-primary px-3 2xl:px-0 py-10 sm:py-18 gap-4 sm:gap-10 z-10'>
        <Title className='text-white'>{props.title}</Title>
        <Text level={2} className='text-white/80'>{props.description}</Text>
        <div className='flex max-w-primary mt-auto mb-6 sm:mb-0'>
          <Button variant='white' size='primary'><Title level={5}>Зарегистрироваться</Title></Button>
        </div>
      </div>
    </section>
  );

};

export default Carousel;
