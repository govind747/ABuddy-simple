import { motion } from 'framer-motion';
import { Shield, Headphones, Globe, Award } from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Access to over 500 destinations across 80 countries worldwide with curated local experiences.',
  },
  {
    icon: Shield,
    title: 'Safe Travel',
    description: 'Your safety is our priority. All our packages include comprehensive travel insurance coverage.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support available in multiple languages for any assistance you need.',
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: 'We guarantee the best prices on all our packages. Find it cheaper, and we will match it.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Advantages</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose Us</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            We go above and beyond to make your travel experience seamless, safe, and unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
