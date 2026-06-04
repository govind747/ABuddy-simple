import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Compass, Users, Clock, Zap } from 'lucide-react';
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

export default function SoloTravelPage() {
  const [showQuery, setShowQuery] = useState(false);

  const activities: ActivitySection[] = [
    {
      id: 'tracking',
      title: 'Himalayan Trekking',
      icon: <Compass className="h-8 w-8" />,
      description: 'Experience the breathtaking beauty of Himalayan trails designed for solo adventurers. Trek through pristine mountain paths, encounter diverse wildlife, and reach stunning viewpoints. Each trek is carefully selected for safety and accessibility, with experienced guides available at key points.',
      points: [
        'Multi-day guided treks (3-7 days)',
        'Professional mountain guides included',
        'All safety equipment provided',
        'Accommodation in mountain lodges',
        'Meals and water included',
        'Photography opportunities at scenic spots'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80',
      price: '₹12,000 - ₹25,000'
    },
    {
      id: 'mountain',
      title: 'Mountain Exploration',
      icon: <Zap className="h-8 w-8" />,
      description: 'Discover the majestic mountain peaks and hidden valleys of India. Our mountain exploration packages combine adventure with comfort, allowing you to experience pristine nature while maintaining reasonable accessibility levels. Visit sacred peaks, meditation spots, and panoramic viewpoints.',
      points: [
        'Guided mountain tours',
        'Camping in scenic locations',
        'Sunrise and sunset viewings',
        'Local village visits',
        'Meditation and yoga sessions',
        'Night sky stargazing'
      ],
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80',
      price: '₹8,000 - ₹18,000'
    },
    {
      id: 'cycling',
      title: 'Adventure Cycling',
      icon: <Compass className="h-8 w-8" />,
      description: 'Pedal through scenic routes connecting remote villages, mountain passes, and pristine valleys. Mountain biking through diverse terrain offers a unique perspective of local culture and landscapes. Suitable for various fitness levels with route options.',
      points: [
        'Professional mountain bikes provided',
        'Multi-terrain routes available',
        'Safety gear and helmets included',
        'Support vehicle following group',
        'Rest stops at scenic locations',
        'Local cuisine experience'
      ],
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1000&q=80',
      price: '₹5,000 - ₹15,000'
    },
    {
      id: 'adventure',
      title: 'Adventure Activities',
      icon: <Zap className="h-8 w-8" />,
      description: 'Adrenaline-pumping activities including rock climbing, paragliding, rappelling, and water sports. Experience the thrill of adventure with professional instructors ensuring your safety. Push your limits while exploring stunning natural landscapes.',
      points: [
        'Professional instructors certified',
        'State-of-the-art safety equipment',
        'Beginner to advanced levels',
        'Insurance coverage included',
        'Video recording of activities',
        'Certificate upon completion'
      ],
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1000&q=80',
      price: '₹6,000 - ₹20,000'
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Solo Weekend Escape',
      duration: '2-3 Days',
      rating: 4.8,
      reviews: 245,
      price: '₹8,999',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
      highlights: ['Mountain trail', 'Local homestay', 'Adventure activities']
    },
    {
      id: 2,
      title: 'Himalayan Solo Trek',
      duration: '5-7 Days',
      rating: 4.9,
      reviews: 189,
      price: '₹18,999',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
      highlights: ['Peak summit', 'Guided journey', 'Photography tour']
    },
    {
      id: 3,
      title: 'Off-Road Cycling',
      duration: '3-4 Days',
      rating: 4.7,
      reviews: 156,
      price: '₹7,999',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4ded1ed63?w=500&q=80',
      highlights: ['Mountain biking', 'Village exploration', 'Local meals']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Solo Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">Solo Adventure Awaits</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover yourself through solo travel in India's most stunning destinations
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Solo Travel */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Solo Travel</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solo travel is about personal growth, freedom, and self-discovery. Our carefully curated solo travel experiences combine adventure with comfort, allowing you to explore at your own pace while connecting with like-minded travelers. Whether you seek thrilling adventures or peaceful retreats, we have the perfect itinerary for your solo journey.
          </p>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Explore Activities</h2>
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
                  <div className="text-blue-600">{activity.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{activity.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                <div className="bg-blue-50 rounded-lg p-6 mb-4">
                  <p className="text-sm font-semibold text-blue-600 mb-3">What's Included:</p>
                  <ul className="space-y-2">
                    {activity.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="text-blue-600 font-bold mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-2xl font-bold text-blue-600">{activity.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
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
                        <span className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                    <Button
                      onClick={() => setShowQuery(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
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
      <section className="bg-blue-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready for Your Solo Adventure?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of solo travelers who have discovered the joy of independent exploration
            </p>
            <Button
              onClick={() => setShowQuery(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 text-lg"
            >
              Start Your Journey →
            </Button>
          </motion.div>
        </div>
      </section>

      {showQuery && (
        <QueryModal
          serviceType="solo_travel"
          serviceTitle="Solo Travel Package"
          onClose={() => setShowQuery(false)}
        />
      )}
    </div>
  );
}
