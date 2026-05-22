import { useParams, Link } from 'wouter';
import { Star, MapPin, Clock, ArrowLeft, Users, ShoppingCart, Check, Globe, Camera, Utensils, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchDestination, fetchPackages } from '@/lib/supabase-queries';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const HIGHLIGHTS = [
  { icon: Globe, label: 'World-class views', color: 'bg-blue-50 text-blue-600' },
  { icon: Camera, label: 'Photography spots', color: 'bg-purple-50 text-purple-600' },
  { icon: Utensils, label: 'Local cuisine', color: 'bg-orange-50 text-orange-600' },
  { icon: Shield, label: 'Safe & guided', color: 'bg-green-50 text-green-600' },
];

function PackageCard({ pkg }: {
  pkg: { id: number; title: string; imageUrl: string; price: number; originalPrice?: number | null; duration: string; rating?: number | null; destinationName?: string | null };
}) {
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = isInCart(pkg.id);

  function handleCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: pkg.id, title: pkg.title, destinationName: pkg.destinationName ?? null, imageUrl: pkg.imageUrl, price: pkg.price, duration: pkg.duration, rating: pkg.rating ?? null });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group border border-border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300" data-testid={`card-package-${pkg.id}`}>
      <div className="relative overflow-hidden aspect-[16/9]">
        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button
          onClick={handleCart}
          disabled={inCart}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${inCart ? 'bg-primary text-primary-foreground' : 'bg-white hover:bg-primary hover:text-white text-foreground'}`}
        >
          {(inCart || added) ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
        </button>
        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-1 line-clamp-1">{pkg.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="h-3 w-3" />{pkg.duration}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {pkg.originalPrice && <p className="text-xs text-muted-foreground line-through">${pkg.originalPrice.toLocaleString()}</p>}
            <p className="font-bold text-primary">${pkg.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/person</span></p>
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm" className="rounded-full text-xs">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DestinationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? '0', 10);

  const { data: dest, isLoading } = useQuery({ queryKey: ['destination', id], queryFn: () => fetchDestination(id), enabled: !!id });
  const { data: packages } = useQuery({ queryKey: ['packages-by-dest', id], queryFn: () => fetchPackages({ destinationId: id }), enabled: !!id });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-[60vh] w-full" />
        <div className="container py-12 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Globe className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-medium text-foreground mb-1">Destination not found</p>
          <p className="text-muted-foreground text-sm mb-4">It may have been moved or removed</p>
          <Link href="/destinations"><Button className="rounded-full">Back to Destinations</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[65vh] overflow-hidden">
        <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Back link */}
        <div className="absolute top-6 left-0 right-0">
          <div className="container">
            <Link href="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors bg-black/20 backdrop-blur-sm rounded-full px-4 py-2" data-testid="link-back">
              <ArrowLeft className="h-4 w-4" /> All Destinations
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 text-white/70 mb-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{dest.country}</span>
                {dest.featured && (
                  <Badge className="bg-primary text-primary-foreground border-none text-xs ml-2">Featured</Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{dest.name}</h1>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.round(dest.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`} />
                  ))}
                  <span className="text-white/80 text-sm ml-1">{dest.rating.toFixed(1)}</span>
                  <span className="text-white/50 text-sm">({dest.reviewCount} reviews)</span>
                </div>
                {dest.duration && (
                  <div className="flex items-center gap-1.5 text-white/80 text-sm bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{dest.duration}</span>
                  </div>
                )}
                {(packages ?? []).length > 0 && (
                  <div className="flex items-center gap-1.5 text-white/80 text-sm bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <Users className="h-4 w-4" />
                    <span>{(packages ?? []).length} package{(packages ?? []).length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold text-foreground mb-4">Why Visit {dest.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {HIGHLIGHTS.map(({ icon: Icon, label, color }) => (
                  <div key={label} className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center ${color}`}>
                    <Icon className="h-6 w-6" />
                    <span className="text-xs font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* About */}
            {dest.description && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-xl font-bold text-foreground mb-3">About {dest.name}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{dest.description}</p>
              </motion.div>
            )}

            {/* Packages */}
            {(packages ?? []).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-foreground">Available Packages</h2>
                  <Badge variant="secondary" className="rounded-full">{(packages ?? []).length} packages</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(packages ?? []).map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="sticky top-24 space-y-4">
              {/* Pricing card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting from</p>
                <p className="text-4xl font-black text-primary mb-1">${dest.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mb-5">per person · prices vary by package</p>

                <Link href="/packages">
                  <Button className="w-full rounded-full mb-3 h-12 text-base font-bold" data-testid="button-book-now">
                    Browse All Packages
                  </Button>
                </Link>
                {(packages ?? []).length > 0 && (
                  <Link href={`/packages/${(packages ?? [])[0].id}`}>
                    <Button variant="outline" className="w-full rounded-full">
                      View Best Package
                    </Button>
                  </Link>
                )}
              </div>

              {/* Info card */}
              <div className="bg-secondary/50 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-sm text-foreground">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country</span>
                    <span className="font-semibold text-foreground">{dest.country}</span>
                  </div>
                  {dest.duration && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold text-foreground">{dest.duration}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {dest.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-semibold text-foreground">{(dest.reviewCount ?? 0).toLocaleString()}</span>
                  </div>
                  {(packages ?? []).length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Packages</span>
                      <span className="font-semibold text-foreground">{(packages ?? []).length} available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Need help */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold text-foreground mb-1">Need help planning?</p>
                <p className="text-xs text-muted-foreground mb-3">Our travel experts are here to help you</p>
                <Link href="/packages">
                  <Button size="sm" variant="outline" className="rounded-full w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Get Expert Advice
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
