import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Heart, Zap, Clock } from 'lucide-react';
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

export default function FamilyGroupPage() {
  const [showQuery, setShowQuery] = useState(false);

  const activities: ActivitySection[] = [
    {
      id: 'games',
      title: 'Family Games & Entertainment',
      icon: <Heart className="h-8 w-8" />,
      description: 'Engage the whole family with exciting games, competitions, and entertainment activities. From treasure hunts to water games, cultural performances to interactive workshops, we ensure every family member has a memorable time. Professional entertainers and activity coordinators manage all events.',
      points: [
        'Age-appropriate games for all',
        'Group competitions with prizes',
        'Interactive storytelling sessions',
        'Arts and crafts workshops',
        'Video game nights',
        'Team challenges and bonding activities'
      ],
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&q=80',
      price: '₹3,000 - ₹8,000'
    },
    {
      id: 'engagement',
      title: 'Family Engagement Activities',
      icon: <Users className="h-8 w-8" />,
      description: 'Activities designed to strengthen family bonds and create lasting memories together. From cooking classes using local ingredients to cultural immersion programs, each activity fosters connection, laughter, and quality time. Perfect for families wanting to reconnect.',
      points: [
        'Cooking classes with local chefs',
        'Cultural immersion programs',
        'Family yoga and meditation',
        'Talent shows and performances',
        'Group photo sessions',
        'Family storytelling circles'
      ],
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&q=80',
      price: '₹4,000 - ₹10,000'
    },
    {
      id: 'bonfire',
      title: 'Bonfire & Music Nights',
      icon: <Zap className="h-8 w-8" />,
      description: 'Experience the warmth and joy of traditional bonfire gatherings under the stars. Enjoy live music, folk performances, dancing, and storytelling. A perfect way to create magical moments as a family, with delicious snacks and campfire treats included.',
      points: [
        'Traditional bonfire setup',
        'Live acoustic music performances',
        'Local folk dance performances',
        'Campfire cooking and roasting',
        'Stargazing sessions',
        'Traditional stories and legends'
      ],
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&q=80',
      price: '₹2,000 - ₹6,000'
    },
    {
      id: 'food',
      title: 'Culinary & Food Experiences',
      icon: <Heart className="h-8 w-8" />,
      description: 'Discover authentic regional cuisines and food traditions. Participate in cooking demonstrations, visit local markets, and enjoy family-style meals prepared by experienced cooks. Food becomes a delightful avenue for cultural learning and bonding.',
      points: [
        'Local market tours',
        'Traditional cooking lessons',
        'Tasting menus with history',
        'Vegetarian and vegan options',
        'Picnic lunch preparations',
        'Food heritage talks'
      ],
      image: 'https://images.unsplash.com/photo-1504674900649-f1af9027fe7f?w=1000&q=80',
      price: '₹2,500 - ₹7,000'
    },
    {
      id: 'heritage',
      title: 'Heritage & Cultural Tours',
      icon: <Zap className="h-8 w-8" />,
      description: 'Explore India\'s rich heritage together as a family. Visit ancient temples, forts, museums, and historical sites with expert guides who bring history alive. Educational yet entertaining, these tours help children understand and appreciate cultural diversity.',
      points: [
        'Expert historical guides',
        'Interactive museum exhibits',
        'Temple and monument tours',
        'Local craftsperson workshops',
        'Photography opportunities',
        'Cultural heritage certificates'
      ],
      image: 'https://images.unsplash.com/photo-1495744749818-d6cf32a26e0f?w=1000&q=80',
      price: '₹3,500 - ₹9,000'
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Family Weekend Getaway',
      duration: '2-3 Days',
      rating: 4.9,
      reviews: 312,
      price: '₹14,999',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961883?w=500&q=80',
      highlights: ['Resort stay', 'All games included', 'Bonfire night']
    },
    {
      id: 2,
      title: 'Heritage Family Tour',
      duration: '4-5 Days',
      rating: 4.8,
      reviews: 256,
      price: '₹24,999',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
      highlights: ['Historical sites', 'Cultural shows', 'Local meals']
    },
    {
      id: 3,
      title: 'Adventure Family Bonding',
      duration: '3-4 Days',
      rating: 4.7,
      reviews: 189,
      price: '₹18,999',
      image: 'https://images.unsplash.com/photo-1449824921423-900429980429?w=500&q=80',
      highlights: ['Water sports', 'Hiking', 'Team games']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80"
          alt="Family Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">Family Bonding Journey</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Create unforgettable memories with your loved ones
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Family Travel */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Family Travel</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Family travel strengthens bonds, broadens perspectives, and creates cherished memories that last a lifetime. Our family-focused packages are designed to cater to members of all ages, ensuring every family member finds joy and engagement. From quiet bonding moments to exciting adventures, we create the perfect balance.
          </p>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Family Activities</h2>
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
                  <div className="text-amber-600">{activity.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{activity.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                <div className="bg-amber-50 rounded-lg p-6 mb-4">
                  <p className="text-sm font-semibold text-amber-700 mb-3">What's Included:</p>
                  <ul className="space-y-2">
                    {activity.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="text-amber-600 font-bold mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-2xl font-bold text-amber-600">{activity.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-amber-50 py-20 px-4 sm:px-6 lg:px-8">
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
                        <span className="h-1.5 w-1.5 bg-amber-600 rounded-full" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">{pkg.price}</span>
                    <Button
                      onClick={() => setShowQuery(true)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
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
      <section className="bg-amber-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Create Family Memories Today</h2>
            <p className="text-amber-100 text-lg mb-8">
              Book your family adventure and enjoy moments that will be treasured forever
            </p>
            <Button
              onClick={() => setShowQuery(true)}
              className="bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 px-8 text-lg"
            >
              Book Your Family Trip →
            </Button>
          </motion.div>
        </div>
      </section>

      {showQuery && (
        <QueryModal
          serviceType="family_group"
          serviceTitle="Family Group Travel Package"
          onClose={() => setShowQuery(false)}
        />
      )}
    </div>
  );
}
