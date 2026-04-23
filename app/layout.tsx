import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Expansión 10X — Jhana El Aridi · Sana tu relación con el dinero',
  description:
    'Programa de 12 semanas con Jhana El Aridi para sanar tu relación con el dinero, reprogramar tu merecimiento y construir la estructura financiera que te compra la libertad.',
  metadataBase: new URL('https://web-jhana.vercel.app'),
  openGraph: {
    title: 'Expansión 10X — Jhana El Aridi',
    description:
      'Sana tu relación con el dinero. Reprograma tu merecimiento. Construye la estructura financiera que te compra la libertad.',
    images: ['/assets/jhana-hero.jpg'],
    type: 'website',
    locale: 'es_LA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
