import { Booking, BookingRequest, BookingStatus } from '../types';

class BookingService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  async createBooking(request: BookingRequest): Promise<Booking> {
    const response = await fetch(`${this.baseUrl}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création de la réservation');
    }

    return response.json();
  }

  async getBooking(bookingId: string): Promise<Booking> {
    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Réservation non trouvée');
    }

    return response.json();
  }

  async getUserBookings(): Promise<Booking[]> {
    const response = await fetch(`${this.baseUrl}/bookings/user`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des réservations');
    }

    return response.json();
  }

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking> {
    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la réservation');
    }

    return response.json();
  }

  async cancelBooking(bookingId: string, reason?: string): Promise<Booking> {
    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'annulation de la réservation');
    }

    return response.json();
  }

  async getBookingInvoice(bookingId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/invoice`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement de la facture');
    }

    return response.blob();
  }

  generateBookingReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ALB${result}`;
  }

  calculateTotalPrice(items: { price: number; quantity: number }[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

export const bookingService = new BookingService();