import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Récupérer le pathname
  const pathname = request.nextUrl.pathname;

  // Gérer les redirections
  const redirects: Record<string, string> = {
    '/home': '/',
    '/flight': '/',
    '/flights': '/',
    '/hotel': '/hotels',
    '/package': '/packages',
    '/offer': '/packages',
  };

  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url));
  }

  // Gérer les locales (si multilingue)
  // const locale = request.cookies.get('locale')?.value || 'fr';
  
  // Ajouter des headers de sécurité
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // CSP Header pour la sécurité
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.noorayavoyages.com https://*.supabase.co https://www.google-analytics.com https://kiwi-com-cheap-flights.p.rapidapi.com https://vercel.live",
    "frame-src 'self' https://www.youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Gestion du cache pour les assets statiques
  if (pathname.startsWith('/_next/static/') || pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Protection des routes API - Simplifiée pour éviter les problèmes
  if (pathname.startsWith('/api/')) {
    // Log pour debugging sur les routes critiques
    if (pathname === '/api/flights/search' || pathname === '/api/health') {
      console.log(`${pathname} middleware:`, {
        origin: request.headers.get('origin'),
        host: request.headers.get('host'),
        referer: request.headers.get('referer'),
        method: request.method
      });
    }
    
    // Pour l'instant, on laisse passer toutes les requêtes API
    // TODO: Implémenter une vérification d'origine plus robuste

    // Rate limiting simple (à améliorer avec Redis en production)
    // const ip = request.ip ?? '127.0.0.1';
    // Implémenter un rate limiter ici
  }

  // Gérer l'authentification pour certaines routes
  const protectedRoutes = ['/account', '/bookings', '/favorites'];
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Ajouter des informations de performance
  response.headers.set('X-Response-Time', `${Date.now()}`);

  return response;
}

// Configuration du middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};