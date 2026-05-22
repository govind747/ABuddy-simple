import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders, cancelOrder, type Order } from '@/lib/supabase-db';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { OrderReceipt } from '@/components/cart/OrderReceipt';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Eye, XCircle, ChevronDown, ChevronUp, Calendar, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-blue-100 text-blue-700',
};

function OrderRow({ order, onCancel }: { order: Order; onCancel: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  async function handleCancel() {
    const reason = prompt('Reason for cancellation (optional):') ?? '';
    setCancelling(true);
    await onCancel(order.id);
    setCancelling(false);
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-bold text-foreground text-sm">#{order.order_number}</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
              {order.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" />{order.payment_method?.replace('_', ' ') ?? 'N/A'}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-primary text-lg">${order.total_amount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{(order.order_items ?? []).length} item{(order.order_items ?? []).length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="px-5 pb-4 flex items-center gap-2 border-t border-border pt-4">
        <Button size="sm" variant="outline" onClick={() => setShowReceipt(true)} className="rounded-full gap-1.5 text-xs">
          <Eye className="h-3.5 w-3.5" /> Receipt
        </Button>
        {order.status !== 'cancelled' && order.status !== 'refunded' && (
          <Button size="sm" variant="destructive" onClick={handleCancel} disabled={cancelling} className="rounded-full gap-1.5 text-xs">
            <XCircle className="h-3.5 w-3.5" /> {cancelling ? 'Cancelling...' : 'Cancel'}
          </Button>
        )}
        <button onClick={() => setExpanded(!expanded)} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (order.order_items ?? []).length > 0 && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
              {(order.order_items ?? []).map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  {item.image_url && <img src={item.image_url} alt={item.package_title} className="w-12 h-12 rounded-xl object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.package_title}</p>
                    {item.destination && <p className="text-xs text-muted-foreground">{item.destination} · {item.travelers} traveler{item.travelers > 1 ? 's' : ''}</p>}
                  </div>
                  <p className="font-semibold text-sm text-foreground shrink-0">${item.total_price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <OrderReceipt order={order} open={showReceipt} onClose={() => setShowReceipt(false)} />
    </div>
  );
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserOrders(user.id).then(({ data }) => { setOrders(data); setLoading(false); });
  }, [user]);

  async function handleCancel(orderId: number) {
    if (!user) return;
    await cancelOrder(orderId, user.id, '');
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">Your booking history and order details</p>
        </div>

        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-32 bg-secondary animate-pulse rounded-2xl" />)}</div>
        ) : orders.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">No orders yet</p>
            <p className="text-sm text-muted-foreground">Your bookings will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => <OrderRow key={order.id} order={order} onCancel={handleCancel} />)}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
