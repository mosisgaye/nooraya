import { NextRequest, NextResponse } from 'next/server';
import { kiwiClient } from '@/lib/kiwi/client';
// import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      from,
      to,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      cabinClass,
      tripType
    } = body;

    // Validate required fields
    if (!from || !to || !departureDate || !adults) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save search to database (optional - for analytics)
    // Commenting out for now as it's not critical for search functionality
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    
    // if (user) {
    //   await supabase.from('flight_searches').insert({
    //     user_id: user.id,
    //     from_airport: from,
    //     to_airport: to,
    //     departure_date: departureDate,
    //     return_date: returnDate,
    //     adults,
    //     children,
    //     infants,
    //     cabin_class: cabinClass,
    //     trip_type: tripType,
    //   });
    // }

    // Search flights based on trip type
    let flightData;
    try {
      if (tripType === 'round-trip' && returnDate) {
        console.log('Searching round-trip flights...');
        flightData = await kiwiClient.searchRoundTrip({
          from,
          to,
          departureDate,
          returnDate,
          adults: adults || 1,
          children: children || 0,
          infants: infants || 0,
          cabinClass: cabinClass || 'economy',
          tripType,
        });
      } else if (tripType === 'one-way') {
        console.log('Searching one-way flights...');
        flightData = await kiwiClient.searchOneWay({
          from,
          to,
          departureDate,
          adults: adults || 1,
          children: children || 0,
          infants: infants || 0,
          cabinClass: cabinClass || 'economy',
          tripType,
        });
      } else {
        return NextResponse.json(
          { error: 'Multi-city search not yet implemented' },
          { status: 400 }
        );
      }
    } catch (apiError) {
      console.error('Kiwi API error:', apiError);
      throw apiError;
    }

    // Log the raw response to understand the structure
    console.log('Raw flight data type:', typeof flightData);
    console.log('Flight data keys:', flightData ? Object.keys(flightData) : 'null');
    
    // Apply commission to prices and ensure data is serializable
    const commissionRate = parseFloat(process.env.COMMISSION_RATE || '0.05');
    
    // Return the raw data as-is to see what we're getting
    try {
      const dataToReturn = {
        success: true,
        data: flightData || {},
        debug: {
          hasData: !!flightData,
          dataType: typeof flightData,
          keys: flightData ? Object.keys(flightData) : [],
          itinerariesCount: flightData?.itineraries?.length || 0
        }
      };
      
      // Log what we're returning
      console.log('Returning data with', dataToReturn.debug.itinerariesCount, 'itineraries');
      
      return NextResponse.json(dataToReturn);
    } catch (error) {
      console.error('Error in response:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        data: {}
      });
    }
  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}