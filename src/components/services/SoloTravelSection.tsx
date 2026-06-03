import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, CircleCheck as CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import QueryModal from '@/components/services/QueryModal';

interface SoloTravelCard {
  id: string;
  title: string;
  destination: string;
  activities: string[];
  image: string;
  price: number;
  rating: number;
}

export default function SoloTravelSection() {
  const [showQuery, setShowQuery] = useState<string | null>(null);

  const sectionDetails = {
    title: 'Solo Travel Plans',
    subtitle: 'Perfect for Independent Travelers',
    description: 'Experience the freedom and flexibility of traveling alone. Our solo travel packages are designed for independent adventurers seeking personalized experiences, meaningful connections, and the opportunity to discover yourself through travel.',
    points: [
      'Customizable itineraries tailored to your pace',
      'Solo traveler community and meetups',
      'Safety and support throughout your journey',
      'Budget-friendly options available',
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  };

  const cards: SoloTravelCard[] = [
    {
      id: 'solo_adventure_1',
      title: 'European Discovery',
      destination: 'Europe',
      activities: ['City tours', 'Hiking', 'Cultural sites', 'Local cuisine'],
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      price: 1299,
      rating: 4.8,
    },
    {
      id: 'solo_adventure_2',
      title: 'Asian Exploration',
      destination: 'Asia',
      activities: ['Temple visits', 'Street food', 'Beaches', 'Mountain trekking'],
      image: 'https://images.unsplash.com/photo-1540959733332-eab4ded1ed63?w=800&q=80',
      price: 999,
      rating: 4.9,
    },
    {
      id: 'solo_adventure_3',
      title: 'Island Hopping',
      destination: 'Southeast Asia',
      activities: ['Snorkeling', 'Beach relax', 'Water sports', 'Island tours'],
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a51bf7?w=800&q=80',
      price: 899,
      rating: 4.7,
    },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={sectionDetails.image}
                  alt={sectionDetails.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            {/* Right: Details and Points */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <Badge className="bg-blue-100 text-blue-700 border-none mb-3 text-xs font-semibold">
                  SOLO TRAVELER
                </Badge>
                <h2 className="text-4xl font-black text-gray-900 mb-2">{sectionDetails.title}</h2>
                <p className="text-blue-600 font-semibold text-lg">{sectionDetails.subtitle}</p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {sectionDetails.description}
              </p>

              <div className="space-y-3 mb-8">
                {sectionDetails.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowQuery('solo_travel')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Solo Journey
              </button>
            </motion.div>
          </div>

          {/* Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Solo Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <Badge className="bg-blue-600 text-white border-none text-xs font-bold px-3 shadow-lg">
                        Solo
                      </Badge>
                      <div className="ml-auto flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-xs font-bold">{card.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{card.destination}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2 leading-tight">{card.title}</h3>

                      <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white/70 text-xs mb-2">Activities:</p>
                        <div className="flex flex-wrap gap-1">
                          {card.activities.slice(0, 3).map((activity, idx) => (
                            <span key={idx} className="text-xs bg-blue-600/80 text-white px-2 py-1 rounded-full">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/60 text-xs">From</p>
                          <p className="text-white font-black text-lg">${card.price.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => setShowQuery(card.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
                        >
                          Explore →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {showQuery && (
        <QueryModal
          serviceType="solo_travel"
          serviceTitle={showQuery === 'solo_travel' ? 'Solo Travel' : 'Solo Package'}
          onClose={() => setShowQuery(null)}
        />
      )}
    </>
  );
}
