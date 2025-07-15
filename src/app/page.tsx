import { Hero } from '@/components/layout';
import { SpecialOffers, PopularDestinations, WhyChooseUs } from '@/components/content';

export const metadata = {
  title: 'Nooraya Voyages Paris & Sénégal - Vols Pas Cher, Hôtels & Séjours Tout Compris 2024',
  description: 'Agence de voyage Nooraya Voyages Paris & Sénégal : réservez vos vols pas cher, hôtels discount, séjours tout compris. Spécialiste vols Paris-Dakar, voyages Sénégal, séjours Saly. Assistance 24/7 et réservation sécurisée.',
  keywords: 'agence voyage Paris, agence voyage Sénégal, vols pas cher 2024, hôtels discount, séjour tout compris, voyage sur mesure, vols Paris Dakar, voyage Sénégal, billets avion Sénégal, séjour Saly, voyage Casamance, vols Air Sénégal, voyage Thiès, Saint-Louis Sénégal, weekend romantique, vacances famille, voyage affaires, Nooraya Voyages, réservation vol Paris, offres spéciales voyage, assistance voyage 24/7, voyage dernière minute, agence voyage Dakar',
  openGraph: {
    title: 'Nooraya Voyages Paris & Sénégal - Vols Pas Cher & Séjours',
    description: 'Agence de voyage Nooraya Voyages Paris & Sénégal : réservez vos vols pas cher, hôtels discount, séjours tout compris. Spécialiste vols Paris-Dakar et voyages Sénégal.',
    images: ['/og-home.jpg'],
    url: '/',
  },
  twitter: {
    title: 'Nooraya Voyages Paris & Sénégal - Vols Pas Cher & Séjours',
    description: 'Agence de voyage Nooraya Voyages Paris & Sénégal : réservez vos vols pas cher, hôtels discount, séjours tout compris. Spécialiste vols Paris-Dakar.',
  },
  alternates: {
    canonical: 'https://www.noorayavoyages.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpecialOffers />
      <PopularDestinations />
      <WhyChooseUs />
    </>
  );
}