import { useParams, Link } from 'wouter';
import { Clock, ArrowLeft, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPost } from '@/lib/supabase-queries';

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? '0', 10);

  const { data: post, isLoading } = useQuery({ queryKey: ['blog-post', id], queryFn: () => fetchBlogPost(id), enabled: !!id });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-[40vh] w-full" />
        <div className="container py-12 max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Post not found</p>
          <Link href="/blog">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[45vh] overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container max-w-3xl text-white">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            {post.category && <Badge className="mb-3 rounded-full">{post.category}</Badge>}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              {post.author && <span>{post.author}</span>}
              {post.readTime && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>}
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-3xl mx-auto">
        {post.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-primary pl-5">
            {post.excerpt}
          </p>
        )}
        {post.content && (
          <div className="prose prose-gray max-w-none text-foreground leading-relaxed">
            {post.content.split('\n').map((para, i) => (
              para.trim() ? <p key={i} className="mb-4 text-muted-foreground">{para}</p> : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
