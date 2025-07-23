'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackClient() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase gère automatiquement la session via les cookies
      // On attend un peu pour s'assurer que la session est établie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rediriger vers la page d'accueil ou la page d'origine
      const redirectTo = sessionStorage.getItem('authRedirect') || '/';
      sessionStorage.removeItem('authRedirect');
      router.push(redirectTo);
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-purple-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Connexion en cours...
        </h1>
        <p className="text-gray-600">
          Vous allez être redirigé dans quelques instants
        </p>
      </div>
    </div>
  );
}