import { Hero } from '@/components/layout';
// import HeroSimple from '@/components/layout/HeroSimple';
import { PopularDestinations } from '@/components/content';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Réservation de Vols - Nooraya Voyages | Billets d\'avion au Meilleur Prix',
  description: 'Trouvez et réservez vos billets d\'avion aux meilleurs prix avec Nooraya Voyages. Comparez des millions de vols aller-retour et aller simple. Économisez jusqu\'à 70% sur vos voyages.',
  keywords: 'billets avion, vol pas cher, réservation vol, vols aller retour, vols aller simple, comparer vols, voyage, aéroport, compagnie aérienne, vol économique, vol premium, vol affaires, vol première classe',
  openGraph: {
    title: 'Réservation de Vols - Nooraya Voyages',
    description: 'Trouvez et réservez vos billets d\'avion aux meilleurs prix. Comparez des millions de vols et économisez jusqu\'à 70%.',
    type: 'website',
    url: 'https://nooraya-voyages.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réservation de Vols - Nooraya Voyages',
    description: 'Trouvez et réservez vos billets d\'avion aux meilleurs prix. Comparez des millions de vols et économisez jusqu\'à 70%.',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <WhatsAppButton />
    </>
  );
}