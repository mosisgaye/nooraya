import { NextRequest, NextResponse } from 'next/server';
import { exchangeRateService } from '@/lib/services/exchangeRateService';

export async function GET(request: NextRequest) {
  // Verify this is a valid cron request (Vercel adds a special header)
  const authHeader = request.headers.get('authorization');
  
  // In production, Vercel will add CRON_SECRET to verify the request
  if (process.env.CRON_SECRET) {
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    console.log('Starting exchange rate update cron job at', new Date().toISOString());
    
    // Update rates
    const updatedRates = await exchangeRateService.updateRates();
    
    console.log('Exchange rates updated successfully:', updatedRates);
    
    return NextResponse.json({
      success: true,
      rates: updatedRates,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}