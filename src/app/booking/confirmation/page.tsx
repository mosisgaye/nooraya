import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Confirmation de Réservation - Nooraya Voyages',
  description: 'Votre réservation a été confirmée. Consultez les détails de votre voyage.',
};

function LoadingConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Chargement de votre confirmation...</p>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<LoadingConfirmation />}>
      <ConfirmationContent />
    </Suspense>
  );
}

async function ConfirmationContent() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Réservation Confirmée !
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Votre paiement a été traité avec succès. Vous recevrez bientôt un email de confirmation avec tous les détails de votre voyage.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Numéro de confirmation</p>
            <p className="text-2xl font-mono font-bold text-gray-900">
              {new Date().getTime().toString(36).toUpperCase()}
            </p>
          </div>
          
          <div className="space-y-4">
            <a
              href="/"
              className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Retour à l'accueil
            </a>
            
            <a
              href="/account/bookings"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Voir mes réservations
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Des questions ? Contactez-nous au +221 33 123 45 67</p>
          <p>ou par email à support@noorayavoyages.com</p>
        </div>
      </div>
    </div>
  );
}