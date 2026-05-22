import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomepageStats } from '@/lib/supabase-queries';

export function HomeStats() {
  const { data } = useQuery({ queryKey: ['homepage-stats'], queryFn: fetchHomepageStats });

  const stats = [
    { value: data ? `${data.totalDestinations}+` : '500+', label: 'Destinations' },
    { value: data ? `${data.totalPackages}+` : '200+', label: 'Packages' },
    { value: data ? `${(data.totalTravelers / 1000).toFixed(0)}K+` : '15K+', label: 'Happy Travelers' },
    { value: data ? `${data.yearsExperience}+` : '10+', label: 'Years Experience' },
  ];

  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</p>
              <p className="text-background/70 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
