import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    services: {
      rapidapi: {
        configured: !!process.env.RAPIDAPI_KEY,
        keyLength: process.env.RAPIDAPI_KEY?.length || 0,
        host: process.env.KIWI_API_HOST || 'not set'
      },
      supabase: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      paytech: {
        apiKey: !!process.env.PAYTECH_API_KEY,
        secretKey: !!process.env.PAYTECH_SECRET_KEY,
        apiUrl: process.env.PAYTECH_API_URL || 'not set'
      }
    }
  };

  // Check if all required services are configured
  const allConfigured = 
    envCheck.services.rapidapi.configured &&
    envCheck.services.supabase.url &&
    envCheck.services.supabase.anonKey &&
    envCheck.services.paytech.apiKey;

  if (!allConfigured) {
    envCheck.status = 'error';
  }

  return NextResponse.json(envCheck);
}