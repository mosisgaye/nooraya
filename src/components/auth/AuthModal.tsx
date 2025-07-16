'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/features/auth';
import { supabase } from '@/lib/supabase';
import { ModalPortal } from './ModalPortal';

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setIsEmailSent(false);
      setError('');
    } else {
      // Focus trap
      modalRef.current?.focus();
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
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
    <ModalPortal>
      {/* Overlay sombre avec z-index très élevé */}
      <div 
        className="fixed inset-0 z-[9998] bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Container du modal avec z-index encore plus élevé */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          ref={modalRef}
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className="relative p-6 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Fermer"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bienvenue sur Nooraya
              </h2>
              <p className="text-gray-600">
                Connectez-vous pour accéder à vos réservations
              </p>
            </div>

            {!isEmailSent ? (
              <>
                <button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">Continuer avec Google</span>
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
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
    </ModalPortal>
  );
};

export default AuthModal;