import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, Users, Mountain, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QueryModal from '@/components/services/QueryModal';

interface ActivitySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  points: string[];
  image: string;
  price: string;
}

export default function CollegeOutdoorPage() {
  const [showQuery, setShowQuery] = useState(false);

  const activities: ActivitySection[] = [
    {
      id: 'trekking',
      title: 'Mountain Trekking',
      icon: <Mountain className="h-8 w-8" />,
      description: 'Challenge yourself on thrilling mountain treks across diverse terrains. From moderate to advanced trails, each trek offers stunning vistas and the exhilaration of conquering peaks. Build endurance, test your limits, and create incredible bonding moments with friends.',
      points: [
        'Professional trek guides',
        'Advanced fitness challenges',
        'Summit success celebrations',
        'Night camping experiences',
        'Photography opportunities',
        'Mountain safety training'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80',
      price: '₹6,000 - ₹15,000'
    },
    {
      id: 'cycling',
      title: 'Off-Road Cycling Adventures',
      icon: <Zap className="h-8 w-8" />,
      description: 'Feel the rush of adrenaline as you pedal through challenging off-road routes. Mountain biking through forests, hills, and valleys provides the perfect blend of adventure and fitness. Suitable for varying skill levels with technical training available.',
      points: [
        'Professional mountain bikes',
        'Technical skill training',
        'Trail difficulty options',
        'Support vehicle backup',
        'Speed challenges',
        'Group competitions'
      ],
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1000&q=80',
      price: '₹4,000 - ₹10,000'
    },
    {
      id: 'rafting',
      title: 'River Rafting & Water Sports',
      icon: <Zap className="h-8 w-8" />,
      description: 'Navigate rushing rapids and enjoy thrilling water sports on pristine rivers. From mild to wild rafting, water activities test your courage and teamwork. Accompanied by certified instructors ensuring safety while maximizing adventure.',
      points: [
        'Certified rafting guides',
        'Safety equipment provided',
        'Multiple difficulty levels',
        'Team challenges',
        'Riverside camping',
        'Swimming and diving'
      ],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80',
      price: '₹3,500 - ₹9,000'
    },
    {
      id: 'village',
      title: 'Village Tours & Cultural Immersion',
      icon: <Users className="h-8 w-8" />,
      description: 'Experience authentic village life and connect with local communities. Participate in daily activities, learn traditional skills, and understand rural culture. A humbling experience that broadens perspectives and fosters social responsibility.',
      points: [
        'Homestay experiences',
        'Skill learning workshops',
        'Community service projects',
        'Local cuisine preparation',
        'Cultural exchange programs',
        'Photo documentation'
      ],
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&q=80',
      price: '₹2,500 - ₹7,000'
    },
    {
      id: 'mountain_life',
      title: 'Mountain Living Experience',
      icon: <Mountain className="h-8 w-8" />,
      description: 'Immerse yourself in mountain culture and lifestyle. Wake to sunrise treks, practice meditation, cook traditional mountain meals, and connect with nature. An unforgettable experience of simplicity, tranquility, and natural beauty.',
      points: [
        'Mountain lodge stay',
        'Sunrise yoga sessions',
        'Traditional cooking classes',
        'Meditation workshops',
        'Local guide interactions',
        'Bonfire storytelling nights'
      ],
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80',
      price: '₹5,000 - ₹12,000'
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Adventure Packed Weekend',
      duration: '2-3 Days',
      rating: 4.9,
      reviews: 312,
      price: '₹7,999 per person',
      image: 'https://images.unsplash.com/photo-1551632786-de41ec16a82d?w=500&q=80',
      highlights: ['Trekking', 'Rafting', 'Camping']
    },
    {
      id: 2,
      title: 'Ultimate Adventure Retreat',
      duration: '4-5 Days',
      rating: 4.8,
      reviews: 256,
      price: '₹14,999 per person',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
      highlights: ['Multi-adventure', 'Team building', 'Mountain camping']
    },
    {
      id: 3,
      title: 'Cultural & Adventure Blend',
      duration: '3-4 Days',
      rating: 4.7,
      reviews: 189,
      price: '₹9,999 per person',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80',
      highlights: ['Village tour', 'Cycling', 'Cultural shows']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1551632786-de41ec16a82d?w=1600&q=80"
          alt="College Adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">College Adventures</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Epic journeys, lifelong friendships, unforgettable memories
            </p>
          </motion.div>
        </div>
      </section>

      {/* About College Trips */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About College Adventures</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            College years are special - a time for adventure, growth, and creating bonds with friends that last a lifetime. Our college adventure packages are designed to give you maximum thrills, team experiences, and the freedom to explore your limits. From adrenaline-pumping activities to cultural immersion, every moment counts.
          </p>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Adventure Activities</h2>
        <div className="space-y-20">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:grid-cols-2 md:direction-rtl' : ''}`}
            >
              <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="rounded-2xl shadow-lg w-full h-96 object-cover hover:shadow-2xl transition-shadow"
                />
              </div>
              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-rose-600">{activity.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{activity.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                <div className="bg-rose-50 rounded-lg p-6 mb-4">
                  <p className="text-sm font-semibold text-rose-700 mb-3">Includes:</p>
                  <ul className="space-y-2">
                    {activity.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="text-rose-600 font-bold mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-2xl font-bold text-rose-600">{activity.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-rose-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{pkg.rating}</span>
                      <span className="text-xs text-gray-600">({pkg.reviews})</span>
                    </div>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {pkg.duration}
                    </span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {pkg.highlights.map((highlight, idx) => (
                      <p key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-rose-600 rounded-full" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-rose-600">{pkg.price}</span>
                    <Button
                      onClick={() => setShowQuery(true)}
                      className="bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready for Epic Adventures?</h2>
            <p className="text-rose-100 text-lg mb-8">
              Your unforgettable college trip awaits - book now and make memories!
            </p>
            <Button
              onClick={() => setShowQuery(true)}
              className="bg-white text-rose-600 hover:bg-gray-100 font-bold py-3 px-8 text-lg"
            >
              Start Adventure →
            </Button>
          </motion.div>
        </div>
      </section>

      {showQuery && (
        <QueryModal
          serviceType="college_group"
          serviceTitle="College Outdoor Adventure Package"
          onClose={() => setShowQuery(false)}
        />
      )}
    </div>
  );
}
