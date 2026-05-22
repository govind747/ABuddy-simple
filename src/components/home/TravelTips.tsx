import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '@/lib/supabase-queries';

export function TravelTips() {
  const { data, isLoading } = useQuery({ queryKey: ['blog-tips'], queryFn: () => fetchBlogPosts(3) });

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Expert Advice</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Travel Tips &amp; Guides</h2>
          </motion.div>
          <Link href="/blog">
            <Button variant="outline" className="hidden md:flex rounded-full">View All Articles</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden border">
                <Skeleton className="aspect-[16/9] w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data ?? []).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300"
                data-testid={`card-blog-${post.id}`}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                      <Badge variant="secondary" className="text-xs rounded-full">{post.category}</Badge>
                    )}
                    {post.readTime && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />{post.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base mb-2 text-foreground line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                  )}
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all" data-testid={`link-read-more-${post.id}`}>
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
