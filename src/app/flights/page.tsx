import { Metadata } from 'next';
import FlightsPageClient from './FlightsPageClient';

export const metadata: Metadata = {
  title: 'Réservation de Vols - Nooraya Voyages | Billets d\'avion au Meilleur Prix',
  description: 'Trouvez et réservez vos billets d\'avion aux meilleurs prix avec Nooraya Voyages. Comparez des millions de vols aller-retour et aller simple. Économisez jusqu\'à 70% sur vos voyages.',
  keywords: 'billets avion, vol pas cher, réservation vol, vols aller retour, vols aller simple, comparer vols, voyage, aéroport, compagnie aérienne, vol économique, vol premium, vol affaires, vol première classe',
  openGraph: {
    title: 'Réservation de Vols - Nooraya Voyages',
    description: 'Trouvez et réservez vos billets d\'avion aux meilleurs prix. Comparez des millions de vols et économisez jusqu\'à 70%.',
    type: 'website',
    url: 'https://nooraya-voyages.com/flights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réservation de Vols - Nooraya Voyages',
    description: 'Trouvez et réservez vos billets d\'avion aux meilleurs prix. Comparez des millions de vols et économisez jusqu\'à 70%.',
  },
};

export default function FlightsPage() {
  return <FlightsPageClient />;
}