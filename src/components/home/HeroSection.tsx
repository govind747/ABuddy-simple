import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookingForm } from '@/components/home/BookingForm';

export function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      {/* 
        Main Hero Section Wrap 
        Uses your target backdrop image directly as a background template
      */}
      <section 
        className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        {/* 
          Ambient Dimming Overlay 
          Darkens the background layer for readability while keeping the image intact
        */}
        <div className="absolute inset-0 bg-black/10 z-0" />

        {/* Foreground Content Stack */}
        <div className="container relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 
              Transparent Mask Element
              Clips the exact same underlying background image into the text glyphs.
              The positioning matches the parent canvas perfectly so it looks completely seamless.
            */}
            <h1 
              className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-cover bg-center bg-no-repeat select-none"
              style={{ backgroundImage: "url('/bgimage.jpg')" }}
            >
              ADVENTURE
            </h1>
            
            <p className="text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto drop-shadow-md text-slate-100">
              Discover extraordinary destinations worldwide with the world's most exciting travel companion.
            </p>
            
            <Button
              size="lg"
              className="text-lg h-14 px-8 rounded-full shadow-xl font-bold transition-all active:scale-95 bg-green-500 text-white hover:bg-primary"
              onClick={() => setBookingOpen(true)}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      <BookingForm open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}