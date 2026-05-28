import { useParams, Link } from 'wouter';
import { Star, Clock, Users, ArrowLeft, Check, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchPackage } from '@/lib/supabase-queries';
import { useCart } from '@/contexts/CartContext';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { BookingForm } from '@/components/home/BookingForm';
import { useState } from 'react';

export default function PackageDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? '0', 10);
  const { addItem, isInCart } = useCart();
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  const { data: pkg, isLoading } = useQuery({ queryKey: ['package', id], queryFn: () => fetchPackage(id), enabled: !!id });

  function handleAddToCart() {
    if (!pkg) return;
    addItem({
      id: pkg.id,
      title: pkg.title,
      destinationName: pkg.destinationName ?? null,
      imageUrl: pkg.imageUrl,
      price: pkg.price,
      duration: pkg.duration,
      rating: pkg.rating,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-[50vh] w-full" />
        <div className="container py-12 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Package not found</p>
          <Link href="/packages"><Button>Back to Packages</Button></Link>
        </div>
      </div>
    );
  }

  const includes = pkg.includes ? pkg.includes.split(',').map(s => s.trim()) : [];
  const inCart = isInCart(pkg.id);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden">
        <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container text-white">
            <Link href="/packages" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Packages
            </Link>
            {pkg.destinationName && (
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">{pkg.destinationName}</p>
            )}
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{pkg.duration}</span>
              {pkg.groupSize && (
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />Max {pkg.groupSize} people</span>
              )}
              <span className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(pkg.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`} />
                ))}
                <span className="ml-1">{pkg.rating ?? 0} ({pkg.reviewCount ?? 0} reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {pkg.description && (
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-foreground">About this Package</h2>
                <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
              </div>
            )}

            {includes.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-foreground">What's Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <ReviewSection packageId={id} />
          </div>

          {/* Booking sidebar */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-sm">
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm text-muted-foreground line-through">${pkg.originalPrice.toLocaleString()}</p>
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                    {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
              <p className="text-3xl font-bold text-primary mb-1">${pkg.price.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mb-6">per person</p>

              <div className="space-y-3 mb-4">
                <Button onClick={() => setBookingFormOpen(true)} className="w-full rounded-full h-12 font-semibold gap-2" data-testid="button-book-now">
                  <Zap className="h-4 w-4" /> Book Now
                </Button>
                <Button
                  variant={inCart ? 'secondary' : 'outline'}
                  className="w-full rounded-full h-12 font-semibold gap-2"
                  onClick={handleAddToCart}
                  disabled={inCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {addedFeedback ? 'Added to Cart!' : inCart ? 'Already in Cart' : 'Add to Cart'}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">Free cancellation up to 48 hours before departure</p>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">{pkg.duration}</span>
                </div>
                {pkg.groupSize && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Group Size</span>
                    <span className="font-semibold text-foreground">Max {pkg.groupSize}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    {pkg.rating ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingForm open={bookingFormOpen} onClose={() => setBookingFormOpen(false)} />
    </div>
  );
}
