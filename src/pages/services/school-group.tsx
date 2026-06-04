import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Leaf, Users, Clock } from 'lucide-react';
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

export default function SchoolStudyPage() {
  const [showQuery, setShowQuery] = useState(false);

  const activities: ActivitySection[] = [
    {
      id: 'rural',
      title: 'Rural Life Exploration',
      icon: <Leaf className="h-8 w-8" />,
      description: 'Experience authentic village life and traditional practices. Students interact with local farmers, learn about agricultural practices, and understand sustainable living. This hands-on experience provides invaluable insights into rural India\'s culture and economy.',
      points: [
        'Farm visits and activities',
        'Traditional craft demonstrations',
        'Agricultural learning sessions',
        'Local family interactions',
        'Community service activities',
        'Photography documentation'
      ],
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&q=80',
      price: '₹2,500 - ₹5,000'
    },
    {
      id: 'studytour',
      title: 'Educational Study Tours',
      icon: <BookOpen className="h-8 w-8" />,
      description: 'Visit historically and educationally significant sites aligned with curriculum. Expert guides explain historical context, architectural details, and cultural significance. Each tour includes worksheets and educational materials to enhance learning outcomes.',
      points: [
        'Curriculum-aligned content',
        'Expert historian guides',
        'Educational worksheets',
        'Interactive Q&A sessions',
        'Museum exhibitions',
        'Certificate of participation'
      ],
      image: 'https://images.unsplash.com/photo-1495744749818-d6cf32a26e0f?w=1000&q=80',
      price: '₹3,000 - ₹7,000'
    },
    {
      id: 'nature',
      title: 'Nature & Wildlife Exploration',
      icon: <Leaf className="h-8 w-8" />,
      description: 'Discover biodiversity and natural ecosystems through guided nature walks and wildlife observations. Students learn about conservation, endangered species, and environmental protection through direct experience in natural habitats.',
      points: [
        'Guided nature walks',
        'Wildlife observation',
        'Bird watching sessions',
        'Plant identification',
        'Conservation education',
        'Nature journaling'
      ],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80',
      price: '₹2,000 - ₹5,500'
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem Studies',
      icon: <Leaf className="h-8 w-8" />,
      description: 'In-depth exploration of various ecosystems - forests, grasslands, wetlands. Students conduct field studies, collect samples, and understand interconnected relationships in nature. Supported by research materials and scientific methodology training.',
      points: [
        'Ecosystem mapping',
        'Species identification',
        'Field sample collection',
        'Scientific documentation',
        'Laboratory analysis',
        'Research paper guidance'
      ],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80',
      price: '₹4,000 - ₹8,000'
    },
    {
      id: 'camping',
      title: 'Educational Camping & Tenting',
      icon: <Users className="h-8 w-8" />,
      description: 'Learning through outdoor experiences in carefully selected camping locations. Students develop survival skills, team building, and independence. Camping includes structured educational activities, nature studies, and skill development workshops.',
      points: [
        'Tent setup training',
        'Survival skills workshop',
        'Night sky education',
        'Team activities',
        'Outdoor cooking',
        'Safety and first aid training'
      ],
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&q=80',
      price: '₹3,500 - ₹7,500'
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Rural Heritage Tour',
      duration: '2-3 Days',
      rating: 4.8,
      reviews: 234,
      price: '₹4,999 per student',
      image: 'https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=500&q=80',
      highlights: ['Village visits', 'Cultural shows', 'Farm activities']
    },
    {
      id: 2,
      title: 'Nature Study Camp',
      duration: '3-4 Days',
      rating: 4.9,
      reviews: 189,
      price: '₹7,999 per student',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
      highlights: ['Camping', 'Wildlife tours', 'Nature studies']
    },
    {
      id: 3,
      title: 'Historical Journey',
      duration: '4-5 Days',
      rating: 4.7,
      reviews: 156,
      price: '₹9,999 per student',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80',
      highlights: ['Historical sites', 'Museums', 'Expert guides']
    }
  ];

  return (
    // FIXED: Removed pt-20 from here to prevent the top whitespace layout split
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      
      {/* Hero Section - FIXED: Added pt-20 here so the content clears the navigation bar smoothly without breaking layout flow */}
      <section className="relative h-96 overflow-hidden pt-20">
        <img
          src="https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=1600&q=80"
          alt="School Study Tour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">Educational Tours</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Learning beyond the classroom
            </p>
          </motion.div>
        </div>
      </section>

      {/* About School Tours */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Educational Tours</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Educational tours transform textbook learning into real-world experiences. Students gain deeper understanding, develop critical thinking, and create lasting memories. Our programs are designed by educators and aligned with school curricula to maximize learning outcomes.
          </p>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Learning Activities</h2>
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
                  <div className="text-green-600">{activity.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{activity.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                <div className="bg-green-50 rounded-lg p-6 mb-4">
                  <p className="text-sm font-semibold text-green-700 mb-3">Program Includes:</p>
                  <ul className="space-y-2">
                    {activity.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-2xl font-bold text-green-600">{activity.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-green-50 py-20 px-4 sm:px-6 lg:px-8">
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
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                    <Button
                      onClick={() => setShowQuery(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
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
      <section className="bg-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Plan Your School Tour</h2>
            <p className="text-green-100 text-lg mb-8">
              Transform your students' learning with experiential education
            </p>
            <Button
              onClick={() => setShowQuery(true)}
              className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 text-lg"
            >
              Schedule a Tour →
            </Button>
          </motion.div>
        </div>
      </section>

      {showQuery && (
        <QueryModal
          serviceType="school_group"
          serviceTitle="School Study Tour Package"
          onClose={() => setShowQuery(false)}
        />
      )}
    </div>
  );
}