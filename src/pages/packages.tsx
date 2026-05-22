import { useState } from 'react';
import { Link } from 'wouter';
import { Star, Clock, Users, Search, ShoppingCart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/lib/supabase-queries';
import { useCart } from '@/contexts/CartContext';

function PackageCard({ pkg, index }: {
  pkg: { id: number; title: string; imageUrl: string; price: number; originalPrice?: number | null; duration: string; groupSize?: number | null; rating: number | null; reviewCount: number | null; featured: boolean | null; destinationName?: string | null };
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
      data-testid={`card-package-${pkg.id}`}
    >
      {savings && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-red-500 text-white border-none rounded-full px-3">{savings}% OFF</Badge>
        </div>
      )}
      {/* Cart button */}
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
        {pkg.destinationName && <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{pkg.destinationName}</p>}
        <h3 className="font-bold text-lg mb-3 line-clamp-2">{pkg.title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pkg.duration}</span>
          {pkg.groupSize && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Max {pkg.groupSize}</span>}
        </div>
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(pkg.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({pkg.reviewCount ?? 0})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {pkg.originalPrice && <p className="text-xs text-muted-foreground line-through">${pkg.originalPrice.toLocaleString()}</p>}
            <p className="font-bold text-primary text-xl">${pkg.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/person</span></p>
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm" className="rounded-full" data-testid={`button-book-${pkg.id}`}>View Details</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({ queryKey: ['packages'], queryFn: () => fetchPackages({ limit: 50 }) });

  const filtered = (data ?? []).filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.destinationName ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-20">
        <div className="container text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Plan Your Trip</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Packages</h1>
          <p className="text-background/70 max-w-xl mx-auto mb-8">Handcrafted travel packages for every type of adventurer</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-11 h-12 rounded-full bg-background text-foreground border-none"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
      </div>

      <div className="container py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-72 rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No packages found for &quot;{search}&quot;</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">{filtered.length} package{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={{ ...pkg, rating: pkg.rating ?? null, reviewCount: pkg.reviewCount ?? null, featured: pkg.featured ?? null }} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
