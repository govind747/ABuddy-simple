import { supabase } from './supabase';

// ── Destinations ───────────────────────────────────────────

export async function fetchDestinations(limit = 50) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(d => ({
    id: d.id as number,
    name: d.name as string,
    country: d.country as string,
    description: d.description as string | null,
    imageUrl: d.image_url as string,
    rating: d.rating as number,
    reviewCount: d.review_count as number,
    price: d.price as number,
    duration: d.duration as string | null,
    featured: d.featured as boolean,
    category: d.category as string | null,
  }));
}

export async function fetchTopDestinations() {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('rating', { ascending: false })
    .limit(6);
  if (error) throw error;
  return (data ?? []).map(d => ({
    id: d.id as number,
    name: d.name as string,
    country: d.country as string,
    imageUrl: d.image_url as string,
    rating: d.rating as number,
    reviewCount: d.review_count as number,
    price: d.price as number,
    duration: d.duration as string | null,
  }));
}

export async function fetchDestination(id: number) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return {
    id: data.id as number,
    name: data.name as string,
    country: data.country as string,
    description: data.description as string | null,
    imageUrl: data.image_url as string,
    rating: data.rating as number,
    reviewCount: data.review_count as number,
    price: data.price as number,
    duration: data.duration as string | null,
    featured: data.featured as boolean,
  };
}

// ── Packages ───────────────────────────────────────────────

export async function fetchPackages(opts?: { destinationId?: number; limit?: number }) {
  let q = supabase
    .from('packages')
    .select('*')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(opts?.limit ?? 50);
  if (opts?.destinationId) {
    q = q.eq('destination_id', opts.destinationId);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map(p => ({
    id: p.id as number,
    title: p.title as string,
    destinationId: p.destination_id as number,
    destinationName: p.destination_name as string | null,
    description: p.description as string | null,
    imageUrl: p.image_url as string,
    price: p.price as number,
    originalPrice: p.original_price as number | null,
    duration: p.duration as string,
    groupSize: p.group_size as number | null,
    rating: p.rating as number,
    reviewCount: p.review_count as number,
    featured: p.featured as boolean,
    includes: p.includes as string | null,
  }));
}

export async function fetchPopularPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('rating', { ascending: false })
    .limit(6);
  if (error) throw error;
  return (data ?? []).map(p => ({
    id: p.id as number,
    title: p.title as string,
    destinationName: p.destination_name as string | null,
    imageUrl: p.image_url as string,
    price: p.price as number,
    originalPrice: p.original_price as number | null,
    duration: p.duration as string,
    groupSize: p.group_size as number | null,
    rating: p.rating as number,
    reviewCount: p.review_count as number,
    featured: p.featured as boolean,
  }));
}

export async function fetchPackage(id: number) {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return {
    id: data.id as number,
    title: data.title as string,
    destinationId: data.destination_id as number,
    destinationName: data.destination_name as string | null,
    description: data.description as string | null,
    imageUrl: data.image_url as string,
    price: data.price as number,
    originalPrice: data.original_price as number | null,
    duration: data.duration as string,
    groupSize: data.group_size as number | null,
    rating: data.rating as number,
    reviewCount: data.review_count as number,
    featured: data.featured as boolean,
    includes: data.includes as string | null,
  };
}

// ── Gallery ────────────────────────────────────────────────

export async function fetchGallery(limit = 50) {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(g => ({
    id: g.id as number,
    imageUrl: g.image_url as string,
    title: g.title as string,
    location: g.location as string | null,
    category: g.category as string | null,
  }));
}

// ── Blog ───────────────────────────────────────────────────

export async function fetchBlogPosts(limit = 20) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(b => ({
    id: b.id as number,
    title: b.title as string,
    excerpt: b.excerpt as string | null,
    content: b.content as string | null,
    imageUrl: b.image_url as string,
    author: b.author as string | null,
    authorAvatar: b.author_avatar as string | null,
    category: b.category as string | null,
    readTime: b.read_time as string | null,
    publishedAt: b.published_at as string,
  }));
}

export async function fetchBlogPost(id: number) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return {
    id: data.id as number,
    title: data.title as string,
    excerpt: data.excerpt as string | null,
    content: data.content as string | null,
    imageUrl: data.image_url as string,
    author: data.author as string | null,
    authorAvatar: data.author_avatar as string | null,
    category: data.category as string | null,
    readTime: data.read_time as string | null,
    publishedAt: data.published_at as string,
  };
}

// ── Testimonials ───────────────────────────────────────────

export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(t => ({
    id: t.id as number,
    name: t.name as string,
    avatarUrl: t.avatar_url as string | null,
    location: t.location as string | null,
    review: t.review as string,
    rating: t.rating as number,
    tripDestination: t.trip_destination as string | null,
  }));
}

// ── Homepage Stats ─────────────────────────────────────────

export async function fetchHomepageStats() {
  const [{ count: destCount }, { count: pkgCount }, { count: tripCount }] = await Promise.all([
    supabase.from('destinations').select('*', { count: 'exact', head: true }),
    supabase.from('packages').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
  ]);
  return {
    totalDestinations: destCount ?? 12,
    totalPackages: pkgCount ?? 8,
    totalTravelers: Math.max((tripCount ?? 0) * 3, 1000),
    yearsExperience: 10,
  };
}

// ── Trips ──────────────────────────────────────────────────

export async function fetchTrips(userId: string, status?: string) {
  let q = supabase
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .order('travel_date', { ascending: true });
  if (status && status !== 'all') {
    q = q.eq('status', status);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map(t => ({
    id: t.id as number,
    userId: t.user_id as string,
    packageTitle: t.package_title as string | null,
    destinationName: t.destination_name as string | null,
    imageUrl: t.image_url as string | null,
    status: t.status as string,
    travelDate: t.travel_date as string,
    returnDate: t.return_date as string | null,
    travelers: t.travelers as number,
    price: t.price as number,
    isFavorite: t.is_favorite as boolean,
  }));
}

export async function fetchFavoriteTrips(userId: string) {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('travel_date', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(t => ({
    id: t.id as number,
    userId: t.user_id as string,
    packageTitle: t.package_title as string | null,
    destinationName: t.destination_name as string | null,
    imageUrl: t.image_url as string | null,
    status: t.status as string,
    travelDate: t.travel_date as string,
    returnDate: t.return_date as string | null,
    travelers: t.travelers as number,
    price: t.price as number,
    isFavorite: t.is_favorite as boolean,
  }));
}

export async function toggleFavoriteTrip(tripId: number, isFavorite: boolean) {
  const { error } = await supabase
    .from('trips')
    .update({ is_favorite: isFavorite })
    .eq('id', tripId);
  if (error) throw error;
}

// ── Transactions (from orders) ─────────────────────────────

export async function fetchTransactions(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(o => ({
    id: o.id as number,
    packageTitle: ((o.order_items as { package_title?: string }[] | null)?.[0]?.package_title) ?? null,
    amount: o.total_amount as number,
    status: o.payment_status as string,
    paymentMethod: o.payment_method as string | null,
    createdAt: o.created_at as string,
  }));
}
