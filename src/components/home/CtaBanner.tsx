import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Adventure awaits"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Plane className="h-10 w-10 text-white/70 mx-auto mb-6" />
          <p className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">Start Planning</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Join over 15,000 travelers who have discovered their dream destinations with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-12 font-semibold" data-testid="button-explore-packages">
                Explore Packages
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 h-12" data-testid="button-view-destinations">
                View Destinations
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
