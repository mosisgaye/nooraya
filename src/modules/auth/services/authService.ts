import { User, LoginCredentials, RegisterData } from '../types';

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Identifiants invalides');
    }

    const data = await response.json();
    
    // Stocker le token
    if (data.token) {
      localStorage.setItem('auth-token', data.token);
    }

    return data.user;
  }

  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    }

    const result = await response.json();
    
    if (result.token) {
      localStorage.setItem('auth-token', result.token);
    }

    return result.user;
  }

  async logout(): Promise<void> {
    const token = localStorage.getItem('auth-token');
    
    if (token) {
      try {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }

    localStorage.removeItem('auth-token');
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem('auth-token');
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch {
      localStorage.removeItem('auth-token');
      return null;
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }

    const result = await response.json();
    return result.user;
  }

  async resetPassword(email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la réinitialisation du mot de passe');
    }
  }
}

export const authService = new AuthService();