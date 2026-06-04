import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Star, 
  Leaf, 
  Users, 
  Clock, 
  Sparkles, 
  Sprout, 
  Milestone, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
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
  badgeColor: string;
}

export default function SchoolStudyPage() {
  const [showQuery, setShowQuery] = useState(false);

  const activities: ActivitySection[] = [
    {
      id: 'rural',
      title: 'Rural Life Exploration',
      icon: <Sprout className="h-6 w-6" />,
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
      price: '₹2,500 - ₹5,000',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      id: 'studytour',
      title: 'Educational Study Tours',
      icon: <BookOpen className="h-6 w-6" />,
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
      price: '₹3,000 - ₹7,000',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      id: 'nature',
      title: 'Nature & Wildlife Exploration',
      icon: <Leaf className="h-6 w-6" />,
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
      price: '₹2,000 - ₹5,500',
      badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem Studies',
      icon: <Milestone className="h-6 w-6" />,
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
      price: '₹4,000 - ₹8,000',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
    },
    {
      id: 'camping',
      title: 'Educational Camping & Tenting',
      icon: <Users className="h-6 w-6" />,
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
      price: '₹3,500 - ₹7,500',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Rural Heritage Tour',
      duration: '2-3 Days',
      rating: 4.8,
      reviews: 234,
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=500&q=80',
      highlights: ['Village visits', 'Cultural shows', 'Farm activities']
    },
    {
      id: 2,
      title: 'Nature Study Camp',
      duration: '3-4 Days',
      rating: 4.9,
      reviews: 189,
      price: '₹7,999',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
      highlights: ['Camping', 'Wildlife tours', 'Nature studies']
    },
    {
      id: 3,
      title: 'Historical Journey',
      duration: '4-5 Days',
      rating: 4.7,
      reviews: 156,
      price: '₹9,999',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80',
      highlights: ['Historical sites', 'Museums', 'Expert guides']
    }
  ];

  return (
    // FIXED: Changed layout wrapper to background matching dark theme, controlled padding precisely
    <div className="min-h-screen bg-[#070b13] text-gray-100 selection:bg-emerald-500/20 relative overflow-hidden pt-16">
      
      {/* Background Mesh Art Glows */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 -z-10" />

      {/* Hero Section - FIXED: Removed massive h-96 static constraint, balanced structural elements cleanly */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-gray-900 bg-[#090f1d]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=1600&q=80"
            alt="School Study Tour"
            className="w-full h-full object-cover opacity-25 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-[#070b13]/60 to-transparent" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full mb-6 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-950/40"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Experiential Classroom Platforms
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tight mb-4 text-white"
          >
            Educational Tours
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Transforming baseline textbook elements into rich, field-verified reality matrices. Learning beyond the traditional envelope.
          </motion.p>
        </div>
      </section>

      {/* About School Tours */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#0b1120]/80 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <h2 className="text-3xl font-black text-white tracking-tight mb-4">Real-World Knowledge Architecture</h2>
          <p className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
            Educational tours transform traditional curricula into lived, high-retention direct experience. Students gain deep socio-economic context, deploy direct scientific field-testing methodologies, and build independent leadership tracks. Our modules are tailored directly to academic institutional benchmarks.
          </p>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center tracking-tight">Core Learning Specializations</h2>
        <div className="space-y-24">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Media Block layout mapping layout controls */}
              <div className={`lg:col-span-6 relative group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative aspect-[4/3]">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Text Block Content */}
              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-3">
                  <div className={`inline-flex items-center gap-2 border px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${activity.badgeColor}`}>
                    {activity.icon} {activity.title}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{activity.title} Strategies</h3>
                </div>
                
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">{activity.description}</p>
                
                <div className="bg-[#0b1120]/90 border border-gray-800/80 rounded-2xl p-5 shadow-inner">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Core Program Metrics
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activity.points.map((point, pointIdx) => (
                      <div key={pointIdx} className="flex items-start gap-2 text-gray-300 text-xs font-medium">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-900 pt-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estimated Allocation</p>
                    <p className="text-xl font-extrabold text-emerald-400 tracking-tight">{activity.price}</p>
                  </div>
                  <Button 
                    onClick={() => setShowQuery(true)}
                    className="bg-[#11192e] border border-gray-800 hover:border-gray-700 text-white rounded-xl text-xs uppercase tracking-wider font-bold h-10 px-4"
                  >
                    Request Module Layout
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-[#090f1d] border-y border-gray-900 py-20 px-4 sm:px-6 lg:px-8 relative z-10 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">Institutional Blueprints</h2>
            <p className="text-gray-400 font-medium text-sm md:text-base">Fully managed configurations designed to ensure maximum field tracking safety.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#0d1527]/90 border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-gray-700/80 transition-all duration-300 relative"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] to-transparent" />
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">{pkg.title}</h3>
                  
                  <div className="flex items-center justify-between border-b border-gray-900 pb-3 text-xs font-semibold text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-white font-bold">{pkg.rating}</span>
                      <span className="text-[10px] text-gray-500">({pkg.reviews} verified)</span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="h-3.5 w-3.5 text-blue-400" /> {pkg.duration}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {pkg.highlights.map((highlight, index) => (
                      <p key={index} className="text-xs text-gray-400 flex items-center gap-2 font-medium">
                        <span className="h-1 w-1 bg-emerald-500 rounded-full" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Base Rate / Head</p>
                      <span className="text-lg font-black text-emerald-400 tracking-tight">{pkg.price}</span>
                    </div>
                    <Button
                      onClick={() => setShowQuery(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold px-4 h-9 shadow-md shadow-emerald-950/50"
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Configure Your Custom Deployment</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Connect with our core logistics architects to align itineraries directly with board parameters or unique tracking milestones.
          </p>
          <Button
            onClick={() => setShowQuery(true)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold h-12 px-8 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-emerald-950/40 group transition-all duration-300"
          >
            Schedule a Deployment Layout <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
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