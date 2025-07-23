'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
  error_message?: string;
  booking: {
    id: string;
    booking_type: string;
    flight_details?: {
      flight?: unknown;
      searchParams?: unknown;
    };
  };
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        const { data, error } = await supabase
          .from('payments')
          .select(`
            id,
            amount,
            currency,
            payment_method,
            status,
            created_at,
            error_message,
            booking:bookings!inner(
              id,
              booking_type,
              flight_details
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (!error && data) {
          // Transform the data to match Payment interface
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedPayments = data.map((p: any) => ({
            ...p,
            booking: Array.isArray(p.booking) ? p.booking[0] : p.booking
          }));
          setPayments(formattedPayments);
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'failed':
        return <XCircle className="text-red-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <RefreshCw className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Réussi';
      case 'failed':
        return 'Échoué';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'orange_money':
        return 'Orange Money';
      case 'wave':
        return 'Wave';
      case 'card':
        return 'Carte Bancaire';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Historique des paiements</h2>
      
      {payments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Aucun paiement trouvé
        </p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <p className="font-medium">
                      {payment.amount.toLocaleString('fr-FR')} {payment.currency}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getPaymentMethodName(payment.payment_method)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {getStatusText(payment.status)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(payment.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              {payment.booking && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Réservation: {payment.booking.booking_type === 'flight' ? 'Vol' : payment.booking.booking_type}
                  </p>
                  {payment.booking.flight_details && (
                    <p className="text-xs text-gray-500">
                      {/* Flight details would be displayed here */}
                      Détails du vol
                    </p>
                  )}
                </div>
              )}
              
              {payment.error_message && payment.status === 'failed' && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-600">
                  {payment.error_message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}