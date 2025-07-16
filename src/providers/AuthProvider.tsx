'use client';

import React from 'react';
import { AuthContext } from '@/features/auth/context/AuthContext';
import { useAuthState } from '@/features/auth/hooks/useAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};