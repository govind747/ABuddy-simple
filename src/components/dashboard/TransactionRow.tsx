import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';

interface Transaction {
  id: number;
  packageTitle?: string | null;
  amount: number;
  status: string;
  paymentMethod?: string | null;
  createdAt: string;
}

export function TransactionRow({ tx }: { tx: Transaction }) {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0" data-testid={`row-transaction-${tx.id}`}>
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <CreditCard className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{tx.packageTitle ?? 'Travel Package'}</p>
        <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-bold text-foreground text-sm">${tx.amount.toLocaleString()}</p>
        {tx.paymentMethod && <p className="text-xs text-muted-foreground">{tx.paymentMethod}</p>}
      </div>
      <Badge className={`rounded-full text-xs capitalize shrink-0 ${statusColors[tx.status] ?? 'bg-secondary text-secondary-foreground'}`}>
        {tx.status}
      </Badge>
    </div>
  );
}
