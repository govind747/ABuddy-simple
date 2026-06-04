import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Star, Users, Zap, Clock } from 'lucide-react';
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

export default function CorporatePage() {
  const [showQuery, setShowQuery] = useState(false);

  const activities: ActivitySection[] = [
    {
      id: 'team_building',
      title: 'Team Building Activities',
      icon: <Users className="h-8 w-8" />,
      description: 'Strengthen team bonds through carefully curated activities designed to enhance communication, trust, and collaboration. From interactive challenges to outdoor adventures, each activity builds stronger relationships and improves team dynamics.',
      points: [
        'Customized team games',
        'Problem-solving challenges',
        'Collaborative activities',
        'Team bonding meals',
        'Performance tracking',
        'Team awards ceremony'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
      price: '₹10,000 - ₹25,000'
    },
    {
      id: 'meetings',
      title: 'Corporate Meetings & Workshops',
      icon: <Briefcase className="h-8 w-8" />,
      description: 'Fully equipped venues with modern facilities for executive meetings, strategic planning sessions, and professional workshops. Experienced coordinators ensure seamless execution of all events with comprehensive support and amenities.',
      points: [
        'Conference facilities',
        'High-speed internet',
        'Audio-visual equipment',
        'Meeting facilitation',
        'Documentation services',
        'Catering arrangements'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
      price: '₹5,000 - ₹15,000'
    },
    {
      id: 'tours',
      title: 'Sightseeing & Cultural Tours',
      icon: <Users className="h-8 w-8" />,
      description: 'Explore India\'s rich heritage and natural beauty during leisure time between work sessions. Professional guides provide insights into history, culture, and architecture while maintaining comfort and schedule flexibility.',
      points: [
        'Expert guides',
        'Flexible schedules',
        'Heritage site visits',
        'Cultural performances',
        'Photography tours',
        'Souvenir shopping'
      ],
      image: 'https://images.unsplash.com/photo-1495744749818-d6cf32a26e0f?w=1000&q=80',
      price: '₹3,000 - ₹8,000'
    },
    {
      id: 'camping',
      title: 'Corporate Camping & Outdoor Bonding',
      icon: <Zap className="h-8 w-8" />,
      description: 'Experience outdoor team bonding in comfort. Luxury camping setups with all amenities including fine dining, professional entertainment, and carefully planned activities that foster camaraderie in a unique setting.',
      points: [
        'Luxury camping tents',
        'Gourmet camping meals',
        'Entertainment shows',
        'Campfire activities',
        'Outdoor games',
        'Professional supervision'
      ],
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&q=80',
      price: '₹8,000 - ₹20,000'
    },
    {
      id: 'rafting',
      title: 'Adventure Activities: Rafting & Sports',
      icon: <Zap className="h-8 w-8" />,
      description: 'Engage employees in thrilling adventure activities that break monotony and build resilience. From white-water rafting to rock climbing, these activities create excitement, boost confidence, and strengthen interpersonal connections.',
      points: [
        'Professional instructors',
        'Safety equipment',
        'Multiple activity options',
        'Team challenges',
        'Achievement certificates',
        'Adventure photos'
      ],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80',
      price: '₹6,000 - ₹18,000'
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Leadership Retreat',
      duration: '2-3 Days',
      rating: 4.9,
      reviews: 234,
      price: '₹35,000 per person',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
      highlights: ['Strategy sessions', 'Team building', 'Leisure time']
    },
    {
      id: 2,
      title: 'Executive Wellness Retreat',
      duration: '3-4 Days',
      rating: 4.8,
      reviews: 189,
      price: '₹45,000 per person',
      image: 'https://images.unsplash.com/photo-1537996197471-d632bd6e6e5e?w=500&q=80',
      highlights: ['Yoga sessions', 'Spa treatments', 'Meetings']
    },
    {
      id: 3,
      title: 'Adventure & Team Building',
      duration: '4-5 Days',
      rating: 4.7,
      reviews: 156,
      price: '₹55,000 per person',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
      highlights: ['Rafting', 'Adventure sports', 'Camping']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
          alt="Corporate Retreat"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">Corporate Excellence</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Strategic retreats that strengthen teams and boost performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Corporate Retreats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Corporate Retreats</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Corporate retreats are strategic investments in team development and organizational culture. Our comprehensive programs balance business objectives with leisure, creating environments where strategic planning, professional development, and team bonding happen naturally. Transform your company culture with our expertly designed retreats.
          </p>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Retreat Components</h2>
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
                  <div className="text-slate-600">{activity.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{activity.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                <div className="bg-slate-50 rounded-lg p-6 mb-4">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Features:</p>
                  <ul className="space-y-2">
                    {activity.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="text-slate-600 font-bold mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-2xl font-bold text-slate-600">{activity.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Premium Packages</h2>
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
                        <span className="h-1.5 w-1.5 bg-slate-600 rounded-full" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-600">{pkg.price}</span>
                    <Button
                      onClick={() => setShowQuery(true)}
                      className="bg-slate-700 hover:bg-slate-800 text-white"
                    >
                      Inquire
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Transform Your Organization</h2>
            <p className="text-slate-200 text-lg mb-8">
              Schedule a customized corporate retreat designed for your team's success
            </p>
            <Button
              onClick={() => setShowQuery(true)}
              className="bg-white text-slate-700 hover:bg-gray-100 font-bold py-3 px-8 text-lg"
            >
              Schedule Consultation →
            </Button>
          </motion.div>
        </div>
      </section>

      {showQuery && (
        <QueryModal
          serviceType="corporate"
          serviceTitle="Corporate Retreat Package"
          onClose={() => setShowQuery(false)}
        />
      )}
    </div>
  );
}
