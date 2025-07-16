import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './critical.css';
import './globals.css';
import './accessibility.css';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { generateStructuredData } from '@/lib/seo';
import { AuthProvider } from '@/providers/AuthProvider';
import { AuthModalProvider } from '@/contexts/AuthModalContext';
import { AuthModal } from '@/components/auth';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.noorayavoyages.com'),
  title: 'Nooraya Voyages - Agence de Voyage Paris & Sénégal | Vols Pas Cher, Hôtels, Séjours',
  description: 'Agence de voyage Nooraya Voyages Paris & Sénégal : réservez vos vols pas cher, hôtels discount, séjours tout compris. Spécialiste vols Paris-Dakar, voyages Sénégal, assistance 24/7.',
  keywords: 'agence voyage Paris, agence voyage Sénégal, vols pas cher, réservation hotel, séjour tout compris, voyage sur mesure, vols Paris Dakar, voyage Sénégal, billets avion Sénégal, Nooraya Voyages, agence voyage Dakar, vols Air Sénégal, séjour Saly, voyage Casamance, vols Dakar Paris, voyage Thiès, Saint-Louis Sénégal, assistance voyage 24/7',
  authors: [{ name: 'Nooraya Voyages' }],
  creator: 'Nooraya Voyages',
  publisher: 'Nooraya Voyages',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Nooraya Voyages - Agence de Voyage Paris & Sénégal | Vols Pas Cher',
    description: 'Agence de voyage Nooraya Voyages Paris & Sénégal : réservez vos vols pas cher, hôtels discount, séjours tout compris. Spécialiste vols Paris-Dakar et voyages Sénégal.',
    url: 'https://www.noorayavoyages.com',
    siteName: 'Nooraya Voyages',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nooraya Voyages - Agence de Voyage Paris, Vols Pas Cher et Séjours',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nooraya Voyages - Agence de Voyage Paris & Sénégal',
    description: 'Agence de voyage Nooraya Voyages Paris & Sénégal : réservez vos vols pas cher, hôtels discount, séjours tout compris. Spécialiste vols Paris-Dakar.',
    images: ['/twitter-image.jpg'],
    creator: '@noorayavoyages',
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
  other: {
    'geo.region': 'FR;SN',
    'geo.placename': 'Paris, France; Dakar, Sénégal',
    'geo.position': '48.8566;2.3522;14.6928;-17.4467',
    'ICBM': '48.8566, 2.3522, 14.6928, -17.4467',
    'DC.title': 'Nooraya Voyages - Agence de Voyage Paris & Sénégal',
    'DC.creator': 'Nooraya Voyages',
    'DC.subject': 'Agence de voyage, vols pas cher, hôtels, séjours tout compris, voyage Sénégal, vols Paris-Dakar',
    'DC.description': 'Agence de voyage spécialisée en vols pas cher, réservation hôtels et séjours tout compris. Spécialiste des voyages vers le Sénégal.',
    'DC.publisher': 'Nooraya Voyages',
    'DC.language': 'fr',
    'DC.coverage': 'France, Sénégal, International',
    'rating': 'general',
    'revisit-after': '1 days',
    'distribution': 'global',
    'classification': 'Travel Agency, Tourism, Flight Booking, Hotel Reservation, Senegal Travel',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData('travelAgency')}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData('website')}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <AuthModalProvider>
            <div className="flex flex-col min-h-screen font-sans text-gray-800">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <AuthModal />
            </div>
          </AuthModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}