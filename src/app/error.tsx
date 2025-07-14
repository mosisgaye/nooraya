'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur pour le monitoring
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Alerte principale */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icône d'erreur */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          {/* Message d'erreur */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oups ! Quelque chose s&apos;est mal passé
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Une erreur inattendue s&apos;est produite. Pas de panique, nous sommes là pour vous aider !
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {error.message || "Erreur technique temporaire"}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="mr-2" size={20} />
              Réessayer
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Home className="mr-2" size={20} />
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 bg-white/50 backdrop-blur rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Ce que vous pouvez faire :</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Rafraîchir la page en cliquant sur &ldquo;Réessayer&rdquo;</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Vérifier votre connexion internet</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Effacer le cache de votre navigateur</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Réessayer dans quelques minutes</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">
            Si le problème persiste, notre équipe est là pour vous aider
          </p>
          <Link
            href="/help"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <MessageCircle className="mr-2" size={20} />
            Contacter le support
          </Link>
        </div>

        {/* Code d'erreur pour le support */}
        {error.digest && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Code d&apos;erreur : {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}