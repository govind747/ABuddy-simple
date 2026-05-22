import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCancelHistory, type CancelHistory } from '@/lib/supabase-db';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { XCircle, RefreshCw, Clock } from 'lucide-react';

const REFUND_STATUS: Record<string, { label: string; style: string }> = {
  processing: { label: 'Processing', style: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Refunded', style: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', style: 'bg-red-100 text-red-700' },
};

export default function CancelHistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<CancelHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getCancelHistory(user.id).then(({ data }) => { setHistory(data); setLoading(false); });
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cancellation History</h1>
          <p className="text-muted-foreground text-sm mt-1">Your cancelled bookings and refund status</p>
        </div>

        {loading ? (
          <div className="space-y-4">{[1, 2].map(i => <div key={i} className="h-28 bg-secondary animate-pulse rounded-2xl" />)}</div>
        ) : history.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <XCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">No cancellations</p>
            <p className="text-sm text-muted-foreground">You have no cancelled bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map(item => {
              const refund = REFUND_STATUS[item.refund_status ?? 'processing'] ?? REFUND_STATUS.processing;
              return (
                <div key={item.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-foreground text-sm">{item.package_title ?? 'Unknown Package'}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${refund.style}`}>{refund.label}</span>
                      </div>
                      {item.destination && <p className="text-xs text-muted-foreground">{item.destination}</p>}
                      {item.order_number && <p className="text-xs text-muted-foreground">Order #{item.order_number}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      {item.original_amount != null && (
                        <p className="text-xs text-muted-foreground line-through">${item.original_amount.toLocaleString()}</p>
                      )}
                      {item.refund_amount != null && (
                        <p className="font-bold text-primary text-sm">Refund: ${item.refund_amount.toLocaleString()}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Cancelled {new Date(item.cancelled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {item.reason && <span>Reason: {item.reason}</span>}
                    {item.refund_status === 'processing' && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <RefreshCw className="h-3 w-3" /> Refund in 5-7 business days
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
