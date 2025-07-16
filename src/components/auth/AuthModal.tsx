'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Chrome, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/features/auth';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setIsEmailSent(false);
      setError('');
    }
  }, [isOpen]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      setIsEmailSent(true);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch {
      setError('Connexion Google échouée. Veuillez réessayer.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-8">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fermer"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bienvenue sur Nooraya
              </h2>
              <p className="text-gray-600">
                Voyagez en toute simplicité
              </p>
            </div>

            {!isEmailSent ? (
              <>
                <button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Chrome size={20} />
                  <span className="font-medium">Continuer avec Google</span>
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer avec l&apos;email
                    <ArrowRight size={18} />
                  </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-6">
                  En continuant, vous acceptez nos{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    conditions d&apos;utilisation
                  </a>{' '}
                  et notre{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    politique de confidentialité
                  </a>
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Email envoyé !
                </h3>
                <p className="text-gray-600 mb-6">
                  Nous avons envoyé un lien de connexion à<br />
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Vérifiez votre boîte de réception et cliquez sur le lien pour vous connecter.
                </p>
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="mt-6 text-sm text-blue-600 hover:underline"
                >
                  Utiliser une autre adresse email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;