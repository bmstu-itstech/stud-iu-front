import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Студенческий совет ИУ МГТУ им. Н.Э. Баумана',
    short_name: 'СтудИУ',
    description:
      'Сайт Студенческого совета факультета ИУ МГТУ им. Н.Э. Баумана',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
