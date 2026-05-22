import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tag, Clock, Copy, Check, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { getActiveOffers, type Offer } from '@/lib/supabase-db';

const DEMO_OFFERS: Offer[] = [
  { id: 1, title: 'Early Bird Special', description: 'Book 60 days in advance and save big on your dream getaway. Limited spots available!', image_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', discount_percent: 30, discount_amount: null, coupon_code: 'EARLY30', package_id: null, destination_id: null, valid_from: new Date().toISOString(), valid_until: new Date(Date.now() + 90 * 86400000).toISOString(), active: true, badge: 'HOT', created_at: new Date().toISOString() },
  { id: 2, title: "Couple's Retreat", description: 'Romantic escapes for two — special discounts on curated couple packages with premium inclusions.', image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', discount_percent: 20, discount_amount: null, coupon_code: 'COUPLE20', package_id: null, destination_id: null, valid_from: new Date().toISOString(), valid_until: new Date(Date.now() + 60 * 86400000).toISOString(), active: true, badge: 'NEW', created_at: new Date().toISOString() },
  { id: 3, title: 'Group Explorer', description: 'Groups of 6+ get exclusive negotiated rates. The more you travel together, the more you save.', image_url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', discount_percent: 25, discount_amount: null, coupon_code: 'GROUP25', package_id: null, destination_id: null, valid_from: new Date().toISOString(), valid_until: new Date(Date.now() + 120 * 86400000).toISOString(), active: true, badge: 'SALE', created_at: new Date().toISOString() },
  { id: 4, title: 'Weekend Getaway', description: 'Flat 15% off all short-trip packages. Perfect for a spontaneous mini-break.', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', discount_percent: 15, discount_amount: null, coupon_code: 'WEEKEND15', package_id: null, destination_id: null, valid_from: new Date().toISOString(), valid_until: new Date(Date.now() + 30 * 86400000).toISOString(), active: true, badge: null, created_at: new Date().toISOString() },
  { id: 5, title: 'Honeymoon Bliss', description: 'Exclusive honeymoon packages with complimentary upgrades, candle-lit dinners, and couple spa.', image_url: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80', discount_percent: 18, discount_amount: null, coupon_code: 'HONEY18', package_id: null, destination_id: null, valid_from: new Date().toISOString(), valid_until: new Date(Date.now() + 45 * 86400000).toISOString(), active: true, badge: 'POPULAR', created_at: new Date().toISOString() },
  { id: 6, title: 'Last Minute Deals', description: 'Grab deeply discounted packages for departures within the next 14 days. Act fast!', image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', discount_percent: 40, discount_amount: null, coupon_code: 'LASTMIN40', package_id: null, destination_id: null, valid_from: new Date().toISOString(), valid_until: new Date(Date.now() + 14 * 86400000).toISOString(), active: true, badge: 'FLASH', created_at: new Date().toISOString() },
];

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    if (!offer.coupon_code) return;
    navigator.clipboard.writeText(offer.coupon_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const expiresIn = offer.valid_until ? (() => {
    const diff = new Date(offer.valid_until).getTime() - Date.now();
    if (diff < 0) return 'Expired';
    const days = Math.floor(diff / 86400000);
    return days === 0 ? 'Expires today' : `Expires in ${days} day${days > 1 ? 's' : ''}`;
  })() : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        {offer.image_url ? (
          <img src={offer.image_url} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {offer.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
            {offer.badge}
          </span>
        )}
        {offer.discount_percent && (
          <div className="absolute bottom-3 right-3 bg-white text-primary font-black text-xl px-3 py-1.5 rounded-xl shadow-lg leading-none">
            {offer.discount_percent}%<br /><span className="text-xs font-bold">OFF</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-foreground text-lg mb-1.5">{offer.title}</h3>
        {offer.description && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{offer.description}</p>
        )}

        {expiresIn && (
          <div className="flex items-center gap-1.5 text-xs text-orange-600 font-medium mb-4">
            <Clock className="h-3.5 w-3.5" />
            <span>{expiresIn}</span>
          </div>
        )}

        {offer.coupon_code && (
          <div className="flex items-center gap-2 bg-primary/5 border border-dashed border-primary/40 rounded-xl px-4 py-3 mb-4 cursor-pointer" onClick={copyCode}>
            <Tag className="h-4 w-4 text-primary shrink-0" />
            <span className="font-mono font-bold text-primary tracking-widest flex-1 text-sm">{offer.coupon_code}</span>
            <button className="text-primary hover:text-primary/70 transition-colors shrink-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        )}

        <Link href={offer.package_id ? `/packages/${offer.package_id}` : offer.destination_id ? `/destinations/${offer.destination_id}` : '/packages'}>
          <Button className="w-full rounded-full" variant="outline">View Deal</Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveOffers()
      .then(({ data }) => { setOffers(data.length > 0 ? data : DEMO_OFFERS); setLoading(false); })
      .catch(() => { setOffers(DEMO_OFFERS); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary to-emerald-700 py-24 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-sm mb-5 border border-white/30">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold">Limited Time Deals</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">Exclusive Offers</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Handpicked deals and discounts on the world's finest destinations.<br />Book before they're gone!
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-foreground text-background py-5">
        <div className="container flex items-center justify-center gap-10 flex-wrap text-center">
          {[
            { label: 'Active Deals', value: offers.length || 6 },
            { label: 'Up to', value: '40% OFF' },
            { label: 'Destinations', value: '12+' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-black text-2xl text-primary">{value}</p>
              <p className="text-background/60 text-xs uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 bg-secondary animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-24">
            <Sparkles className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">No Active Offers</h2>
            <p className="text-muted-foreground mb-6">Check back soon — new deals are added regularly!</p>
            <Link href="/packages"><Button className="rounded-full">Browse Packages</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, i) => <OfferCard key={offer.id} offer={offer} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
