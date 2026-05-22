import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TransactionRow } from '@/components/dashboard/TransactionRow';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '@/lib/supabase-queries';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TxHistoryPage() {
  const { user } = useAuth();
  const { data: transactions, isLoading } = useQuery({ queryKey: ['transactions', user?.id], queryFn: () => fetchTransactions(user!.id), enabled: !!user?.id });

  const total = (transactions ?? []).filter(t => t.status === 'completed').reduce((s, t) => s + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground text-sm mt-1">All your payment records and bookings</p>
        </div>

        {isLoading ? (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="space-y-4">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
          </div>
        ) : (transactions ?? []).length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-semibold text-foreground mb-2">No transactions yet</p>
            <p className="text-sm text-muted-foreground">Your payment history will appear here after you book a trip</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">${total.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-sm text-muted-foreground mb-1">Transactions</p>
                <p className="text-2xl font-bold text-foreground">{(transactions ?? []).length}</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-bold text-foreground mb-2">All Transactions</h2>
              <div>
                {(transactions ?? []).map(tx => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
