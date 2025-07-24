import { Metadata } from 'next';
import { Suspense } from 'react';
import FlightResultsClient from './FlightResultsClient';
import { FlightCardSkeletonGroup } from '@/components/flights/FlightCardSkeleton';

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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 h-96 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <FlightCardSkeletonGroup />
            </div>
          </div>
        </div>
      </div>
    }>
      <FlightResultsClient />
    </Suspense>
  );
}