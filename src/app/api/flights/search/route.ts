import { NextRequest, NextResponse } from 'next/server';

const DUFFEL_API_URL = 'https://api.duffel.com';
const DUFFEL_TOKEN = process.env.DUFFEL_API_TOKEN || '';

interface SearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();

    // Créer la requête de recherche Duffel
    const duffelRequest = {
      data: {
        slices: [
          {
            origin: body.origin,
            destination: body.destination,
            departure_date: body.departureDate,
          },
          ...(body.returnDate
            ? [
                {
                  origin: body.destination,
                  destination: body.origin,
                  departure_date: body.returnDate,
                },
              ]
            : []),
        ],
        passengers: [
          ...Array(body.passengers.adults).fill({ type: 'adult' }),
          ...Array(body.passengers.children || 0).fill({
            type: 'child',
            age: 10,
          }),
          ...Array(body.passengers.infants || 0).fill({
            type: 'infant_without_seat',
            age: 1,
          }),
        ],
        cabin_class: body.cabinClass || 'economy',
        max_connections: 2,
      },
    };

    // Appeler l'API Duffel
    const response = await fetch(`${DUFFEL_API_URL}/air/offer_requests`, {
      method: 'POST',
      headers: {
        'Accept-Encoding': 'gzip',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': `Bearer ${DUFFEL_TOKEN}`,
      },
      body: JSON.stringify(duffelRequest),
    });

    if (!response.ok) {
      throw new Error(`Duffel API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transformer les données Duffel pour notre format
    const flights = data.data.offers.map((offer: any) => ({
      id: offer.id,
      price: parseFloat(offer.total_amount),
      currency: offer.total_currency,
      airline: offer.owner.name,
      logo: offer.owner.logo_symbol_url,
      departure: {
        time: new Date(offer.slices[0].segments[0].departing_at).toISOString(),
        airport: offer.slices[0].segments[0].origin.iata_code,
        city: offer.slices[0].segments[0].origin.city_name,
        terminal: offer.slices[0].segments[0].origin_terminal,
      },
      arrival: {
        time: new Date(
          offer.slices[0].segments[offer.slices[0].segments.length - 1].arriving_at
        ).toISOString(),
        airport:
          offer.slices[0].segments[offer.slices[0].segments.length - 1]
            .destination.iata_code,
        city: offer.slices[0].segments[offer.slices[0].segments.length - 1]
          .destination.city_name,
        terminal:
          offer.slices[0].segments[offer.slices[0].segments.length - 1]
            .destination_terminal,
      },
      duration: offer.slices[0].duration,
      stops: offer.slices[0].segments.length - 1,
      cabinClass: offer.slices[0].segments[0].passengers[0].cabin_class,
    }));

    return NextResponse.json({ flights });
  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}