'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

import { EventDTO } from '@/shared/dto';
import { Text, Title } from '@/shared/ui/Typography';
import { useDotButton } from '@/shared/utils/useDotButton';

type CarouselSlideProps = EventDTO & {
  before?: ReactNode;
  after?: ReactNode;
  status?: string;
  details?: string[];
};

interface CarouselProps {
  slides: CarouselSlideProps[];
  options?: EmblaOptionsType;
}

const Carousel: FC<CarouselProps> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[calc(100dvh-(6.25rem*2))]">
          {slides.map((slide, index) => (
            <div
              className="relative flex-grow-0 flex-shrink-0 basis-full min-w-0"
              key={slide.id}
            >
              <Image
                src={slide.coverUrl}
                width={1920}
                height={980}
                className="absolute inset-0 object-cover brightness-80 h-full w-full"
                alt="event cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 w-full z-10 bg-linear-180 from-black/0 via-black/0 to-blue-primary" />
              <div className="relative flex flex-col flex-1 max-w-primary mx-auto px-3 2xl:px-0 py-10 sm:py-18 gap-4 sm:gap-10 z-20 h-full">
                {slide.details && (
                  <div className="flex justify-between">
                    {slide.details.map((detail) => (
                      <Text className="text-white/70" key={detail}>
                        {detail}
                      </Text>
                    ))}
                  </div>
                )}
                <div className="flex gap-8 items-center">
                  <Title className="text-white">{slide.title}</Title>
                  {slide.status && (
                    <div
                      className={`${slide.status === 'Завершено' ? 'bg-[#bbff3a]' : 'bg-blue-primary'} rounded-2xl px-8 py-4 h-fit`}
                    >
                      <Text
                        level={4}
                        className={`!text-4xl !font-medium ${slide.status === 'Завершено' ? 'text-black' : 'text-white'}`}
                      >
                        {slide.status}
                      </Text>
                    </div>
                  )}
                </div>
                <Text level={2} className="text-white/80">
                  {slide.description}
                </Text>
                <div className="flex max-w-primary mt-auto justify-between mb-6 sm:mb-0 items-end">
                  {slide.before}
                  {slide.after}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div className="absolute bottom-18 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'bg-white scale-110' : 'bg-white/40'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
