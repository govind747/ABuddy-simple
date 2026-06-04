import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  Map, 
  CalendarDays, 
  ShieldCheck, 
  Coins, 
  Utensils, 
  PhoneCall, 
  Compass,
  Sparkles
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'general' | 'planning' | 'safety' | 'payment';
  question: string;
  answer: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: Compass },
  { id: 'general', label: 'General & Food', icon: Utensils },
  { id: 'planning', label: 'Trip Planning', icon: CalendarDays },
  { id: 'safety', label: 'Safety & Comfort', icon: ShieldCheck },
  { id: 'payment', label: 'Rates & Booking', icon: Coins },
] as const;

const faqData: FAQItem[] = [
  {
    id: 'faq1',
    category: 'general',
    question: 'What travel documents do I need for tours in India & Uttarakhand?',
    answer: 'For international travelers, a passport with at least 6 months validity and an e-Tourist Visa (eTV) are required. For domestic Indian travelers exploring Uttarakhand, a valid government-issued photo ID (such as a Passport, Voter ID, Driving License, or generic National ID card) is mandatory for hotel check-ins and permit verifications along high-altitude routes.',
  },
  {
    id: 'faq2',
    category: 'planning',
    question: 'What is the best time to visit Uttarakhand and India?',
    answer: 'The ideal time to visit the plain and lower hill stations is October to March when conditions are crisp and cool. For high-altitude treks and pristine Himalayan views in Uttarakhand, spring (March to May) and autumn (October to November) are magnificent. While the monsoon season (June to September) brings lush green landscapes, it requires careful route monitoring due to mountain rainfall.',
  },
  {
    id: 'faq3',
    category: 'planning',
    question: 'Are your tour packages fully customizable?',
    answer: 'Absolutely! Every journey with Adventure Buddy can be tailored to your requirements. You can dynamically adjust travel dates, trip durations, specific sightseeing spots, outdoor activities, and hotel tiers (ranging from cozy homestays to premium valley-view resorts). Connect with our destination experts to design your ideal itinerary.',
  },
  {
    id: 'faq4',
    category: 'payment',
    question: 'What is your cancellation and route realignment policy?',
    answer: 'We provide a highly adaptive cancellation layout: Cancellations submitted 30+ days prior to departure qualify for a full refund. 15–29 days out receive a 75% refund; 7–14 days receive 50%. In case of sudden mountain weather anomalies or force majeure road updates, our ground staff instantly realigns your bookings to alternative safe locations without losing your itinerary value.',
  },
  {
    id: 'faq5',
    category: 'safety',
    question: 'Do you provide verified safety and ground assistance?',
    answer: 'Safety is the core pillar of Adventure Buddy. All our vehicles carry "Safe Travel Partner" verification markings, and our professional local drivers are explicitly certified for high-altitude mountain navigation. We maintain round-the-clock live coordinate tracking and local medical networks at every base camp to ensure a secure, stress-free vacation.',
  },
  {
    id: 'faq6',
    category: 'payment',
    question: 'What payment options do you support for booking confirmations?',
    answer: 'We accept all major credit cards, debit cards, corporate UPI, Net Banking channels, and instant digital wallets via our secure payment gateway. For manual accounting, we also provide direct IMPS/NEFT Bank Transfer options where you can input your transaction reference/UTR string directly to confirm your tour allotment. A 30% advance secures your booking.',
  },
  {
    id: 'faq7',
    category: 'general',
    question: 'Is authentic local vegetarian/vegan food available during the tour?',
    answer: 'Yes! India and the Himalayan foothills boast an extraordinary culinary heritage of pure vegetarian meals. We ensure all curated pitstops, campsites, and hotel packages feature clean, hygienic vegetarian and vegan food options. If you want to sample authentic regional Pahadi dishes or have strict dietary requirements, simply notify our agents during registration.',
  },
  {
    id: 'faq8',
    category: 'general',
    question: 'What are your group booking sizes and solo traveler protocols?',
    answer: 'We cater to all styles of exploration! Our standard community guided tours average 8 to 20 travelers per cohort, making them family-friendly. Solo adventurers can seamlessly join these pre-scheduled batches or opt for an exclusive private vehicle and dedicated guide. Customized large-scale itineraries for schools, universities, and corporate groups are fully supported with specialized pricing structures.',
  },
];

function FAQCard({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-card border-primary/40 shadow-md shadow-primary/5' 
          : 'bg-card/70 border-border/60 hover:border-border hover:shadow-sm'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-transparent transition-colors"
      >
        <span className="font-bold text-foreground text-base md:text-lg tracking-tight pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border/40 bg-muted/30"
          >
            <div className="px-6 py-5 text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter items based on active tab category
  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return faqData;
    return faqData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      
      {/* 1. PREMIUM HEADER HERO WITH GLASSMORPHIC ACCENTS */}
      <section className="relative overflow-hidden py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 via-transparent to-background">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6 text-primary text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" /> Adventure Buddy Help Desk
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-foreground"
          >
            How Can We Assist Your Journey?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-normal"
          >
            Clear, transparent answers about local documentation, Himalayan weather cycles, custom packaging operations, and premium safety standards.
          </motion.p>
        </div>
      </section>

      {/* 2. THREE-CARD HIGHLIGHT STRIP */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 mb-16 grid grid-cols-1 md:grid-cols-3 gap-5 relative z-20">
        {[
          { icon: Map, title: 'Custom Itineraries', desc: 'Modify routing rules, hotel choices, and hill-climbing schedules instantly.' },
          { icon: ShieldCheck, title: 'Safety Infrastructure', desc: 'Hills-certified drivers, tracked fleets, and active 24/7 ground monitoring support.' },
          { icon: PhoneCall, title: 'Always Connected', desc: 'Direct regional operator assistance lines during high-altitude transits.' }
        ].map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-card border border-border/80 rounded-2xl p-6 shadow-md shadow-foreground/[0.02] flex items-start gap-4 hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <feat.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base mb-1 tracking-tight">{feat.title}</h3>
              <p className="text-muted-foreground text-xs font-medium leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. SEGMENTED CATEGORY TAB SELECTOR */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center gap-2 border-b border-border/40 pb-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenId(null); // Close active accordion during category switches
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 outline-none ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10 scale-102'
                    : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. ANIMATED ACCORDION LIST WRAPPER */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => (
                <FAQCard
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/40"
              >
                <HelpCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No specifics found matching this category tab setup.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 5. DEEP PREMIUM CALL-TO-ACTION RECONCILIATION RADAR */}
      <section className="bg-primary/5 border-t border-border/40 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <HelpCircle className="h-7 w-7 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Have a Unique Custom Scenario?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium text-base leading-normal">
              Our regional travel architects are live to handle high-altitude mapping configurations, group allocations, and customized stays.
            </p>
            <div className="pt-2">
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-xl hover:scale-102"
              >
                Connect with an Expert Agent →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}