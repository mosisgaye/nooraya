import { Metadata } from 'next';
import HotelResultsClient from './HotelResultsClient';

export const metadata: Metadata = {
  title: 'Résultats de Recherche d\'Hôtels - Nooraya Voyages | Comparez les Prix',
  description: 'Comparez les prix des hôtels et trouvez les meilleures offres pour votre séjour. Filtrez par étoiles, prix, équipements et localisation. Réservez facilement en ligne.',
  keywords: 'résultats hôtels, comparaison prix hôtels, filtres hôtels, hôtel étoiles, équipements hôtel, localisation hôtel, réservation hôtel, hébergement pas cher, chambres hôtel, note hôtel',
  openGraph: {
    title: 'Résultats de Recherche d\'Hôtels - Nooraya Voyages',
    description: 'Comparez les prix des hôtels et trouvez les meilleures offres pour votre séjour. Filtrez par étoiles, prix, équipements et localisation.',
    type: 'website',
    url: 'https://nooraya-voyages.com/hotel-results',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Résultats de Recherche d\'Hôtels - Nooraya Voyages',
    description: 'Comparez les prix des hôtels et trouvez les meilleures offres pour votre séjour. Filtrez par étoiles, prix, équipements et localisation.',
  },
  robots: {
    index: false, // Les pages de résultats ne doivent pas être indexées
    follow: true,
  },
};

export default function HotelResultsPage() {
  return <HotelResultsClient />;
}