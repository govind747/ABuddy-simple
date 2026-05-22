import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder, generateOrderNumber, type Order } from '@/lib/supabase-db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OrderReceipt } from '@/components/cart/OrderReceipt';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, CreditCard, Building2, Shield, Check, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const BANK_DETAILS = {
  bankName: 'HDFC Bank',
  accountName: 'Travel & Tours Pvt Ltd',
  accountNumber: '50100123456789',
  ifscCode: 'HDFC0001234',
  branch: 'Main Branch, Mumbai',
  swiftCode: 'HDFCINBB',
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'bank_transfer'>('razorpay');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name ?? '',
    email: user?.email ?? '',
    mobile: '',
    travel_date: '',
    notes: '',
  });

  function set(k: string, v: string) { setForm(p => ({ ...p, [k]: v })); }

  async function handleRazorpay(orderId: number, orderNumber: string) {
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string;
    if (!keyId) {
      alert('Razorpay is not configured. Please contact support.');
      return;
    }
    const loaded = await loadRazorpay();
    if (!loaded) { alert('Failed to load payment gateway. Please try again.'); return; }

    const rz = new window.Razorpay({
      key: keyId,
      amount: Math.round(total * 100),
      currency: 'INR',
      name: 'Travel & Tours',
      description: `Booking ${orderNumber}`,
      order_id: orderNumber,
      prefill: { name: form.name, email: form.email, contact: form.mobile },
      theme: { color: '#16a34a' },
      handler: async (response: Record<string, string>) => {
        const { data } = await import('@/lib/supabase-db').then(m =>
          m.updateOrderStatus(orderId, 'confirmed', response.razorpay_payment_id)
        );
        setCompletedOrder(data);
        clearCart();
        setStep('success');
      },
    });
    rz.open();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    try {
      const orderNumber = generateOrderNumber();
      const { data: order, error } = await createOrder({
        user_id: user.id,
        order_number: orderNumber,
        total_amount: total,
        status: paymentMethod === 'bank_transfer' ? 'pending' : 'pending',
        payment_method: paymentMethod,
        payment_id: null,
        payment_status: 'pending',
        traveler_name: form.name,
        traveler_email: form.email,
        traveler_mobile: form.mobile,
        travel_date: form.travel_date || null,
        notes: form.notes || null,
      });

      if (error || !order) throw new Error('Failed to create order');

      // Insert order items
      const { supabaseDb } = await import('@/lib/supabase-db');
      await supabaseDb.from('order_items').insert(
        items.map(i => ({
          order_id: order.id,
          package_id: i.package.id,
          package_title: i.package.title,
          destination: i.package.destinationName,
          image_url: i.package.imageUrl,
          unit_price: i.package.price,
          travelers: i.travelers,
          total_price: i.package.price * i.travelers,
        }))
      );

      if (paymentMethod === 'razorpay') {
        await handleRazorpay(order.id, order.order_number);
      } else {
        setCompletedOrder(order);
        clearCart();
        setStep('success');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some packages to proceed to checkout</p>
          <Link href="/packages"><Button className="rounded-full">Browse Packages</Button></Link>
        </div>
      </div>
    );
  }

  if (step === 'success' && completedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Order #{completedOrder.order_number}</p>
          {paymentMethod === 'bank_transfer' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left mb-4">
              <p className="font-semibold text-yellow-800 text-sm mb-2">Complete Bank Transfer</p>
              <div className="text-xs text-yellow-700 space-y-1">
                <p><strong>Bank:</strong> {BANK_DETAILS.bankName}</p>
                <p><strong>Account:</strong> {BANK_DETAILS.accountName}</p>
                <p><strong>Account No:</strong> {BANK_DETAILS.accountNumber}</p>
                <p><strong>IFSC:</strong> {BANK_DETAILS.ifscCode}</p>
                <p><strong>Amount:</strong> ₹{completedOrder.total_amount.toLocaleString()}</p>
                <p className="text-yellow-600 mt-2">Reference your order number <strong>{completedOrder.order_number}</strong> in the transfer</p>
              </div>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="rounded-full" onClick={() => setShowReceipt(true)}>View Receipt</Button>
            <Link href="/dashboard"><Button className="rounded-full">My Orders</Button></Link>
          </div>
          {completedOrder && <OrderReceipt order={completedOrder} open={showReceipt} onClose={() => setShowReceipt(false)} />}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container py-10 max-w-5xl">
        <Link href="/packages" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Packages
        </Link>
        <h1 className="text-2xl font-bold text-foreground mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              {/* Traveler details */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">1</span>
                  Traveler Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name *</Label>
                    <Input value={form.name} onChange={e => set('name', e.target.value)} required className="rounded-xl" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email *</Label>
                    <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} required className="rounded-xl" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Mobile *</Label>
                    <Input type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} required className="rounded-xl" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Preferred Travel Date</Label>
                    <Input type="date" value={form.travel_date} onChange={e => set('travel_date', e.target.value)} className="rounded-xl" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Special Requests</Label>
                    <Textarea value={form.notes} onChange={e => set('notes', e.target.value)} className="rounded-xl resize-none" rows={3} placeholder="Dietary needs, accessibility, special occasions..." />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">2</span>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <button type="button" onClick={() => setPaymentMethod('razorpay')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-primary' : 'border-muted-foreground'}`}>
                      {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">Pay with Razorpay</p>
                      <p className="text-xs text-muted-foreground">Credit/Debit card, UPI, Net Banking, Wallets</p>
                    </div>
                    <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Recommended</span>
                  </button>

                  <button type="button" onClick={() => setPaymentMethod('bank_transfer')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-primary' : 'border-muted-foreground'}`}>
                      {paymentMethod === 'bank_transfer' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">Direct deposit — booking confirmed after transfer</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {paymentMethod === 'bank_transfer' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm space-y-1.5">
                          <p className="font-semibold text-blue-900 mb-2">Bank Transfer Details</p>
                          {Object.entries({ 'Bank Name': BANK_DETAILS.bankName, 'Account Name': BANK_DETAILS.accountName, 'Account Number': BANK_DETAILS.accountNumber, 'IFSC Code': BANK_DETAILS.ifscCode, 'Branch': BANK_DETAILS.branch, 'SWIFT Code': BANK_DETAILS.swiftCode }).map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                              <span className="text-blue-700 text-xs">{k}</span>
                              <span className="text-blue-900 font-semibold text-xs">{v}</span>
                            </div>
                          ))}
                          <p className="text-blue-600 text-xs mt-2 pt-2 border-t border-blue-200">⚠ Include your name and email as reference when transferring</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="font-bold text-foreground mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={item.package.id} className="flex gap-3">
                      <img src={item.package.imageUrl} alt={item.package.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight truncate">{item.package.title}</p>
                        <p className="text-xs text-muted-foreground">{item.travelers} traveler{item.travelers > 1 ? 's' : ''} · {item.package.duration}</p>
                        <p className="text-sm font-bold text-primary">${(item.package.price * item.travelers).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="text-green-600">Included</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full rounded-full h-12 font-semibold" disabled={loading || !form.name || !form.email || !form.mobile}>
                  {loading ? 'Processing...' : paymentMethod === 'razorpay' ? 'Pay Now' : 'Confirm Booking'}
                </Button>
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" /> 100% Secure & Encrypted
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
