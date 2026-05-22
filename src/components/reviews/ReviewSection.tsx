import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getReviews, submitReview, toggleReviewLike, addReviewComment, type Review, type ReviewComment } from '@/lib/supabase-db';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Star, ThumbsUp, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface ReviewSectionProps {
  packageId: number;
}

function StarRating({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(s)}
          onMouseEnter={() => !readonly && setHovered(s)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star className={`h-5 w-5 transition-colors ${s <= (hovered || value) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, onLike, onComment }: { review: Review; onLike: (id: number, liked: boolean) => void; onComment: (id: number, comment: ReviewComment) => void }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    setSubmittingComment(true);
    const { data } = await addReviewComment({
      review_id: review.id,
      user_id: user.id,
      user_name: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User',
      avatar_url: null,
      comment: commentText.trim(),
    });
    if (data) {
      onComment(review.id, data);
      setCommentText('');
    }
    setSubmittingComment(false);
  }

  const timeAgo = (() => {
    try { return formatDistanceToNow(new Date(review.created_at), { addSuffix: true }); } catch { return ''; }
  })();

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {review.user_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{review.user_name}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <StarRating value={Math.round(review.rating)} readonly />
      </div>

      {review.title && <p className="font-semibold text-sm text-foreground mb-1">{review.title}</p>}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.comment}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <button
          onClick={() => user && onLike(review.id, review.user_liked ?? false)}
          className={`flex items-center gap-1.5 transition-colors hover:text-primary ${review.user_liked ? 'text-primary font-semibold' : ''}`}
        >
          <ThumbsUp className={`h-3.5 w-3.5 ${review.user_liked ? 'fill-primary' : ''}`} />
          {review.likes_count} {review.likes_count === 1 ? 'Like' : 'Likes'}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 transition-colors hover:text-primary"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {(review.review_comments ?? []).length} {(review.review_comments ?? []).length === 1 ? 'Comment' : 'Comments'}
          {showComments ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pl-4 border-l-2 border-border space-y-3">
              {(review.review_comments ?? []).map(c => (
                <div key={c.id} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary text-foreground flex items-center justify-center font-bold text-xs shrink-0">
                    {c.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="bg-secondary rounded-xl px-3 py-2 flex-1">
                    <p className="font-semibold text-xs text-foreground">{c.user_name}</p>
                    <p className="text-xs text-muted-foreground">{c.comment}</p>
                  </div>
                </div>
              ))}
              {user && (
                <form onSubmit={handleComment} className="flex gap-2 mt-2">
                  <Input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="rounded-full text-xs h-8"
                  />
                  <Button type="submit" size="sm" disabled={!commentText.trim() || submittingComment} className="rounded-full h-8 px-3">
                    <Send className="h-3 w-3" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ReviewSection({ packageId }: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ rating: 0, title: '', comment: '' });
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await getReviews(packageId, user?.id);
    setReviews(data);
    setLoading(false);
  }, [packageId, user?.id]);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (form.rating === 0) { setError('Please select a rating'); return; }
    if (!form.comment.trim()) { setError('Please write a review comment'); return; }

    setSubmitting(true);
    setError('');
    const { data, error: err } = await submitReview({
      package_id: packageId,
      user_id: user.id,
      user_name: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Anonymous',
      avatar_url: null,
      rating: form.rating,
      title: form.title.trim() || null,
      comment: form.comment.trim(),
    });
    if (err) { setError('Failed to submit review. Please try again.'); }
    else if (data) {
      setReviews(prev => [{ ...data, review_comments: [], user_liked: false }, ...prev]);
      setForm({ rating: 0, title: '', comment: '' });
      setShowForm(false);
    }
    setSubmitting(false);
  }

  async function handleLike(reviewId: number, liked: boolean) {
    if (!user) return;
    await toggleReviewLike(reviewId, user.id, liked);
    setReviews(prev => prev.map(r => r.id === reviewId
      ? { ...r, likes_count: r.likes_count + (liked ? -1 : 1), user_liked: !liked }
      : r
    ));
  }

  function handleComment(reviewId: number, comment: ReviewComment) {
    setReviews(prev => prev.map(r => r.id === reviewId
      ? { ...r, review_comments: [...(r.review_comments ?? []), comment] }
      : r
    ));
  }

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const ratingCounts = [5, 4, 3, 2, 1].map(s => ({
    star: s,
    count: reviews.filter(r => Math.round(r.rating) === s).length,
  }));

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reviews</h2>
          <p className="text-muted-foreground text-sm">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
        </div>
        {user && !showForm && (
          <Button onClick={() => setShowForm(true)} className="rounded-full gap-2">
            <Star className="h-4 w-4" /> Write a Review
          </Button>
        )}
        {!user && (
          <p className="text-sm text-muted-foreground">Sign in to leave a review</p>
        )}
      </div>

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
            <StarRating value={Math.round(avgRating)} readonly />
            <p className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-2">{star}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }} />
                </div>
                <span className="text-muted-foreground w-4">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write review form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <form onSubmit={handleSubmit} className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground">Share your experience</h3>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your rating *</p>
                <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
              </div>
              <Input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Review title (optional)"
                className="rounded-xl"
              />
              <Textarea
                value={form.comment}
                onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                placeholder="Share details about your experience..."
                required
                className="rounded-xl resize-none"
                rows={4}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">Cancel</Button>
                <Button type="submit" disabled={submitting} className="rounded-full">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-secondary rounded-2xl animate-pulse" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">No reviews yet</p>
          <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <ReviewCard key={r.id} review={r} onLike={handleLike} onComment={handleComment} />
          ))}
        </div>
      )}
    </div>
  );
}
