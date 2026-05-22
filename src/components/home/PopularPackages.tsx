import { Link } from 'wouter';
import { Star, Clock, Users, ShoppingCart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularPackages } from '@/lib/supabase-queries';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

function PackageCard({ pkg, index }: {
  pkg: { id: number; title: string; imageUrl: string; price: number; originalPrice?: number | null; duration: string; groupSize?: number | null; rating: number; reviewCount: number; featured: boolean; destinationName?: string | null };
  index: number;
}) {
  const { addItem, isInCart } = useCart();
  const [addedFeedback, setAddedFeedback] = useState(false);
  const savings = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : null;
  const inCart = isInCart(pkg.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: pkg.id, title: pkg.title, destinationName: pkg.destinationName ?? null, imageUrl: pkg.imageUrl, price: pkg.price, duration: pkg.duration, rating: pkg.rating });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
      data-testid={`card-package-${pkg.id}`}
    >
      {savings && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-red-500 text-white border-none rounded-full px-3">{savings}% OFF</Badge>
        </div>
      )}
      {/* Add-to-cart button top-right corner */}
      <button
        onClick={handleAddToCart}
        disabled={inCart}
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${inCart ? 'bg-primary text-primary-foreground' : 'bg-white/90 backdrop-blur-sm hover:bg-primary hover:text-white text-foreground'}`}
        title={inCart ? 'Added to cart' : 'Add to cart'}
      >
        {(inCart || addedFeedback) ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      </button>

      <div className="aspect-[16/10] overflow-hidden">
        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-5">
        {pkg.destinationName && (
          <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{pkg.destinationName}</p>
        )}
        <h3 className="font-bold text-lg mb-3 text-foreground line-clamp-2">{pkg.title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pkg.duration}</span>
          {pkg.groupSize && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Max {pkg.groupSize}</span>}
        </div>
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(pkg.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({pkg.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {pkg.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">${pkg.originalPrice.toLocaleString()}</p>
            )}
            <p className="font-bold text-primary text-xl">${pkg.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/person</span></p>
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm" className="rounded-full" data-testid={`button-book-package-${pkg.id}`}>View Details</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function PopularPackages() {
  const { data, isLoading } = useQuery({ queryKey: ['popular-packages'], queryFn: fetchPopularPackages });

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Handpicked For You</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Popular Packages</h2>
          </motion.div>
          <Link href="/packages">
            <Button variant="outline" className="hidden md:flex rounded-full">View All Packages</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden border">
                <Skeleton className="aspect-[16/10] w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data ?? []).slice(0, 3).map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={{ ...pkg, rating: pkg.rating ?? 0, reviewCount: pkg.reviewCount ?? 0, featured: pkg.featured ?? false }} index={i} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/packages">
            <Button variant="outline" className="rounded-full">View All Packages</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
