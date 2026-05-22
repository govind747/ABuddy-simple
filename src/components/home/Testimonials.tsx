import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '@/lib/supabase-queries';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonials() {
  const { data, isLoading } = useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials });
  const [current, setCurrent] = useState(0);

  const testimonials = data ?? [];
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 bg-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Traveler Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Travelers Say</h2>
        </motion.div>

        {isLoading ? (
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        ) : testimonials.length === 0 ? null : (
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(current, current + 3).concat(testimonials.slice(0, Math.max(0, 3 - (testimonials.length - current)))).slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                  data-testid={`card-testimonial-${t.id}`}
                >
                  <Quote className="h-6 w-6 text-primary mb-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">{t.review}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(t.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {testimonials.length > 3 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <Button variant="outline" size="icon" onClick={prev} className="rounded-full h-10 w-10" data-testid="button-testimonial-prev">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-1.5">
                  {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i * 3)}
                      className={`h-2 rounded-full transition-all ${Math.floor(current / 3) === i ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={next} className="rounded-full h-10 w-10" data-testid="button-testimonial-next">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
