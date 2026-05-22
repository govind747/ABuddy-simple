import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchGallery } from '@/lib/supabase-queries';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Beach', 'Mountain', 'City', 'Adventure', 'Culture'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: () => fetchGallery(50) });

  const filtered = (data ?? []).filter(img =>
    activeCategory === 'All' || img.category === activeCategory
  );

  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-20">
        <div className="container text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Visual Journey</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Gallery</h1>
          <p className="text-background/70 max-w-xl mx-auto">A curated collection of moments from our adventures around the world</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => setActiveCategory(cat)}
              data-testid={`button-filter-${cat.toLowerCase()}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => <Skeleton key={i} className="aspect-square rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No images in this category yet</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3"
                data-testid={`img-gallery-${img.id}`}
              >
                <img src={img.imageUrl} alt={img.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
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
    </div>
  );
}
