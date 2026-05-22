import { useState } from 'react';
import { Link } from 'wouter';
import { Star, MapPin, Search, Globe, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchDestinations } from '@/lib/supabase-queries';

const CONTINENTS = ['All', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];

function DestinationCard({ dest, index }: {
  dest: { id: number; name: string; country: string; imageUrl: string; price: number; rating: number; reviewCount: number; featured?: boolean | null; description?: string | null };
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group relative"
      data-testid={`card-destination-${dest.id}`}
    >
      <Link href={`/destinations/${dest.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
          <img
            src={dest.imageUrl}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            {dest.featured && (
              <Badge className="bg-primary text-primary-foreground border-none text-xs font-bold px-3 shadow-lg">
                Featured
              </Badge>
            )}
            <div className="ml-auto flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-xs font-bold">{dest.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
              <MapPin className="h-3 w-3" />
              <span>{dest.country}</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2 leading-tight">{dest.name}</h3>

            {dest.description && (
              <p className="text-white/70 text-xs leading-relaxed line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {dest.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">From</p>
                <p className="text-white font-black text-lg">${dest.price.toLocaleString()}</p>
              </div>
              <div className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                Explore →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function DestinationCardWide({ dest, index }: {
  dest: { id: number; name: string; country: string; imageUrl: string; price: number; rating: number; reviewCount: number; featured?: boolean | null; description?: string | null };
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group"
      data-testid={`card-destination-${dest.id}`}
    >
      <Link href={`/destinations/${dest.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] cursor-pointer">
          <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6">
            <div>
              <p className="text-white/60 text-xs flex items-center gap-1 mb-1"><MapPin className="h-3 w-3" />{dest.country}</p>
              <h3 className="text-white font-bold text-2xl mb-1">{dest.name}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white/80 text-xs">{dest.rating.toFixed(1)} ({dest.reviewCount})</span>
                </div>
                <span className="text-primary font-bold">From ${dest.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [activeContinent, setActiveContinent] = useState('All');
  const { data, isLoading } = useQuery({ queryKey: ['destinations'], queryFn: () => fetchDestinations(50) });

  const filtered = (data ?? []).filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const featured = filtered.filter(d => d.featured);
  const rest = filtered.filter(d => !d.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80"
          alt="Destinations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-white text-sm font-semibold mb-4">
              <Globe className="h-4 w-4" /> Explore the World
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">All Destinations</h1>
            <p className="text-white/80 max-w-md mx-auto mb-6">Discover breathtaking locations across every continent</p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-11 h-12 rounded-full bg-white/95 text-foreground border-none shadow-xl"
                placeholder="Search by name or country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-20">
        <div className="container flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          {CONTINENTS.map(c => (
            <button
              key={c}
              onClick={() => setActiveContinent(c)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeContinent === c
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Globe className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-medium text-foreground mb-1">No destinations found</p>
            <p className="text-muted-foreground text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> destination{filtered.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
                <TrendingUp className="h-4 w-4" />
                <span>Sorted by popularity</span>
              </div>
            </div>

            {/* Featured destinations */}
            {featured.length > 0 && !search && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-foreground">Featured Destinations</h2>
                  <Badge variant="secondary" className="rounded-full">Top Picks</Badge>
                </div>
                <AnimatePresence>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featured.slice(0, 2).map((dest, i) => (
                      <DestinationCardWide key={dest.id} dest={{ ...dest, rating: dest.rating ?? 0, reviewCount: dest.reviewCount ?? 0 }} index={i} />
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            )}

            {/* All destinations */}
            <div>
              {featured.length > 0 && !search && (
                <h2 className="text-xl font-bold text-foreground mb-6">All Destinations</h2>
              )}
              <AnimatePresence>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(search ? filtered : rest.length > 0 ? rest : filtered).map((dest, i) => (
                    <DestinationCard key={dest.id} dest={{ ...dest, rating: dest.rating ?? 0, reviewCount: dest.reviewCount ?? 0 }} index={i} />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
