import { Hotel, SearchParams, FilterOptions, ApiResponse } from '@/types';

class HotelService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  async searchHotels(params: SearchParams): Promise<ApiResponse<{hotels: Hotel[], totalCount: number}>> {
    const queryParams = new URLSearchParams({
      destination: params.to || '',
      checkIn: params.checkIn || '',
      checkOut: params.checkOut || '',
      rooms: params.rooms?.toString() || '1',
      adults: params.adults.toString(),
      children: params.children.toString(),
    });

    const response = await fetch(`${this.baseUrl}/hotels?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la recherche d\'hôtels');
    }

    return response.json();
  }

  async getHotelDetails(hotelId: string): Promise<Hotel> {
    const response = await fetch(`${this.baseUrl}/hotels/${hotelId}`);
    
    if (!response.ok) {
      throw new Error('Hôtel non trouvé');
    }

    return response.json();
  }

  async getFeaturedHotels(): Promise<Hotel[]> {
    const response = await fetch(`${this.baseUrl}/hotels/featured`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des hôtels recommandés');
    }

    return response.json();
  }

  async getHotelsByDestination(destination: string): Promise<Hotel[]> {
    const response = await fetch(`${this.baseUrl}/hotels/destination/${destination}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des hôtels');
    }

    return response.json();
  }

  filterHotels(hotels: Hotel[], filters: FilterOptions): Hotel[] {
    return hotels.filter(hotel => {
      // Filtre par prix
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }

      // Filtre par étoiles
      if (filters.stars && filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) {
        return false;
      }

      // Filtre par note
      if (filters.rating && hotel.rating < filters.rating) {
        return false;
      }

      // Filtre par équipements
      if (filters.amenities && filters.amenities.length > 0) {
        const hotelAmenities = hotel.amenities.map(a => a.name);
        const hasAmenity = filters.amenities.some(amenity => hotelAmenities.includes(amenity));
        if (!hasAmenity) return false;
      }

      // Filtre par quartier
      if (filters.districts && filters.districts.length > 0) {
        if (!hotel.location.district || !filters.districts.includes(hotel.location.district)) {
          return false;
        }
      }

      return true;
    });
  }

  sortHotels(hotels: Hotel[], sortBy: 'price' | 'rating' | 'stars' | 'distance'): Hotel[] {
    return [...hotels].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'stars':
          return b.stars - a.stars;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });
  }
}

export const hotelService = new HotelService();