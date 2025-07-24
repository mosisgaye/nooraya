/**
 * Système de commission pour Nooraya Voyages
 */

// Commission fixe de 10 000 FCFA
export const FIXED_COMMISSION_XOF = 10000;

// Commission en EUR (environ 15.24 EUR au taux fixe)
export const FIXED_COMMISSION_EUR = 15.24;

// Commission en USD (environ 16.26 USD au taux approximatif)
export const FIXED_COMMISSION_USD = 16.26;

/**
 * Interface pour les prix avec commission
 */
export interface PriceWithCommission {
  basePrice: number;
  commission: number;
  totalPrice: number;
  currency: string;
}

/**
 * Obtenir le montant de la commission selon la devise
 */
export function getCommissionAmount(currency: string = 'XOF'): number {
  switch (currency.toUpperCase()) {
    case 'XOF':
    case 'FCFA':
      return FIXED_COMMISSION_XOF;
    case 'EUR':
      return FIXED_COMMISSION_EUR;
    case 'USD':
      return FIXED_COMMISSION_USD;
    default:
      return FIXED_COMMISSION_XOF;
  }
}

/**
 * Calculer le prix total avec commission
 */
export function calculatePriceWithCommission(
  basePrice: number,
  currency: string = 'XOF'
): PriceWithCommission {
  const commission = getCommissionAmount(currency);
  
  return {
    basePrice,
    commission,
    totalPrice: basePrice + commission,
    currency
  };
}

/**
 * Formater l'affichage du prix avec commission
 */
export function formatPriceWithCommission(
  priceData: PriceWithCommission,
  showBreakdown: boolean = false
): string {
  const { basePrice, commission, totalPrice, currency } = priceData;
  
  if (!showBreakdown) {
    return formatPrice(totalPrice, currency);
  }
  
  // Affichage détaillé
  return `${formatPrice(basePrice, currency)} + ${formatPrice(commission, currency)} (frais de service)`;
}

/**
 * Formater un prix selon la devise
 */
export function formatPrice(amount: number, currency: string = 'XOF'): string {
  switch (currency.toUpperCase()) {
    case 'XOF':
    case 'FCFA':
      // Format: 150 000 FCFA
      return `${Math.round(amount).toLocaleString('fr-FR').replace(/,/g, ' ')} FCFA`;
    case 'EUR':
      // Format: 229,00 €
      return `${amount.toLocaleString('fr-FR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} €`;
    case 'USD':
      // Format: $245.00
      return `$${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    default:
      return `${amount} ${currency}`;
  }
}

/**
 * Extraire le prix de base depuis un prix total (enlever la commission)
 */
export function extractBasePrice(
  totalPrice: number,
  currency: string = 'XOF'
): number {
  const commission = getCommissionAmount(currency);
  return totalPrice - commission;
}

/**
 * Vérifier si un prix inclut déjà la commission
 * (utile pour éviter de l'ajouter deux fois)
 */
export function hasCommissionIncluded(
  price: number,
  metadata?: { includesCommission?: boolean }
): boolean {
  return metadata?.includesCommission || false;
}

/**
 * Ajouter la commission à un tableau de vols
 */
export function addCommissionToFlights(flights: any[], currency: string = 'XOF'): any[] {
  return flights.map(flight => ({
    ...flight,
    originalPrice: flight.price,
    price: flight.price + getCommissionAmount(currency),
    priceBreakdown: calculatePriceWithCommission(flight.price, currency),
    includesCommission: true
  }));
}

/**
 * Configuration de la commission (pour future extension)
 */
export const COMMISSION_CONFIG = {
  fixed: {
    XOF: 10000,
    EUR: 15.24,
    USD: 16.26
  },
  percentage: 0, // Pour future implémentation
  minimum: {
    XOF: 10000,
    EUR: 15.24,
    USD: 16.26
  },
  description: {
    fr: "Frais de service",
    en: "Service fee"
  }
};