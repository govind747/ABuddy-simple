import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, CircleCheck as CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import QueryModal from '@/components/services/QueryModal';

interface FamilyGroupCard {
  id: string;
  title: string;
  destination: string;
  activities: string[];
  image: string;
  price: number;
  rating: number;
}

export default function FamilyGroupSection() {
  const [showQuery, setShowQuery] = useState<string | null>(null);

  const sectionDetails = {
    title: 'Family Group Travel',
    subtitle: 'Create Lasting Memories Together',
    description: 'Bring your family closer with shared adventures and unforgettable experiences. Our family travel packages are carefully designed to cater to all ages, ensuring everyone has a wonderful time exploring new destinations together.',
    points: [
      'Kid-friendly activities and accommodations',
      'All-inclusive family packages',
      'Safety and comfort prioritized',
      'Flexible itineraries for families',
    ],
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
  };

  const cards: FamilyGroupCard[] = [
    {
      id: 'family_group_1',
      title: 'Beach Family Getaway',
      destination: 'Maldives',
      activities: ['Water sports', 'Snorkeling', 'Beach activities', 'Kids clubs'],
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961883?w=800&q=80',
      price: 1799,
      rating: 4.9,
    },
    {
      id: 'family_group_2',
      title: 'Mountain Family Adventure',
      destination: 'Swiss Alps',
      activities: ['Hiking', 'Cable cars', 'Alpine meadows', 'Adventure parks'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      price: 2199,
      rating: 4.8,
    },
    {
      id: 'family_group_3',
      title: 'City Family Explorer',
      destination: 'Paris',
      activities: ['Museum tours', 'Park visits', 'Boat cruises', 'Local cuisine'],
      image: 'https://images.unsplash.com/photo-1449824921423-900429980429?w=800&q=80',
      price: 1499,
      rating: 4.7,
    },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
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
                <Badge className="bg-amber-100 text-amber-700 border-none mb-3 text-xs font-semibold">
                  FAMILY TRAVEL
                </Badge>
                <h2 className="text-4xl font-black text-gray-900 mb-2">{sectionDetails.title}</h2>
                <p className="text-amber-600 font-semibold text-lg">{sectionDetails.subtitle}</p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {sectionDetails.description}
              </p>

              <div className="space-y-3 mb-8">
                {sectionDetails.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowQuery('family_group')}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Plan Your Family Trip
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
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Family Packages</h3>
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
                      <Badge className="bg-amber-600 text-white border-none text-xs font-bold px-3 shadow-lg">
                        Family
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
                            <span key={idx} className="text-xs bg-amber-600/80 text-white px-2 py-1 rounded-full">
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
                          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
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
          serviceType="family_group"
          serviceTitle={showQuery === 'family_group' ? 'Family Travel' : 'Family Package'}
          onClose={() => setShowQuery(null)}
        />
      )}
    </>
  );
}
