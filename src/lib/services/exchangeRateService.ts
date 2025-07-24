import { createClient } from '@/lib/supabase/server';

interface ExchangeRates {
  EUR_TO_XOF: number;
  USD_TO_XOF: number;
  lastUpdated: string;
}

const DEFAULT_RATES: ExchangeRates = {
  EUR_TO_XOF: 655.957,
  USD_TO_XOF: 615.5,
  lastUpdated: new Date().toISOString(),
};

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY || '158aec7444d424b58e6147f5';
const EXCHANGE_RATE_API_URL = process.env.EXCHANGE_RATE_API_URL || 'https://v6.exchangerate-api.com/v6';

export class ExchangeRateService {
  private static instance: ExchangeRateService;
  private cache: ExchangeRates | null = null;
  private cacheExpiry: number = 0;

  private constructor() {}

  static getInstance(): ExchangeRateService {
    if (!ExchangeRateService.instance) {
      ExchangeRateService.instance = new ExchangeRateService();
    }
    return ExchangeRateService.instance;
  }

  async getRates(): Promise<ExchangeRates> {
    // Check in-memory cache first
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      // Try database cache
      const supabase = await createClient();
      const { data: cachedRates, error } = await supabase
        .from('exchange_rates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!error && cachedRates) {
        const cacheAge = Date.now() - new Date(cachedRates.created_at).getTime();
        const maxCacheAge = 6 * 60 * 60 * 1000; // 6 hours
        
        if (cacheAge < maxCacheAge) {
          const rates = {
            EUR_TO_XOF: cachedRates.eur_to_xof,
            USD_TO_XOF: cachedRates.usd_to_xof,
            lastUpdated: cachedRates.created_at,
          };
          
          // Update in-memory cache
          this.cache = rates;
          this.cacheExpiry = Date.now() + (60 * 60 * 1000); // 1 hour
          
          return rates;
        }
      }

      // Fetch fresh rates
      const freshRates = await this.fetchFreshRates();
      
      // Save to database
      await supabase.from('exchange_rates').insert({
        eur_to_xof: freshRates.EUR_TO_XOF,
        usd_to_xof: freshRates.USD_TO_XOF,
      });

      // Update in-memory cache
      this.cache = freshRates;
      this.cacheExpiry = Date.now() + (60 * 60 * 1000); // 1 hour

      return freshRates;
    } catch (error) {
      console.error('Error getting exchange rates:', error);
      return DEFAULT_RATES;
    }
  }

  async updateRates(): Promise<ExchangeRates> {
    try {
      const freshRates = await this.fetchFreshRates();
      const supabase = await createClient();
      
      // Save to database
      await supabase.from('exchange_rates').insert({
        eur_to_xof: freshRates.EUR_TO_XOF,
        usd_to_xof: freshRates.USD_TO_XOF,
      });

      // Update in-memory cache
      this.cache = freshRates;
      this.cacheExpiry = Date.now() + (60 * 60 * 1000); // 1 hour

      // Check for significant rate changes
      this.checkRateChanges(freshRates);

      return freshRates;
    } catch (error) {
      console.error('Error updating rates:', error);
      throw error;
    }
  }

  private async fetchFreshRates(): Promise<ExchangeRates> {
    try {
      // Fetch EUR rates
      const response = await fetch(
        `${EXCHANGE_RATE_API_URL}/${EXCHANGE_RATE_API_KEY}/latest/EUR`
      );
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result !== 'success') {
        throw new Error('API request was not successful');
      }

      // Get XOF rate (or use fixed rate if not available)
      const EUR_TO_XOF = data.conversion_rates?.XOF || DEFAULT_RATES.EUR_TO_XOF;
      
      // Calculate USD to XOF
      const EUR_TO_USD = data.conversion_rates?.USD || 1.1;
      const USD_TO_XOF = EUR_TO_XOF / EUR_TO_USD;

      return {
        EUR_TO_XOF,
        USD_TO_XOF,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching rates from API:', error);
      
      // Implement exponential backoff for retries
      if (this.shouldRetry(error)) {
        await this.delay(1000); // Wait 1 second before retry
        return this.fetchFreshRates();
      }
      
      return DEFAULT_RATES;
    }
  }

  private checkRateChanges(newRates: ExchangeRates) {
    // Alert if rate changes more than 5% from fixed rate
    const eurChange = Math.abs((newRates.EUR_TO_XOF - DEFAULT_RATES.EUR_TO_XOF) / DEFAULT_RATES.EUR_TO_XOF);
    
    if (eurChange > 0.05) {
      console.warn(`Significant EUR/XOF rate change detected: ${(eurChange * 100).toFixed(2)}%`);
      // Here you could send an alert to monitoring service
    }
  }

  private shouldRetry(error: unknown): boolean {
    // Retry on network errors but not on 4xx errors
    if (error instanceof Error) {
      return error.message.includes('fetch') || error.message.includes('network');
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  convertPrice(amount: number, from: 'EUR' | 'USD' | 'XOF', to: 'EUR' | 'USD' | 'XOF'): number {
    if (from === to) return amount;

    const rates = this.cache || DEFAULT_RATES;

    // Conversion matrix
    const conversions: Record<string, number> = {
      'EUR_XOF': rates.EUR_TO_XOF,
      'XOF_EUR': 1 / rates.EUR_TO_XOF,
      'USD_XOF': rates.USD_TO_XOF,
      'XOF_USD': 1 / rates.USD_TO_XOF,
      'EUR_USD': rates.EUR_TO_XOF / rates.USD_TO_XOF,
      'USD_EUR': rates.USD_TO_XOF / rates.EUR_TO_XOF,
    };

    const key = `${from}_${to}`;
    return amount * (conversions[key] || 1);
  }
}

export const exchangeRateService = ExchangeRateService.getInstance();