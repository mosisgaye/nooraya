'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TrendingDown, DollarSign, Users, AlertCircle } from 'lucide-react';

interface PaymentStats {
  total_revenue: number;
  total_transactions: number;
  success_rate: number;
  pending_payments: number;
  failed_payments: number;
  daily_revenue: { date: string; amount: number }[];
  payment_methods: { method: string; count: number; amount: number }[];
}

export default function PaymentsDashboard() {
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();
        
        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        if (dateRange === '7d') {
          startDate.setDate(startDate.getDate() - 7);
        } else if (dateRange === '30d') {
          startDate.setDate(startDate.getDate() - 30);
        } else if (dateRange === '90d') {
          startDate.setDate(startDate.getDate() - 90);
        }

        // Fetch payment data
        const { data: payments, error } = await supabase
          .from('payments')
          .select('*')
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString());

        if (error) throw error;

        // Calculate statistics
        const totalRevenue = payments
          .filter(p => p.status === 'success')
          .reduce((sum, p) => sum + parseFloat(p.amount), 0);

        const successfulPayments = payments.filter(p => p.status === 'success').length;
        const pendingPayments = payments.filter(p => p.status === 'pending').length;
        const failedPayments = payments.filter(p => p.status === 'failed').length;
        const successRate = payments.length > 0 
          ? (successfulPayments / payments.length) * 100 
          : 0;

        // Group by date for daily revenue
        const dailyRevenue = payments
          .filter(p => p.status === 'success')
          .reduce((acc: Record<string, number>, payment) => {
            const date = new Date(payment.created_at).toLocaleDateString();
            if (!acc[date]) acc[date] = 0;
            acc[date] += parseFloat(payment.amount);
            return acc;
          }, {});

        // Group by payment method
        const methodStats = payments
          .filter(p => p.status === 'success')
          .reduce((acc: Record<string, { count: number; amount: number }>, payment) => {
            if (!acc[payment.payment_method]) {
              acc[payment.payment_method] = { count: 0, amount: 0 };
            }
            acc[payment.payment_method].count += 1;
            acc[payment.payment_method].amount += parseFloat(payment.amount);
            return acc;
          }, {});

        setStats({
          total_revenue: totalRevenue,
          total_transactions: payments.length,
          success_rate: successRate,
          pending_payments: pendingPayments,
          failed_payments: failedPayments,
          daily_revenue: Object.entries(dailyRevenue).map(([date, amount]) => ({
            date,
            amount: amount as number
          })),
          payment_methods: Object.entries(methodStats).map(([method, stats]) => ({
            method,
            count: stats.count,
            amount: stats.amount
          }))
        });

      } catch (err) {
        console.error('Error fetching payment stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord des paiements</h1>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="text-green-500" size={24} />
              <span className="text-sm text-green-500">+15%</span>
            </div>
            <p className="text-2xl font-bold">
              {stats?.total_revenue.toLocaleString('fr-FR')} FCFA
            </p>
            <p className="text-sm text-gray-600">Revenus totaux</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-500" size={24} />
              <span className="text-sm text-gray-500">
                {stats?.success_rate.toFixed(1)}%
              </span>
            </div>
            <p className="text-2xl font-bold">{stats?.total_transactions}</p>
            <p className="text-sm text-gray-600">Transactions</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="text-yellow-500" size={24} />
            </div>
            <p className="text-2xl font-bold">{stats?.pending_payments}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="text-red-500" size={24} />
            </div>
            <p className="text-2xl font-bold">{stats?.failed_payments}</p>
            <p className="text-sm text-gray-600">Échecs</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Méthodes de paiement</h2>
          <div className="space-y-4">
            {stats?.payment_methods.map((method) => (
              <div key={method.method} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {method.method === 'orange_money' && 'Orange Money'}
                    {method.method === 'wave' && 'Wave'}
                    {method.method === 'card' && 'Carte Bancaire'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {method.count} transactions
                  </p>
                </div>
                <p className="font-semibold">
                  {method.amount.toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Logs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <p className="text-gray-500">
            Consultez les logs détaillés dans la base de données
          </p>
        </div>
      </div>
    </div>
  );
}