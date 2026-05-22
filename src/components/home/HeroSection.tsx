import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookingForm } from '@/components/home/BookingForm';
import { Plane } from 'lucide-react';

export function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.jpg" alt="Beautiful travel destination" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6">
              ADVENTURE
            </h1>
            <p className="text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto">
              Discover extraordinary destinations worldwide with the world's most exciting travel companion.
            </p>
            <Button
              size="lg"
              className="text-lg h-14 px-8 rounded-full gap-2 shadow-xl"
              onClick={() => setBookingOpen(true)}
            >
              <Plane className="h-5 w-5" />
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      <BookingForm open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
