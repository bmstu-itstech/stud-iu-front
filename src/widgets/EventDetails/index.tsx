'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

import { PastEvent } from '@/shared/api';
import { Text, Title } from '@/shared/ui/Typography';
import { useDotButton } from '@/shared/utils/useDotButton';

type CarouselSlideProps = PastEvent & {
  before?: ReactNode;
  after?: ReactNode;
  status?: string;
  details?: string[];
};

interface CarouselProps {
  slides: CarouselSlideProps[];
  options?: EmblaOptionsType;
}

const CarouselSkeleton: FC = () => {
  return (
    <div className="relative w-full animate-pulse">
      <div className="flex h-[calc(100dvh-(6.25rem*2))]">
        <div className="relative flex-grow-0 flex-shrink-0 basis-full min-w-0">
          <div className="absolute inset-0 bg-gray-200 h-full w-full"></div>
          <div className="relative flex flex-col flex-1 max-w-primary mx-auto px-3 2xl:px-0 py-10 sm:py-18 gap-10 z-20 h-full">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="flex gap-8 items-center">
              <div className="h-24 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-300 rounded w-full"></div>
              <div className="h-8 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div className="flex max-w-primary mt-auto justify-between mb-6 sm:mb-0 items-end">
              <div className="h-40 w-160 bg-gray-300 rounded-lg"></div>
              <div className="h-20 bg-gray-300 rounded-lg w-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Carousel: FC<CarouselProps> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

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
                src={slide.images?.[0]?.image || '/event.png'}
                width={1920}
                height={980}
                className="absolute inset-0 object-cover brightness-75 h-full w-full"
                alt="event cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 w-full z-10 bg-gradient-to-t from-blue-primary/60 to-black/0" />
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
                  <Title className="text-white">{slide.name}</Title>
                  {slide.status && (
                    <div
                      className={`${slide.status === 'Завершено' ? 'bg-[#bbff3a]' : 'bg-blue-primary'} rounded-2xl px-8 py-4 h-fit`}
                    >
                      <Text level={4} className={`!text-4xl !font-medium ${slide.status === 'Завершено' ? 'text-black' : 'text-white'}`}>
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
              className={`w-4 h-4 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-white scale-110' : 'bg-white/40'}`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
export { CarouselSkeleton };
