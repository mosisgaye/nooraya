'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'XOF' | 'EUR' | 'USD';

interface ExchangeRates {
  EUR_TO_XOF: number;
  USD_TO_XOF: number;
  lastUpdated: string;
}

interface CurrencyContextType {
  currentCurrency: Currency;
  exchangeRates: ExchangeRates;
  convertPrice: (amount: number, fromCurrency: Currency, toCurrency?: Currency) => number;
  formatPrice: (amount: number, currency?: Currency, showSecondaryCurrency?: boolean) => string;
  switchCurrency: (currency: Currency) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const DEFAULT_RATES: ExchangeRates = {
  EUR_TO_XOF: 655.957,
  USD_TO_XOF: 615.5,
  lastUpdated: new Date().toISOString(),
};

const WEST_AFRICA_COUNTRIES = ['SN', 'ML', 'CI', 'BF', 'BJ', 'TG', 'NE', 'GW'];
const CURRENCY_STORAGE_KEY = 'nooraya_currency_preference';
const RATES_STORAGE_KEY = 'nooraya_exchange_rates';
const RATES_CACHE_DURATION = 3600000; // 1 hour in milliseconds

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('XOF');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(DEFAULT_RATES);
  const [isLoading, setIsLoading] = useState(true);

  // Load currency preference and rates from localStorage
  useEffect(() => {
    const loadPreferences = () => {
      try {
        // Load currency preference
        const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency;
        if (savedCurrency && ['XOF', 'EUR', 'USD'].includes(savedCurrency)) {
          setCurrentCurrency(savedCurrency);
        } else {
          // Auto-detect based on location (simplified version)
          detectUserCurrency();
        }

        // Load cached exchange rates
        const cachedRates = localStorage.getItem(RATES_STORAGE_KEY);
        if (cachedRates) {
          const parsed = JSON.parse(cachedRates);
          const cacheAge = Date.now() - new Date(parsed.lastUpdated).getTime();
          
          if (cacheAge < RATES_CACHE_DURATION) {
            setExchangeRates(parsed);
          } else {
            fetchExchangeRates();
          }
        } else {
          fetchExchangeRates();
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const detectUserCurrency = async () => {
    try {
      // Simple geolocation detection (can be enhanced with actual API)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (WEST_AFRICA_COUNTRIES.includes(data.country_code)) {
        setCurrentCurrency('XOF');
      } else if (data.continent_code === 'EU') {
        setCurrentCurrency('EUR');
      } else {
        setCurrentCurrency('USD');
      }
    } catch (error) {
      console.error('Error detecting location:', error);
      setCurrentCurrency('XOF'); // Default to XOF for Senegal
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('/api/exchange-rates');
      if (response.ok) {
        const rates = await response.json();
        setExchangeRates(rates);
        localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(rates));
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Keep using default rates
    }
  };

  const convertPrice = (amount: number, fromCurrency: Currency, toCurrency?: Currency): number => {
    const targetCurrency = toCurrency || currentCurrency;
    
    if (fromCurrency === targetCurrency) {
      return amount;
    }

    // Conversion logic
    if (fromCurrency === 'EUR' && targetCurrency === 'XOF') {
      return amount * exchangeRates.EUR_TO_XOF;
    } else if (fromCurrency === 'XOF' && targetCurrency === 'EUR') {
      return amount / exchangeRates.EUR_TO_XOF;
    } else if (fromCurrency === 'USD' && targetCurrency === 'XOF') {
      return amount * exchangeRates.USD_TO_XOF;
    } else if (fromCurrency === 'XOF' && targetCurrency === 'USD') {
      return amount / exchangeRates.USD_TO_XOF;
    } else if (fromCurrency === 'EUR' && targetCurrency === 'USD') {
      return (amount * exchangeRates.EUR_TO_XOF) / exchangeRates.USD_TO_XOF;
    } else if (fromCurrency === 'USD' && targetCurrency === 'EUR') {
      return (amount * exchangeRates.USD_TO_XOF) / exchangeRates.EUR_TO_XOF;
    }

    return amount;
  };

  const formatPrice = (amount: number, currency?: Currency, showSecondaryCurrency = true): string => {
    const displayCurrency = currency || currentCurrency;
    
    // Format based on currency
    let formatted: string;
    
    switch (displayCurrency) {
      case 'XOF':
        // No decimals for FCFA, space as thousand separator
        formatted = Math.round(amount).toLocaleString('fr-FR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) + ' FCFA';
        break;
        
      case 'EUR':
        formatted = amount.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        break;
        
      case 'USD':
        formatted = amount.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        break;
        
      default:
        formatted = amount.toString();
    }

    // Add secondary currency if requested and different from current
    if (showSecondaryCurrency && currency && currency !== currentCurrency) {
      const convertedAmount = convertPrice(amount, currency, currentCurrency);
      const secondaryFormatted = formatPrice(convertedAmount, currentCurrency, false);
      formatted += ` (${secondaryFormatted})`;
    }

    return formatted;
  };

  const switchCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        exchangeRates,
        convertPrice,
        formatPrice,
        switchCurrency,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}