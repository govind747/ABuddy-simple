import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import QueryModal from '@/components/services/QueryModal';

interface ServiceCardData {
  id: string;
  title: string;
  destination: string;
  activities: string[];
  image: string;
  price: number;
  rating: number;
}

function ServiceCard({ service, index }: { service: ServiceCardData; index: number }) {
  const [showQuery, setShowQuery] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, delay: index * 0.04 }}
        className="group relative"
      >
        <div className="block">
          <div className="relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <Badge className="bg-primary text-primary-foreground border-none text-xs font-bold px-3 shadow-lg">
                {service.id === 'solo_travel' && 'Solo'}
                {service.id === 'family_group' && 'Family'}
                {service.id === 'school_group' && 'Education'}
                {service.id === 'college_group' && 'Adventure'}
                {service.id === 'corporate' && 'Corporate'}
              </Badge>
              <div className="ml-auto flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-xs font-bold">{service.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                <span>{service.destination}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2 leading-tight">{service.title}</h3>

              <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white/70 text-xs mb-2">Activities:</p>
                <div className="flex flex-wrap gap-1">
                  {service.activities.slice(0, 3).map((activity, idx) => (
                    <span key={idx} className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs">From</p>
                  <p className="text-white font-black text-lg">${service.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setShowQuery(true)}
                  className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg hover:bg-primary/90"
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {showQuery && (
        <QueryModal
          serviceType={service.id}
          serviceTitle={service.title}
          onClose={() => setShowQuery(false)}
        />
      )}
    </>
  );
}

export default function Services() {
  const soloServices: ServiceCardData[] = [
    {
      id: 'solo_travel',
      title: 'Solo Adventure',
      destination: 'Global Destinations',
      activities: ['Self-paced', 'Local tours', 'Meet travelers', 'Budget friendly'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      price: 899,
      rating: 4.8,
    },
  ];

  const familyServices: ServiceCardData[] = [
    {
      id: 'family_group',
      title: 'Family Vacation',
      destination: 'Beach & Mountain',
      activities: ['Family activities', 'Kids entertainment', 'Water sports', 'Shopping'],
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
      price: 1499,
      rating: 4.9,
    },
  ];

  const schoolServices: ServiceCardData[] = [
    {
      id: 'school_group',
      title: 'School Study Tour',
      destination: 'Historical Sites',
      activities: ['Educational tours', 'Museums', 'Cultural sites', 'Field trips'],
      image: 'https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=800&q=80',
      price: 799,
      rating: 4.7,
    },
  ];

  const collegeServices: ServiceCardData[] = [
    {
      id: 'college_group',
      title: 'College Outdoor',
      destination: 'Adventure Hotspots',
      activities: ['Adventure sports', 'Team building', 'Camping', 'Night activities'],
      image: 'https://images.unsplash.com/photo-1551632786-de41ec16a82d?w=800&q=80',
      price: 1299,
      rating: 4.6,
    },
  ];

  const corporateServices: ServiceCardData[] = [
    {
      id: 'corporate',
      title: 'Corporate Retreat',
      destination: 'Premium Locations',
      activities: ['Team building', 'Strategy sessions', 'Luxury stay', 'Sports'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      price: 2499,
      rating: 4.9,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
          alt="Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">Services We Provide</h1>
            <p className="text-white/80 max-w-md mx-auto">A small river named Duden flows by their place</p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
              alt="Our Story"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold text-primary mb-3">Our Story</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A Little About Us</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              A wonderful serenity has taken possession of my entire soul. The frame swept morning of spring which I enjoy with my whole heart, and which I alone enjoy with my whole heart, and the exquisite sense of mere tranquil existence, that I regret my talents.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A wonderful serenity has taken possession of my entire soul like these sweet mornings of spring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Missions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <p className="text-sm font-semibold text-primary mb-3">Philosophy</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Top Missions</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                A wonderful serenity has taken possession of my entire soul like these sweet mornings of spring which I enjoy with my whole heart, and I along the enchanting banks of my intimate universe.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The happy in my near friend so absorbed in the exquisite sense of mere tranquil existence, that I regret my talents.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1439130490301-25e322d88054?w=600&q=80"
                alt="Our Top Missions"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12ea389?w=600&q=80"
              alt="Solutions"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold text-primary mb-3">Services</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Provide Solutions</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              A wonderful serenity has taken possession of my entire soul like these sweet mornings of spring which I enjoy with my whole heart, and I along the enchanting banks.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The happy in my near friend so absorbed in the exquisite sense of mere tranquil existence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solo Travel Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Solo Travel Plans</h2>
            <p className="text-gray-600 mb-12">Perfect for independent travelers seeking personalized experiences</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soloServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Family Group Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Family Group Travel</h2>
            <p className="text-gray-600 mb-12">Create lasting memories with your loved ones</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {familyServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* School Group Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">School Study Tours</h2>
            <p className="text-gray-600 mb-12">Educational journeys that inspire and educate</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* College Group Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">College Outdoor Groups</h2>
            <p className="text-gray-600 mb-12">Adventure and bonding for the youth</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collegeServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Corporate Retreats</h2>
            <p className="text-gray-600 mb-12">Team building and strategic planning at premium locations</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Interested in our services now?</h2>
            <p className="text-gray-600 text-lg">For energy, behind the word mountains, for from the countries Vokalia.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

