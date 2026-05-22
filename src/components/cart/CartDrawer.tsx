import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, removeItem, updateTravelers, clearCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-background shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Your Cart</h2>
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-destructive hover:underline">Clear all</button>
                )}
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingCart className="h-14 w-14 text-muted-foreground/30 mb-4" />
                  <p className="font-semibold text-foreground mb-1">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mb-6">Browse our packages and add your favourites</p>
                  <Button variant="outline" className="rounded-full" onClick={onClose} asChild>
                    <Link href="/packages">Explore Packages</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.package.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="relative h-36">
                      <img src={item.package.imageUrl} alt={item.package.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button
                        onClick={() => removeItem(item.package.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-destructive/80 rounded-full text-white transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-bold text-sm leading-tight">{item.package.title}</p>
                        {item.package.destinationName && <p className="text-white/70 text-xs">{item.package.destinationName}</p>}
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Travelers</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateTravelers(item.package.id, item.travelers - 1)} className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">{item.travelers}</span>
                          <button onClick={() => updateTravelers(item.package.id, item.travelers + 1)} className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">${item.package.price.toLocaleString()} × {item.travelers}</p>
                        <p className="font-bold text-primary">${(item.package.price * item.travelers).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-border bg-background">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">${total.toLocaleString()}</span>
                </div>
                <Link href="/checkout" onClick={onClose}>
                  <Button className="w-full rounded-full h-12 font-semibold gap-2">
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-3">Free cancellation up to 48h before departure</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
