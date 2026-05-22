import { Link } from 'wouter';
import { Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '@/lib/supabase-queries';

export default function BlogPage() {
  const { data, isLoading } = useQuery({ queryKey: ['blog-posts'], queryFn: () => fetchBlogPosts(20) });

  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-20">
        <div className="container text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Expert Insights</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Tips &amp; Guides</h1>
          <p className="text-background/70 max-w-xl mx-auto">Expert advice, destination guides, and travel inspiration from our team</p>
        </div>
      </div>

      <div className="container py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden border">
                <Skeleton className="aspect-[16/9] w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data ?? []).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300"
                data-testid={`card-blog-${post.id}`}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && <Badge variant="secondary" className="text-xs rounded-full">{post.category}</Badge>}
                    {post.readTime && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />{post.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  {post.excerpt && <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>}
                  {post.author && (
                    <div className="flex items-center gap-2 mb-4">
                      {post.authorAvatar ? (
                        <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          {post.author.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                  )}
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all" data-testid={`link-read-${post.id}`}>
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
