import { NextRequest, NextResponse } from 'next/server';

// Mock data pour les vols
const mockFlights = [
  {
    id: '1',
    airline: 'Air France',
    logo: '/logos/air-france.png',
    departure: {
      time: '08:30',
      airport: 'Charles de Gaulle',
      code: 'CDG',
      city: 'Paris',
      terminal: '2E'
    },
    arrival: {
      time: '10:45',
      airport: 'Heathrow',
      code: 'LHR',
      city: 'Londres',
      terminal: '5'
    },
    duration: '2h 15m',
    stops: 0,
    price: 189,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal'],
    baggage: {
      cabin: '7kg',
      checked: '23kg'
    },
    availability: 42,
    carrier: 'AF',
    flightNumber: 'AF1234'
  },
  // Ajouter plus de vols mock ici...
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const passengers = searchParams.get('passengers');
    const cabinClass = searchParams.get('cabinClass');

    // Simulation d'un délai API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filtrer les vols selon les paramètres
    const filteredFlights = mockFlights.filter(flight => {
      // Logique de filtrage simplifiée - vous pouvez l'améliorer
      let matches = true;
      
      // Exemple de filtrage par classe de cabine
      if (cabinClass && flight.cabinClass !== cabinClass) {
        matches = false;
      }
      
      // Vous pouvez ajouter plus de logique de filtrage ici
      // en utilisant from, to, departureDate, returnDate, passengers
      
      return matches;
    });

    // Log des paramètres pour le développement
    console.log('Recherche de vols:', { from, to, departureDate, returnDate, passengers, cabinClass });

    return NextResponse.json({
      success: true,
      data: filteredFlights,
      meta: {
        page: 1,
        totalPages: 1,
        totalCount: filteredFlights.length,
        perPage: 20
      }
    });
  } catch (err) {
    console.error('Erreur lors de la recherche des vols:', err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la recherche des vols'
        }
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Logique pour créer une réservation de vol
    const booking = {
      id: `BKG-${Date.now()}`,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error('Erreur lors de la création de la réservation:', err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BOOKING_ERROR',
          message: 'Impossible de créer la réservation'
        }
      },
      { status: 400 }
    );
  }
}