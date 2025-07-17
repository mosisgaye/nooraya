'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (!token_hash || type !== 'email') {
        setStatus('error');
        setMessage('Lien de confirmation invalide ou expiré.');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'email',
        });

        if (error) {
          setStatus('error');
          setMessage(error.message || 'Erreur lors de la confirmation de votre email.');
        } else {
          setStatus('success');
          setMessage('Votre email a été confirmé avec succès ! Vous pouvez maintenant vous connecter.');
          
          // Rediriger vers la page de connexion après 3 secondes
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } catch {
        setStatus('error');
        setMessage('Une erreur inattendue s&apos;est produite.');
      }
    };

    confirmEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-green-600 mx-auto mb-6 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmation en cours...</h1>
            <p className="text-gray-600">Nous vérifions votre email, veuillez patienter.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email confirmé !</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirection automatique dans 3 secondes...</p>
            <Link 
              href="/login" 
              className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Se connecter maintenant
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur de confirmation</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Link 
                href="/register" 
                className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Créer un nouveau compte
              </Link>
              <Link 
                href="/resend-confirmation" 
                className="block w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Renvoyer l&apos;email de confirmation
              </Link>
            </div>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Mail className="mr-2" size={16} />
            <span>Besoin d&apos;aide ? Contactez le support</span>
          </div>
        </div>
      </div>
    </div>
  );
}