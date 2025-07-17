import { NextRequest, NextResponse } from 'next/server';

// Base de données mockée de vols
const flightDatabase = [
  // Vols Paris (CDG) -> Londres (LHR)
  {
    id: '1',
    airline: 'Air France',
    logo: '/logos/air-france.png',
    departure: { time: '08:30', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris', terminal: '2E' },
    arrival: { time: '10:45', airport: 'Heathrow', code: 'LHR', city: 'Londres', terminal: '5' },
    duration: '1h 25m',
    stops: 0,
    price: 189,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal', 'entertainment'],
    baggage: { cabin: '12kg', checked: '23kg' },
    availability: 42,
    carrier: 'AF',
    flightNumber: 'AF1234'
  },
  {
    id: '2',
    airline: 'British Airways',
    logo: '/logos/british-airways.png',
    departure: { time: '14:15', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris', terminal: '2A' },
    arrival: { time: '16:30', airport: 'Heathrow', code: 'LHR', city: 'Londres', terminal: '5' },
    duration: '1h 25m',
    stops: 0,
    price: 245,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal'],
    baggage: { cabin: '7kg', checked: '23kg' },
    availability: 18,
    carrier: 'BA',
    flightNumber: 'BA309'
  },
  // Vols Paris (CDG) -> New York (JFK)
  {
    id: '3',
    airline: 'Air France',
    logo: '/logos/air-france.png',
    departure: { time: '10:30', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris', terminal: '2E' },
    arrival: { time: '13:45', airport: 'John F. Kennedy', code: 'JFK', city: 'New York', terminal: '1' },
    duration: '8h 15m',
    stops: 0,
    price: 589,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal', 'entertainment', 'power'],
    baggage: { cabin: '12kg', checked: '23kg' },
    availability: 28,
    carrier: 'AF',
    flightNumber: 'AF008'
  },
  {
    id: '4',
    airline: 'Delta Airlines',
    logo: '/logos/delta.png',
    departure: { time: '17:20', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris', terminal: '2E' },
    arrival: { time: '20:35', airport: 'John F. Kennedy', code: 'JFK', city: 'New York', terminal: '4' },
    duration: '8h 15m',
    stops: 0,
    price: 652,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['wifi', 'meal', 'entertainment'],
    baggage: { cabin: '7kg', checked: '23kg' },
    availability: 35,
    carrier: 'DL',
    flightNumber: 'DL263'
  },
  // Vols Londres (LHR) -> Paris (CDG)
  {
    id: '5',
    airline: 'EasyJet',
    logo: '/logos/easyjet.png',
    departure: { time: '06:45', airport: 'Heathrow', code: 'LHR', city: 'Londres', terminal: '2' },
    arrival: { time: '09:00', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris', terminal: '2D' },
    duration: '1h 15m',
    stops: 0,
    price: 89,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: [],
    baggage: { cabin: '7kg', checked: '15kg' },
    availability: 156,
    carrier: 'U2',
    flightNumber: 'U23433'
  },
  // Vols Madrid (MAD) -> Paris (CDG)
  {
    id: '6',
    airline: 'Iberia',
    logo: '/logos/iberia.png',
    departure: { time: '09:15', airport: 'Barajas', code: 'MAD', city: 'Madrid', terminal: '4' },
    arrival: { time: '11:35', airport: 'Charles de Gaulle', code: 'CDG', city: 'Paris', terminal: '2F' },
    duration: '2h 20m',
    stops: 0,
    price: 165,
    currency: 'EUR',
    cabinClass: 'economy',
    amenities: ['meal'],
    baggage: { cabin: '10kg', checked: '23kg' },
    availability: 89,
    carrier: 'IB',
    flightNumber: 'IB3402'
  }
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

    // Filtrer les vols selon les paramètres de recherche
    const filteredFlights = flightDatabase.filter(flight => {
      // Vérifier la correspondance origine/destination
      if (from && to) {
        const matchesRoute = (flight.departure.code === from && flight.arrival.code === to) ||
                           (flight.departure.code === to && flight.arrival.code === from);
        if (!matchesRoute) return false;
      }
      
      // Filtrer par classe de cabine
      if (cabinClass && flight.cabinClass !== cabinClass) {
        return false;
      }
      
      return true;
    });

    // Si aucun vol trouvé pour cette route, générer des vols dynamiques
    if (filteredFlights.length === 0 && from && to) {
      // Générer 3-5 vols mockés pour n'importe quelle route
      const generatedFlights = [];
      const airlines = ['Air France', 'Lufthansa', 'KLM', 'British Airways', 'Ryanair'];
      const numFlights = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numFlights; i++) {
        generatedFlights.push({
          id: `gen-${i + 1}`,
          airline: airlines[i % airlines.length],
          logo: `/logos/${airlines[i % airlines.length].toLowerCase().replace(' ', '-')}.png`,
          departure: {
            time: `${String(6 + i * 3).padStart(2, '0')}:${Math.random() > 0.5 ? '30' : '45'}`,
            airport: from,
            code: from,
            city: from,
            terminal: String(Math.floor(Math.random() * 3) + 1)
          },
          arrival: {
            time: `${String(9 + i * 3).padStart(2, '0')}:${Math.random() > 0.5 ? '15' : '45'}`,
            airport: to,
            code: to,
            city: to,
            terminal: String(Math.floor(Math.random() * 3) + 1)
          },
          duration: `${Math.floor(Math.random() * 8) + 1}h ${Math.floor(Math.random() * 60)}m`,
          stops: Math.floor(Math.random() * 2),
          price: Math.floor(Math.random() * 500) + 100,
          currency: 'EUR',
          cabinClass: cabinClass || 'economy',
          amenities: ['wifi', 'meal'],
          baggage: { cabin: '7kg', checked: '23kg' },
          availability: Math.floor(Math.random() * 50) + 10,
          carrier: airlines[i % airlines.length].substring(0, 2).toUpperCase(),
          flightNumber: `${airlines[i % airlines.length].substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`
        });
      }
      
      return NextResponse.json({
        success: true,
        flights: generatedFlights,
        meta: {
          page: 1,
          totalPages: 1,
          totalCount: generatedFlights.length,
          perPage: 20
        }
      });
    }

    // Log des paramètres pour le développement
    console.log('Recherche de vols:', { from, to, departureDate, returnDate, passengers, cabinClass });

    return NextResponse.json({
      success: true,
      flights: filteredFlights,
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