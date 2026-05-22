import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '@/lib/supabase-queries';

export function TravelGallery() {
  const { data, isLoading } = useQuery({ queryKey: ['gallery-home'], queryFn: () => fetchGallery(9) });

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Captured Moments</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Travel Gallery</h2>
          </motion.div>
          <Link href="/gallery">
            <Button variant="outline" className="hidden md:flex rounded-full">View All Photos</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1,2,3,4,5,6,7,8,9].map(i => (
              <Skeleton key={i} className={`w-full rounded-xl ${i === 1 || i === 5 ? 'aspect-square' : 'aspect-[4/3]'}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(data ?? []).slice(0, 9).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                data-testid={`img-gallery-${img.id}`}
              >
                <div className={i === 0 ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-[4/3]'}>
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm">{img.title}</p>
                    {img.location && <p className="text-white/70 text-xs">{img.location}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
