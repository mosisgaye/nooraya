export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  status: BookingStatus;
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  currency: string;
  passengers?: Passenger[];
  contact: ContactInfo;
  payment: PaymentInfo;
  items: BookingItem[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passport?: PassportInfo;
}

export interface PassportInfo {
  number: string;
  expiryDate: string;
  issuingCountry: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  emergencyContact?: EmergencyContact;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'bank_transfer';
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string;
  paidAt?: string;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'transfer' | 'insurance';
  details: any; // Flight | Hotel | etc.
  price: number;
  quantity: number;
}

export interface BookingRequest {
  type: 'flight' | 'hotel' | 'package';
  items: BookingItem[];
  passengers: Passenger[];
  contact: ContactInfo;
  payment: {
    method: 'card' | 'paypal' | 'bank_transfer';
    cardToken?: string;
  };
}