'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animé */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
            <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-blue-600 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Texte de chargement */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Chargement en cours...
        </h2>
        <p className="text-gray-600">
          Nous préparons votre expérience de voyage
        </p>

        {/* Barre de progression */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full animate-progress"></div>
          </div>
        </div>

        {/* Tips de voyage */}
        <div className="mt-12 max-w-md mx-auto">
          <LoadingTip />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(0);
          }
          50% {
            width: 60%;
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function LoadingTip() {
  const tips = [
    "💡 Astuce : Réservez vos vols le mardi pour obtenir les meilleurs prix !",
    "✈️ Le saviez-vous ? Les vols en milieu de semaine sont souvent moins chers.",
    "🏨 Conseil : Réservez votre hôtel 2-3 mois à l'avance pour les meilleures offres.",
    "🎒 N'oubliez pas de vérifier les restrictions de bagages avant de voyager !",
    "🌍 Explorez de nouvelles destinations avec nos offres exclusives.",
  ];

  // Sélectionner un tip aléatoire
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
      {randomTip}
    </div>
  );
}