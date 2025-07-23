'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useAuthModal } from '@/contexts/AuthModalContext';
import FocusTrap from '@/components/ui/focus-trap';

type AuthMode = 'login' | 'register' | 'forgot';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const { login, register, loginWithGoogle, isLoading } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // États du formulaire
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthModalOpen) {
      // Reset form
      setMode('login');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        acceptTerms: false
      });
      setErrors({});
      setShowPassword(false);
    } else {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (mode === 'register' && formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    // Register specific validations
    if (mode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'Prénom requis';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Nom requis';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Vous devez accepter les conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        // Fermer le modal après connexion réussie
        closeAuthModal();
      } else if (mode === 'register') {
        await register(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );
        closeAuthModal();
      }
    } catch (error) {
      setErrors({ 
        general: error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Ne pas fermer le modal ici car Google OAuth ouvre une nouvelle fenêtre
      // Le modal se fermera automatiquement après la redirection
    } catch (error) {
      console.error('Google login error:', error);
      setErrors({ 
        general: 'Erreur de connexion avec Google. Veuillez réessayer.' 
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { strength: 1, label: 'Faible', color: 'bg-red-500' };
    if (strength <= 3) return { strength: 2, label: 'Moyen', color: 'bg-yellow-500' };
    return { strength: 3, label: 'Fort', color: 'bg-green-500' };
  };

  if (!isAuthModalOpen) {
    // console.log('AuthModal not open, returning null');
    return null;
  }
  
  console.log('AuthModal is open, rendering...');

  const passwordStrength = mode === 'register' ? getPasswordStrength(formData.password) : null;

  return (
    <FocusTrap isActive={isAuthModalOpen}>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={closeAuthModal}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
              <button
                onClick={closeAuthModal}
                className="absolute right-4 top-4 rounded-lg bg-white/20 p-2 hover:bg-white/30 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-bold">
                {mode === 'login' && 'Connexion'}
                {mode === 'register' && 'Créer un compte'}
                {mode === 'forgot' && 'Mot de passe oublié'}
              </h2>
              <p className="mt-1 text-green-100">
                {mode === 'login' && 'Accédez à votre espace personnel'}
                {mode === 'register' && 'Rejoignez Nooraya Voyages'}
                {mode === 'forgot' && 'Réinitialisez votre mot de passe'}
              </p>
            </div>

            {/* Tabs */}
            {mode !== 'forgot' && (
              <div className="flex border-b">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    mode === 'login'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Se connecter
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    mode === 'register'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  S&apos;inscrire
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Error message */}
              {errors.general && (
                <div 
                  role="alert" 
                  aria-live="polite"
                  className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800"
                >
                  <AlertCircle size={16} />
                  {errors.general}
                </div>
              )}

              {/* Google login button */}
              {mode !== 'forgot' && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    aria-label={mode === 'login' ? 'Se connecter avec Google' : 'S\'inscrire avec Google'}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-gray-700">
                      {mode === 'login' ? 'Se connecter avec Google' : 'S&apos;inscrire avec Google'}
                    </span>
                  </button>

                  {/* Separator */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">ou</span>
                    </div>
                  </div>
                </>
              )}

              {/* Register fields */}
              {mode === 'register' && (
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full rounded-lg border pl-10 pr-3 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Jean"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full rounded-lg border pl-10 pr-3 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Dupont"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full rounded-lg border pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              {mode !== 'forgot' && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full rounded-lg border pl-10 pr-10 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                  )}

                  {/* Password strength indicator */}
                  {mode === 'register' && formData.password && passwordStrength && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              level <= passwordStrength.strength
                                ? passwordStrength.color
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`mt-1 text-xs ${
                        passwordStrength.strength === 1 ? 'text-red-600' :
                        passwordStrength.strength === 2 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        Mot de passe {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Confirm password */}
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full rounded-lg border pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Terms checkbox */}
              {mode === 'register' && (
                <div className="mb-6">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500/20"
                    />
                    <span className="text-sm text-gray-600">
                      J&apos;accepte les{' '}
                      <span className="text-green-600">
                        conditions d&apos;utilisation
                      </span>{' '}
                      et la{' '}
                      <span className="text-green-600">
                        politique de confidentialité
                      </span>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-xs text-red-600">{errors.acceptTerms}</p>
                  )}
                </div>
              )}

              {/* Forgot password link */}
              {mode === 'login' && (
                <div className="mb-6 text-right">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Chargement...
                  </span>
                ) : (
                  <>
                    {mode === 'login' && 'Se connecter'}
                    {mode === 'register' && 'Créer mon compte'}
                    {mode === 'forgot' && 'Envoyer le lien'}
                  </>
                )}
              </button>

              {/* Back to login link */}
              {mode === 'forgot' && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Retour à la connexion
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default AuthModal;