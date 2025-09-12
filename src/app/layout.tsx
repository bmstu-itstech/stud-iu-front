import { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/widgets/Navbar";
import Footer from "@/widgets/Footer";

export const alsSector = localFont({
  variable: '--font-als-sector',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/ALS_Sector-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/ALS_Sector-Bold.otf',
      weight: '600',
      style: 'normal'
    }
  ]
});

export const metadata: Metadata = {
  title: 'СтудИУ',
  description: 'Официальный сайт Студенческого совета факультета ИУ МГТУ им. Н.Э. Баумана',
  applicationName: 'СтудИУ',
  referrer: 'same-origin',
  keywords: ['МГТУ', 'Бауманка', 'ИУ', 'Студсовет ИУ', 'МГТУ ИУ'],
  authors: [
    {
      name: 'ITS Tech',
      url: 'https://its-bmstu.ru'
    }
  ],
  creator: 'ITS Tech',
  publisher: 'ITS Tech',
  formatDetection: {
    email: true,
    address: false,
    telephone: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`antialiased ${alsSector.className} bg-white max-w-full`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
