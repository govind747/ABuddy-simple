import { Link } from 'wouter';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchTopDestinations } from '@/lib/supabase-queries';

function DestinationCard({ dest, index }: { dest: { id: number; name: string; country: string; imageUrl: string; rating: number; reviewCount: number; price: number; duration?: string | null }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`card-destination-${dest.id}`}
    >
      <Link href={`/destinations/${dest.id}`} className="block group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={dest.imageUrl}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{dest.country}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 text-foreground">{dest.name}</h3>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(dest.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({dest.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">From</span>
              <p className="font-bold text-primary text-lg">${dest.price.toLocaleString()}</p>
            </div>
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium group-hover:bg-primary/90 transition-colors">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function TopDestinations() {
  const { data, isLoading } = useQuery({ queryKey: ['top-destinations'], queryFn: fetchTopDestinations });

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Popular Picks</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Top Destinations</h2>
          </motion.div>
          <Link href="/destinations">
            <Button variant="outline" className="hidden md:flex rounded-full">View All Destinations</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden border">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data ?? []).map((dest, i) => (
              <DestinationCard
                key={dest.id}
                dest={{ ...dest, rating: dest.rating ?? 0, reviewCount: dest.reviewCount ?? 0 }}
                index={i}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/destinations">
            <Button variant="outline" className="rounded-full">View All Destinations</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
