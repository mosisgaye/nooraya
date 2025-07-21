'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/types';
import { getSupabaseClient } from '@/lib/supabase-client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthState | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Convertir un utilisateur Supabase en User de notre app
const mapSupabaseUserToUser = async (supabaseUser: SupabaseUser): Promise<User> => {
  // Récupérer le profil depuis la table profiles
  const supabase = getSupabaseClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', supabaseUser.id)
    .single();

  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    firstName: (profile?.first_name && typeof profile.first_name === 'string') ? profile.first_name : '',
    lastName: (profile?.last_name && typeof profile.last_name === 'string') ? profile.last_name : '',
    phone: (profile?.phone && typeof profile.phone === 'string') ? profile.phone : undefined,
    avatar: (profile?.avatar_url && typeof profile.avatar_url === 'string') ? profile.avatar_url : undefined
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier la session actuelle
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const mappedUser = await mapSupabaseUserToUser(session.user);
          setUser(mappedUser);
        }
      } catch (error) {
        console.error('Erreur de vérification auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Écouter les changements d'authentification
    const supabase = getSupabaseClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const mappedUser = await mapSupabaseUserToUser(session.user);
        setUser(mappedUser);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const mappedUser = await mapSupabaseUserToUser(data.user);
        setUser(mappedUser);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erreur de connexion avec Google');
    }
  };

  const sendMagicLink = async (email: string): Promise<void> => {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erreur d\'envoi du lien magique');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw new Error('Erreur de déconnexion');
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Créer l'utilisateur
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) throw error;

      // Vérifier si l'email nécessite une confirmation
      if (data.user && !data.session) {
        // L'utilisateur doit confirmer son email
        // On ne crée pas de profil maintenant, cela sera fait automatiquement
        // par le trigger quand l'utilisateur confirmera son email
        return; // Pas d'erreur, juste retourner
      }

      // Si une session existe (pas de confirmation email requise)
      if (data.user && data.session) {
        const mappedUser = await mapSupabaseUserToUser(data.user);
        setUser(mappedUser);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erreur d\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) throw new Error('Utilisateur non connecté');

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: updates.firstName,
          last_name: updates.lastName,
          phone: updates.phone,
          avatar_url: updates.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Mettre à jour l'état local
      setUser({ ...user, ...updates });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erreur de mise à jour du profil');
    }
  };

  const value: AuthState = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    sendMagicLink,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};