export interface KiwiSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
  tripType: 'round-trip' | 'one-way' | 'multi-city';
}

export interface KiwiLocation {
  id: string;
  code: string;
  name: string;
  city: {
    name: string;
    country: {
      name: string;
      code: string;
    };
  };
  type: string;
}

export interface KiwiCarrier {
  id: string;
  code: string;
  name: string;
}

export interface KiwiSegment {
  id: string;
  departure: {
    time: string;
    airport: {
      code: string;
      name: string;
      city: string;
    };
  };
  arrival: {
    time: string;
    airport: {
      code: string;
      name: string;
      city: string;
    };
  };
  carrier: {
    code: string;
    name: string;
  };
  flightNumber: string;
  duration: number;
}

export interface KiwiItinerary {
  id: string;
  priceBreakdown: {
    total: {
      amount: string;
      currency: string;
    };
    baseFare: {
      amount: string;
      currency: string;
    };
    bookingFee: {
      amount: string;
      currency: string;
    };
  };
  duration: number;
  segments: KiwiSegment[];
  bookingLink: string;
  deepLink: string;
  outbound: {
    duration: number;
    stopCount: number;
    segments: KiwiSegment[];
  };
  inbound?: {
    duration: number;
    stopCount: number;
    segments: KiwiSegment[];
  };
}

export interface KiwiFlightResponse {
  __typename: string;
  metadata: {
    carriers: KiwiCarrier[];
  };
  itineraries: KiwiItinerary[];
  marketingCarrier?: {
    id: string;
    code: string;
    name: string;
  };
}