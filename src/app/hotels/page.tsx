import { Metadata } from 'next';
import HotelsPageClient from './HotelsPageClient';

export const metadata: Metadata = {
  title: 'Réservation d\'Hôtels - Nooraya Voyages | Hébergements au Meilleur Prix',
  description: 'Trouvez et réservez vos hôtels aux meilleurs prix avec Nooraya Voyages. Plus de 2 millions d\'hébergements dans le monde entier. Comparez les prix et économisez sur votre séjour.',
  keywords: 'hôtel, réservation hôtel, hébergement, séjour, voyage, hotel pas cher, booking, chambres, auberge, resort, appartement, gîte, maison hôte, hôtel luxe, hôtel 5 étoiles, hôtel 4 étoiles',
  openGraph: {
    title: 'Réservation d\'Hôtels - Nooraya Voyages',
    description: 'Trouvez et réservez vos hôtels aux meilleurs prix. Plus de 2 millions d\'hébergements dans le monde entier.',
    type: 'website',
    url: 'https://nooraya-voyages.com/hotels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réservation d\'Hôtels - Nooraya Voyages',
    description: 'Trouvez et réservez vos hôtels aux meilleurs prix. Plus de 2 millions d\'hébergements dans le monde entier.',
  },
};

export default function HotelsPage() {
  return <HotelsPageClient />;
}