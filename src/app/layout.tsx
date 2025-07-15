import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.alboraq.com'),
  title: 'Alboraq - Voyages Élégants | Vols, Hôtels et Séjours',
  description: 'Découvrez le monde avec Alboraq. Réservez vos vols, hôtels et séjours au meilleur prix. Service premium et assistance 24/7.',
  keywords: 'voyage, vols, hôtels, séjours, vacances, réservation, tourisme, Alboraq',
  authors: [{ name: 'Alboraq' }],
  creator: 'Alboraq',
  publisher: 'Alboraq',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Alboraq - Voyages Élégants',
    description: 'Découvrez le monde avec Alboraq. Réservez vos vols, hôtels et séjours au meilleur prix.',
    url: 'https://www.alboraq.com',
    siteName: 'Alboraq',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alboraq - Voyages Élégants',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alboraq - Voyages Élégants',
    description: 'Découvrez le monde avec Alboraq. Réservez vos vols, hôtels et séjours au meilleur prix.',
    images: ['/twitter-image.jpg'],
    creator: '@alboraq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen font-sans text-gray-800">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}