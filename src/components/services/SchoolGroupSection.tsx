import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, CircleCheck as CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import QueryModal from '@/components/services/QueryModal';

interface SchoolGroupCard {
  id: string;
  title: string;
  destination: string;
  activities: string[];
  image: string;
  price: number;
  rating: number;
}

export default function SchoolGroupSection() {
  const [showQuery, setShowQuery] = useState<string | null>(null);

  const sectionDetails = {
    title: 'School Study Tours',
    subtitle: 'Educational Journeys',
    description: 'Enhance learning through real-world exploration. Our educational tour packages combine academic curriculum with experiential learning, helping students understand history, culture, and geography firsthand while making lasting memories with their peers.',
    points: [
      'Curriculum-aligned educational content',
      'Expert guides and historians',
      'Safe and supervised group travel',
      'Educational materials and resources included',
    ],
    image: 'https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=800&q=80',
  };

  const cards: SchoolGroupCard[] = [
    {
      id: 'school_group_1',
      title: 'Ancient Rome & Greece',
      destination: 'Greece & Italy',
      activities: ['Historical sites', 'Museum tours', 'Archaeological digs', 'Cultural lectures'],
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
      price: 1899,
      rating: 4.9,
    },
    {
      id: 'school_group_2',
      title: 'Asian Civilization Tour',
      destination: 'Japan & China',
      activities: ['Temple visits', 'Cultural shows', 'Historical museums', 'Traditional crafts'],
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12ea389?w=800&q=80',
      price: 1699,
      rating: 4.8,
    },
    {
      id: 'school_group_3',
      title: 'Wildlife & Nature Study',
      destination: 'Africa',
      activities: ['Safari tours', 'Wildlife research', 'Conservation talks', 'Nature photography'],
      image: 'https://images.unsplash.com/photo-1580060839134-7555b4a4c6a7?w=800&q=80',
      price: 2099,
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
                <Badge className="bg-green-100 text-green-700 border-none mb-3 text-xs font-semibold">
                  EDUCATIONAL TOUR
                </Badge>
                <h2 className="text-4xl font-black text-gray-900 mb-2">{sectionDetails.title}</h2>
                <p className="text-green-600 font-semibold text-lg">{sectionDetails.subtitle}</p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {sectionDetails.description}
              </p>

              <div className="space-y-3 mb-8">
                {sectionDetails.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowQuery('school_group')}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Educational Tour
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
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Study Tours</h3>
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
                      <Badge className="bg-green-600 text-white border-none text-xs font-bold px-3 shadow-lg">
                        School
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
                            <span key={idx} className="text-xs bg-green-600/80 text-white px-2 py-1 rounded-full">
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
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
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
          serviceType="school_group"
          serviceTitle={showQuery === 'school_group' ? 'School Tour' : 'School Package'}
          onClose={() => setShowQuery(null)}
        />
      )}
    </>
  );
}
