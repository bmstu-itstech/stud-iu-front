import { z } from 'zod';

export interface EventDTO {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  date: Date;
  fillColor: string;
  caption: string;
}

const eventBaseSchema = {
  title: z
    .string()
    .min(3, 'Название мероприятия должно состоять минимум из 3 символов')
    .max(
      150,
      'Слишком большое название мероприятия, сократите до 150 символов',
    ),
  description: z.string().default('Нет описания'),
  coverUrl: z.url().default('/images/cover.png'),
  fillColor: z.string().default('blue'),
  caption: z.string().optional(),
};

export const eventCreateSchema = z.object({
  ...eventBaseSchema,
  date: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().min(new Date(), { message: 'Дата должна быть в будущем' }),
  ),
});

export const eventEditSchema = z.object({
  ...eventBaseSchema,
  id: z.string('Не указан идентификатор меропрития'),
  date: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date('Не указана дата'),
  ),
});
