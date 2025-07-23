import { Metadata } from 'next';
import { Suspense } from 'react';
import FlightResultsClient from './FlightResultsClient';

export const metadata: Metadata = {
  title: 'Résultats de Recherche de Vols - Nooraya Voyages | Comparez les Prix',
  description: 'Comparez les prix des vols et trouvez les meilleures offres pour votre voyage. Filtrez par compagnie aérienne, prix, horaires et durée de vol. Réservez facilement en ligne.',
  keywords: 'résultats vols, comparaison prix vols, filtres vols, compagnie aérienne, horaires vols, durée vol, escales, billets avion pas cher, réservation vol, vol direct, vol avec escale',
  openGraph: {
    title: 'Résultats de Recherche de Vols - Nooraya Voyages',
    description: 'Comparez les prix des vols et trouvez les meilleures offres pour votre voyage. Filtrez par compagnie aérienne, prix, horaires et durée de vol.',
    type: 'website',
    url: 'https://nooraya-voyages.com/flight-results',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Résultats de Recherche de Vols - Nooraya Voyages',
    description: 'Comparez les prix des vols et trouvez les meilleures offres pour votre voyage. Filtrez par compagnie aérienne, prix, horaires et durée de vol.',
  },
  robots: {
    index: false, // Les pages de résultats ne doivent pas être indexées
    follow: true,
  },
};

export default function FlightResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Recherche des meilleurs vols...</p>
        </div>
      </div>
    }>
      <FlightResultsClient />
    </Suspense>
  );
}