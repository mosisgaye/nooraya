import { Flight, FlightSearchParams, FlightSearchResult, FlightFilters } from '../types';

class FlightService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  async searchFlights(params: FlightSearchParams): Promise<FlightSearchResult> {
    const queryParams = new URLSearchParams({
      from: params.from,
      to: params.to,
      departureDate: params.departureDate,
      adults: params.adults.toString(),
      children: params.children.toString(),
      cabinClass: params.cabinClass,
      tripType: params.tripType,
    });

    if (params.returnDate) {
      queryParams.append('returnDate', params.returnDate);
    }

    if (params.infants) {
      queryParams.append('infants', params.infants.toString());
    }

    if (params.flexible) {
      queryParams.append('flexible', 'true');
    }

    const response = await fetch(`${this.baseUrl}/flights?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la recherche de vols');
    }

    return response.json();
  }

  async getFlightDetails(flightId: string): Promise<Flight> {
    const response = await fetch(`${this.baseUrl}/flights/${flightId}`);
    
    if (!response.ok) {
      throw new Error('Vol non trouvé');
    }

    return response.json();
  }

  async getPopularDestinations(): Promise<Array<{
    city: string;
    country: string;
    price: number;
    image: string;
  }>> {
    const response = await fetch(`${this.baseUrl}/flights/popular-destinations`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des destinations');
    }

    return response.json();
  }

  async getPriceHistory(route: string, period: string = '30d'): Promise<Array<{
    date: string;
    price: number;
  }>> {
    const response = await fetch(`${this.baseUrl}/flights/price-history?route=${route}&period=${period}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement de l\'historique des prix');
    }

    return response.json();
  }

  async createPriceAlert(params: {
    route: string;
    targetPrice: number;
    email: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/flights/price-alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'alerte');
    }
  }

  filterFlights(flights: Flight[], filters: FlightFilters): Flight[] {
    return flights.filter(flight => {
      // Filtre par prix
      if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) {
        return false;
      }

      // Filtre par escales
      if (filters.stops && filters.stops.length > 0 && !filters.stops.includes(flight.stops)) {
        return false;
      }

      // Filtre par compagnies
      if (filters.airlines && filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false;
      }

      // Filtre par aéroports
      if (filters.airports && filters.airports.length > 0) {
        const hasAirport = filters.airports.includes(flight.departure.code) || 
                          filters.airports.includes(flight.arrival.code);
        if (!hasAirport) return false;
      }

      return true;
    });
  }

  sortFlights(flights: Flight[], sortBy: 'price' | 'duration' | 'departure'): Flight[] {
    return [...flights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'departure':
          return a.departure.time.localeCompare(b.departure.time);
        default:
          return 0;
      }
    });
  }
}

export const flightService = new FlightService();