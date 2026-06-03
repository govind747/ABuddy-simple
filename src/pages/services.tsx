import { motion } from 'framer-motion';
import SoloTravelSection from '@/components/services/SoloTravelSection';
import FamilyGroupSection from '@/components/services/FamilyGroupSection';
import SchoolGroupSection from '@/components/services/SchoolGroupSection';
import CollegeGroupSection from '@/components/services/CollegeGroupSection';
import CorporateSection from '@/components/services/CorporateSection';

export default function Services() {
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

      {/* Solo Travel Section */}
      <SoloTravelSection />

      {/* Family Group Section */}
      <FamilyGroupSection />

      {/* School Group Section */}
      <SchoolGroupSection />

      {/* College Group Section */}
      <CollegeGroupSection />

      {/* Corporate Section */}
      <CorporateSection />

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

