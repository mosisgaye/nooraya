import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const DEFAULT_RATES = {
  EUR_TO_XOF: 655.957,
  USD_TO_XOF: 615.5,
  EUR_TO_MAD: 10.8,
  USD_TO_MAD: 10.1,
  lastUpdated: new Date().toISOString(),
};

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY || '158aec7444d424b58e6147f5';
const EXCHANGE_RATE_API_URL = process.env.EXCHANGE_RATE_API_URL || 'https://v6.exchangerate-api.com/v6';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Try to get rates from cache
    const { data: cachedRates, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!error && cachedRates) {
      // Check if cache is still valid (less than 24 hours old)
      const cacheAge = Date.now() - new Date(cachedRates.created_at).getTime();
      const maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (cacheAge < maxCacheAge) {
        return NextResponse.json({
          EUR_TO_XOF: cachedRates.eur_to_xof,
          USD_TO_XOF: cachedRates.usd_to_xof,
          EUR_TO_MAD: cachedRates.eur_to_mad || DEFAULT_RATES.EUR_TO_MAD,
          USD_TO_MAD: cachedRates.usd_to_mad || DEFAULT_RATES.USD_TO_MAD,
          lastUpdated: cachedRates.created_at,
        });
      }
    }

    // Fetch fresh rates from API
    const freshRates = await fetchFreshRates();
    
    // Save to database
    await supabase.from('exchange_rates').insert({
      eur_to_xof: freshRates.EUR_TO_XOF,
      usd_to_xof: freshRates.USD_TO_XOF,
      eur_to_mad: freshRates.EUR_TO_MAD,
      usd_to_mad: freshRates.USD_TO_MAD,
    });

    return NextResponse.json(freshRates);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return default rates on error
    return NextResponse.json(DEFAULT_RATES);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin endpoint to force refresh rates
    const authHeader = request.headers.get('authorization');
    
    // Simple auth check (enhance this in production)
    if (!authHeader || !authHeader.includes('Bearer')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const freshRates = await fetchFreshRates();
    const supabase = await createClient();
    
    await supabase.from('exchange_rates').insert({
      eur_to_xof: freshRates.EUR_TO_XOF,
      usd_to_xof: freshRates.USD_TO_XOF,
      eur_to_mad: freshRates.EUR_TO_MAD,
      usd_to_mad: freshRates.USD_TO_MAD,
    });

    return NextResponse.json({
      success: true,
      rates: freshRates,
    });
  } catch (error) {
    console.error('Error updating exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to update rates' },
      { status: 500 }
    );
  }
}

async function fetchFreshRates() {
  try {
    // Fetch EUR to other currencies
    const eurResponse = await fetch(
      `${EXCHANGE_RATE_API_URL}/${EXCHANGE_RATE_API_KEY}/latest/EUR`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!eurResponse.ok) {
      throw new Error('Failed to fetch EUR rates');
    }

    const eurData = await eurResponse.json();
    
    // Calculate XOF rates
    // Note: XOF might not be directly available, so we use the fixed rate
    const EUR_TO_XOF = eurData.conversion_rates?.XOF || DEFAULT_RATES.EUR_TO_XOF;
    const EUR_TO_MAD = eurData.conversion_rates?.MAD || DEFAULT_RATES.EUR_TO_MAD;
    
    // Calculate USD to XOF and MAD using EUR as intermediate
    const EUR_TO_USD = eurData.conversion_rates?.USD || 1.1;
    const USD_TO_XOF = EUR_TO_XOF / EUR_TO_USD;
    const USD_TO_MAD = EUR_TO_MAD / EUR_TO_USD;

    return {
      EUR_TO_XOF,
      USD_TO_XOF,
      EUR_TO_MAD,
      USD_TO_MAD,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching fresh rates:', error);
    return DEFAULT_RATES;
  }
}