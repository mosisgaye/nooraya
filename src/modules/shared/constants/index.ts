export const APP_CONFIG = {
  name: 'Alboraq',
  description: 'Votre agence de voyage de confiance',
  version: '1.0.0',
  author: 'Alboraq Team',
  contact: {
    email: 'support@alboraq.com',
    phone: '+33 1 23 45 67 89',
  },
  social: {
    facebook: 'https://facebook.com/alboraq',
    twitter: 'https://twitter.com/alboraq',
    instagram: 'https://instagram.com/alboraq',
    youtube: 'https://youtube.com/alboraq',
  },
};

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    resetPassword: '/auth/reset-password',
  },
  flights: {
    search: '/flights',
    details: '/flights/:id',
    popular: '/flights/popular-destinations',
    priceHistory: '/flights/price-history',
    alerts: '/flights/price-alerts',
  },
  hotels: {
    search: '/hotels',
    details: '/hotels/:id',
    featured: '/hotels/featured',
    byDestination: '/hotels/destination/:destination',
  },
  bookings: {
    create: '/bookings',
    list: '/bookings/user',
    details: '/bookings/:id',
    cancel: '/bookings/:id/cancel',
    invoice: '/bookings/:id/invoice',
  },
};

export const STORAGE_KEYS = {
  authToken: 'auth-token',
  userPreferences: 'user-preferences',
  searchHistory: 'search-history',
  favorites: 'favorites',
  cart: 'cart',
};

export const CURRENCIES = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'Dollar américain' },
  { code: 'GBP', symbol: '£', name: 'Livre sterling' },
  { code: 'CHF', symbol: 'CHF', name: 'Franc suisse' },
  { code: 'CAD', symbol: 'C$', name: 'Dollar canadien' },
];

export const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export const CABIN_CLASSES = [
  { value: 'economy', label: 'Économique' },
  { value: 'premium', label: 'Premium' },
  { value: 'business', label: 'Affaires' },
  { value: 'first', label: 'Première' },
];

export const PASSENGER_TYPES = [
  { value: 'adult', label: 'Adulte', ageRange: '18+ ans' },
  { value: 'child', label: 'Enfant', ageRange: '2-17 ans' },
  { value: 'infant', label: 'Bébé', ageRange: '0-2 ans' },
];

export const BOOKING_STATUSES = [
  { value: 'pending', label: 'En attente', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmé', color: 'green' },
  { value: 'cancelled', label: 'Annulé', color: 'red' },
  { value: 'completed', label: 'Terminé', color: 'blue' },
];

export const PAYMENT_METHODS = [
  { value: 'card', label: 'Carte bancaire', icon: 'CreditCard' },
  { value: 'paypal', label: 'PayPal', icon: 'Paypal' },
  { value: 'bank_transfer', label: 'Virement bancaire', icon: 'Bank' },
];