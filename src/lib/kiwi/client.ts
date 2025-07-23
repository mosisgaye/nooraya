import { KiwiSearchParams, KiwiFlightResponse, KiwiLocation } from './types';
import { getKiwiLocation } from './airport-mapping';

const KIWI_API_HOST = process.env.KIWI_API_HOST || 'kiwi-com-cheap-flights.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
  throw new Error('RAPIDAPI_KEY is not defined in environment variables');
}

export class KiwiClient {
  private headers = {
    'x-rapidapi-host': KIWI_API_HOST,
    'x-rapidapi-key': RAPIDAPI_KEY,
  };

  /**
   * Format date to YYYY-MM-DD
   */
  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  /**
   * Format airport code for Kiwi API
   */
  private formatLocation(code: string): string {
    return getKiwiLocation(code);
  }

  /**
   * Map cabin class to Kiwi format
   */
  private mapCabinClass(cabinClass: string): string {
    const mapping: Record<string, string> = {
      'economy': 'ECONOMY',
      'premium': 'PREMIUM_ECONOMY',
      'business': 'BUSINESS',
      'first': 'FIRST'
    };
    return mapping[cabinClass.toLowerCase()] || 'ECONOMY';
  }

  /**
   * Search for round-trip flights
   */
  async searchRoundTrip(params: KiwiSearchParams): Promise<KiwiFlightResponse> {
    // Format dates properly
    const outboundDate = new Date(params.departureDate);
    const inboundDate = params.returnDate ? new Date(params.returnDate) : null;
    
    const queryParams = new URLSearchParams({
      source: this.formatLocation(params.from),
      destination: this.formatLocation(params.to),
      currency: 'EUR', // Use EUR for now
      locale: 'fr',
      adults: params.adults.toString(),
      children: params.children.toString(),
      infants: params.infants.toString(),
      handbags: '1',
      holdbags: '0',
      cabinClass: this.mapCabinClass(params.cabinClass),
      sortBy: 'PRICE',
      sortOrder: 'ASCENDING',
      applyMixedClasses: 'true',
      allowReturnFromDifferentCity: 'false',
      allowChangeInboundDestination: 'false',
      allowChangeInboundSource: 'false',
      allowDifferentStationConnection: 'true',
      enableSelfTransfer: 'true',
      allowOvernightStopover: 'true',
      enableTrueHiddenCity: 'false',
      enableThrowAwayTicketing: 'false',
      outbound: 'SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY',
      transportTypes: 'FLIGHT',
      contentProviders: 'KIWI',
      limit: '50'  // On peut augmenter jusqu'à 100 ou plus selon l'API
    });

    // Add dates if provided
    if (params.departureDate) {
      queryParams.append('outboundDate', this.formatDate(params.departureDate));
    }
    if (params.returnDate) {
      queryParams.append('inboundDate', this.formatDate(params.returnDate));
    }

    const url = `https://${KIWI_API_HOST}/round-trip?${queryParams}`;

    try {
      console.log('Calling Kiwi API:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      const responseText = await response.text();
      console.log('Kiwi API response status:', response.status);
      console.log('Kiwi API response preview:', responseText.substring(0, 500));

      if (!response.ok) {
        throw new Error(`Kiwi API error: ${response.status} ${response.statusText} - ${responseText}`);
      }

      try {
        const data = JSON.parse(responseText);
        console.log('Parsed Kiwi data - Number of itineraries:', data.itineraries?.length || 0);
        if (data.itineraries && data.itineraries.length > 0) {
          console.log('First itinerary structure:', JSON.stringify(data.itineraries[0], null, 2).substring(0, 500));
        }
        return data;
      } catch (parseError) {
        console.error('Failed to parse Kiwi response:', parseError);
        console.error('Response text was:', responseText.substring(0, 200));
        throw new Error('Invalid JSON response from Kiwi API');
      }
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  }

  /**
   * Search for one-way flights
   */
  async searchOneWay(params: KiwiSearchParams): Promise<KiwiFlightResponse> {
    const queryParams = new URLSearchParams({
      source: this.formatLocation(params.from),
      destination: this.formatLocation(params.to),
      currency: 'EUR',
      locale: 'fr',
      adults: params.adults.toString(),
      children: params.children.toString(),
      infants: params.infants.toString(),
      handbags: '1',
      holdbags: '0',
      cabinClass: this.mapCabinClass(params.cabinClass),
      sortBy: 'PRICE',
      sortOrder: 'ASCENDING',
      applyMixedClasses: 'true',
      allowDifferentStationConnection: 'true',
      enableSelfTransfer: 'true',
      allowOvernightStopover: 'true',
      enableTrueHiddenCity: 'false',
      enableThrowAwayTicketing: 'false',
      outbound: 'SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY',
      transportTypes: 'FLIGHT',
      contentProviders: 'KIWI',
      limit: '50'  // On peut augmenter jusqu'à 100 ou plus selon l'API
    });

    // Add date if provided
    if (params.departureDate) {
      queryParams.append('outboundDate', this.formatDate(params.departureDate));
    }

    const url = `https://${KIWI_API_HOST}/one-way?${queryParams}`;

    try {
      console.log('Calling Kiwi API:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      const responseText = await response.text();
      console.log('Kiwi API response status:', response.status);
      console.log('Kiwi API response preview:', responseText.substring(0, 500));

      if (!response.ok) {
        throw new Error(`Kiwi API error: ${response.status} ${response.statusText} - ${responseText}`);
      }

      try {
        const data = JSON.parse(responseText);
        console.log('Parsed Kiwi data - Number of itineraries:', data.itineraries?.length || 0);
        if (data.itineraries && data.itineraries.length > 0) {
          console.log('First itinerary structure:', JSON.stringify(data.itineraries[0], null, 2).substring(0, 500));
        }
        return data;
      } catch (parseError) {
        console.error('Failed to parse Kiwi response:', parseError);
        console.error('Response text was:', responseText.substring(0, 200));
        throw new Error('Invalid JSON response from Kiwi API');
      }
    } catch (error) {
      console.error('Error searching one-way flights:', error);
      throw error;
    }
  }

  /**
   * Search locations/airports (for autocomplete)
   */
  async searchLocations(query: string): Promise<KiwiLocation[]> {
    const queryParams = new URLSearchParams({
      query: query,
      locale: 'fr',
      limit: '10',
    });

    const url = `https://${KIWI_API_HOST}/locations/query?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Kiwi API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.locations || [];
    } catch (error) {
      console.error('Error searching locations:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const kiwiClient = new KiwiClient();