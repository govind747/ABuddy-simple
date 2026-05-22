import { useRef } from 'react';
import { type Order } from '@/lib/supabase-db';
import { Button } from '@/components/ui/button';
import { X, Printer, Download, Check, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderReceiptProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

export function OrderReceipt({ order, open, onClose }: OrderReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    const content = receiptRef.current?.innerHTML ?? '';
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Receipt ${order.order_number}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #16a34a; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left; }
        th { font-size: 12px; text-transform: uppercase; color: #6b7280; }
        .total { font-size: 18px; font-weight: bold; color: #16a34a; }
        .badge { display: inline-block; background: #dcfce7; color: #16a34a; padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; }
      </style></head><body>${content}</body></html>
    `);
    win.document.close();
    win.print();
  }

  function handleDownload() {
    const content = receiptRef.current?.innerText ?? '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.order_number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const statusColor = {
    confirmed: 'text-green-600 bg-green-100',
    pending: 'text-yellow-600 bg-yellow-100',
    cancelled: 'text-red-600 bg-red-100',
  }[order.status] ?? 'text-gray-600 bg-gray-100';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background">
              <h2 className="font-bold text-foreground">Order Receipt</h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handlePrint} className="rounded-full gap-1.5 text-xs">
                  <Printer className="h-3.5 w-3.5" /> Print
                </Button>
                <Button size="sm" variant="outline" onClick={handleDownload} className="rounded-full gap-1.5 text-xs">
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Receipt content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div ref={receiptRef}>
                {/* Header */}
                <div className="header text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Compass className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold text-primary">TRAVEL</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Your trusted travel partner</p>

                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mt-2">Booking Confirmed!</h3>
                  <p className="text-sm text-muted-foreground">Order #{order.order_number}</p>
                </div>

                {/* Status badge */}
                <div className="text-center mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColor}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order details */}
                <div className="border border-border rounded-xl overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-3 text-muted-foreground text-xs uppercase font-semibold">Order Number</td>
                        <td className="p-3 font-semibold text-foreground">{order.order_number}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3 text-muted-foreground text-xs uppercase font-semibold">Date</td>
                        <td className="p-3 text-foreground">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                      {order.travel_date && (
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground text-xs uppercase font-semibold">Travel Date</td>
                          <td className="p-3 text-foreground">{order.travel_date}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border">
                        <td className="p-3 text-muted-foreground text-xs uppercase font-semibold">Payment</td>
                        <td className="p-3 text-foreground capitalize">{order.payment_method?.replace('_', ' ') ?? 'N/A'}</td>
                      </tr>
                      {order.traveler_name && (
                        <tr className="border-b border-border">
                          <td className="p-3 text-muted-foreground text-xs uppercase font-semibold">Traveler</td>
                          <td className="p-3 text-foreground">{order.traveler_name}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Items */}
                {(order.order_items ?? []).length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Items</p>
                    <div className="space-y-2">
                      {(order.order_items ?? []).map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/50">
                          <div>
                            <p className="font-medium text-sm text-foreground">{item.package_title}</p>
                            {item.destination && <p className="text-xs text-muted-foreground">{item.destination} · {item.travelers} traveler{item.travelers > 1 ? 's' : ''}</p>}
                          </div>
                          <p className="font-semibold text-foreground">${item.total_price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="bg-primary/5 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-bold text-foreground">Total Paid</span>
                  <span className="text-2xl font-bold text-primary">${order.total_amount.toLocaleString()}</span>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                  Thank you for choosing Travel! For support, contact us at support@travel.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
