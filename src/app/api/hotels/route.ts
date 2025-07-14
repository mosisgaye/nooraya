import { NextRequest, NextResponse } from 'next/server';

// Mock data pour les hôtels
const mockHotels = [
  {
    id: '1',
    name: 'Hôtel Plaza Athénée',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    mainImage: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    location: {
      address: '25 Avenue Montaigne',
      city: 'Paris',
      country: 'France',
      coordinates: {
        lat: 48.8566,
        lng: 2.3522
      },
      district: '8ème arrondissement'
    },
    stars: 5,
    rating: 9.2,
    reviews: 1847,
    price: 450,
    originalPrice: 550,
    currency: 'EUR',
    amenities: [
      { id: 'wifi', name: 'Wi-Fi gratuit', category: 'basic' },
      { id: 'parking', name: 'Parking', category: 'basic' },
      { id: 'restaurant', name: 'Restaurant', category: 'comfort' },
      { id: 'gym', name: 'Salle de sport', category: 'leisure' },
      { id: 'spa', name: 'Spa', category: 'leisure' }
    ],
    description: 'Hôtel de luxe situé sur la prestigieuse avenue Montaigne',
    distance: '2.5 km du centre',
    roomTypes: [
      {
        id: '1',
        name: 'Chambre Deluxe',
        price: 450,
        capacity: 2,
        size: 35,
        amenities: ['Wi-Fi', 'Minibar', 'Coffre-fort'],
        images: [],
        availability: 5
      }
    ],
    policies: {
      checkIn: '15:00',
      checkOut: '12:00',
      cancellation: 'Annulation gratuite jusqu\'à 24h avant',
      children: 'Les enfants sont les bienvenus',
      pets: 'Animaux non admis',
      smoking: 'Non-fumeur'
    }
  },
  // Ajouter plus d'hôtels mock ici...
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const destination = searchParams.get('destination');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const rooms = searchParams.get('rooms');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');

    // Simulation d'un délai API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filtrer les hôtels selon les paramètres
    const filteredHotels = mockHotels.filter(hotel => {
      // Logique de filtrage simplifiée
      let matches = true;
      
      // Exemple de filtrage par destination
      if (destination && !hotel.location.city.toLowerCase().includes(destination.toLowerCase())) {
        matches = false;
      }
      
      // Vous pouvez ajouter plus de logique de filtrage ici
      // en utilisant checkIn, checkOut, rooms, adults, children
      
      return matches;
    });

    // Log des paramètres pour le développement
    console.log('Recherche d\'hôtels:', { destination, checkIn, checkOut, rooms, adults, children });

    return NextResponse.json({
      success: true,
      data: filteredHotels,
      meta: {
        page: 1,
        totalPages: 1,
        totalCount: filteredHotels.length,
        perPage: 20
      }
    });
  } catch (err) {
    console.error('Erreur lors de la recherche des hôtels:', err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la recherche des hôtels'
        }
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Logique pour créer une réservation d'hôtel
    const booking = {
      id: `HTL-${Date.now()}`,
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