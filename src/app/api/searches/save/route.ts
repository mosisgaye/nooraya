import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const searchData = await request.json();
    
    // Sauvegarder la recherche
    const { data, error } = await supabase
      .from('flight_searches')
      .insert({
        user_id: user.id,
        origin: searchData.from,
        destination: searchData.to,
        departure_date: searchData.departureDate,
        return_date: searchData.returnDate,
        passengers: searchData.passengers,
        cabin_class: searchData.cabinClass,
        trip_type: searchData.tripType
      });

    if (error) {
      console.error('Error saving search:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Search save error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}