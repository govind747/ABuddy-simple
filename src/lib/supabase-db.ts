import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabaseDb = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  mobile: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAddress {
  id: number;
  user_id: string;
  label: string;
  address_line: string;
  city: string;
  state: string | null;
  country: string;
  pincode: string | null;
  is_default: boolean;
  created_at: string;
}

export interface CartItem {
  id: number;
  user_id: string;
  package_id: number;
  quantity: number;
  travelers: number;
  added_at: string;
  package?: PackageSummary;
}

export interface PackageSummary {
  id: number;
  title: string;
  destination_name: string | null;
  image_url: string;
  price: number;
  duration: string;
  rating: number | null;
}

export interface Order {
  id: number;
  user_id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_method: string | null;
  payment_id: string | null;
  payment_status: string;
  traveler_name: string | null;
  traveler_email: string | null;
  traveler_mobile: string | null;
  travel_date: string | null;
  notes: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  package_id: number | null;
  package_title: string;
  destination: string | null;
  image_url: string | null;
  unit_price: number;
  travelers: number;
  total_price: number;
}

export interface Review {
  id: number;
  package_id: number;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  rating: number;
  title: string | null;
  comment: string;
  likes_count: number;
  verified: boolean;
  created_at: string;
  review_comments?: ReviewComment[];
  user_liked?: boolean;
}

export interface ReviewComment {
  id: number;
  review_id: number;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  comment: string;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  discount_percent: number | null;
  discount_amount: number | null;
  coupon_code: string | null;
  package_id: number | null;
  destination_id: number | null;
  valid_from: string;
  valid_until: string | null;
  active: boolean;
  badge: string | null;
  created_at: string;
}

export interface CancelHistory {
  id: number;
  user_id: string;
  order_id: number | null;
  order_number: string | null;
  package_title: string | null;
  destination: string | null;
  original_amount: number | null;
  refund_amount: number | null;
  refund_status: string | null;
  reason: string | null;
  cancelled_at: string;
}

// ── User Profile ───────────────────────────────────────────

export async function getUserProfile(userId: string) {
  const { data, error } = await supabaseDb
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data: data as UserProfile | null, error };
}

export async function upsertUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabaseDb
    .from('user_profiles')
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();
  return { data: data as UserProfile | null, error };
}

// ── Addresses ──────────────────────────────────────────────

export async function getUserAddresses(userId: string) {
  const { data, error } = await supabaseDb
    .from('user_addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });
  return { data: (data ?? []) as UserAddress[], error };
}

export async function addUserAddress(address: Omit<UserAddress, 'id' | 'created_at'>) {
  const { data, error } = await supabaseDb
    .from('user_addresses')
    .insert(address)
    .select()
    .single();
  return { data: data as UserAddress | null, error };
}

export async function updateUserAddress(id: number, updates: Partial<UserAddress>) {
  const { data, error } = await supabaseDb
    .from('user_addresses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data: data as UserAddress | null, error };
}

export async function deleteUserAddress(id: number) {
  const { error } = await supabaseDb.from('user_addresses').delete().eq('id', id);
  return { error };
}

export async function setDefaultAddress(userId: string, addressId: number) {
  await supabaseDb.from('user_addresses').update({ is_default: false }).eq('user_id', userId);
  return supabaseDb.from('user_addresses').update({ is_default: true }).eq('id', addressId);
}

// ── Orders ─────────────────────────────────────────────────

export async function getUserOrders(userId: string) {
  const { data, error } = await supabaseDb
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data: (data ?? []) as Order[], error };
}

export async function getOrder(orderId: number) {
  const { data, error } = await supabaseDb
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single();
  return { data: data as Order | null, error };
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>) {
  const { data, error } = await supabaseDb
    .from('orders')
    .insert(order)
    .select()
    .single();
  return { data: data as Order | null, error };
}

export async function updateOrderStatus(orderId: number, status: string, paymentId?: string) {
  const updates: Record<string, string> = { status, updated_at: new Date().toISOString() };
  if (paymentId) { updates.payment_id = paymentId; updates.payment_status = 'paid'; }
  const { data, error } = await supabaseDb
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();
  return { data: data as Order | null, error };
}

export async function cancelOrder(orderId: number, userId: string, reason: string) {
  const { data: order } = await getOrder(orderId);
  if (!order) return { error: new Error('Order not found') };

  await supabaseDb.from('orders').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', orderId);

  const { error } = await supabaseDb.from('cancel_history').insert({
    user_id: userId,
    order_id: orderId,
    order_number: order.order_number,
    package_title: order.order_items?.[0]?.package_title ?? 'Unknown Package',
    destination: order.order_items?.[0]?.destination ?? null,
    original_amount: order.total_amount,
    refund_amount: order.total_amount * 0.9,
    refund_status: 'processing',
    reason,
  });
  return { error };
}

// ── Cancel History ─────────────────────────────────────────

export async function getCancelHistory(userId: string) {
  const { data, error } = await supabaseDb
    .from('cancel_history')
    .select('*')
    .eq('user_id', userId)
    .order('cancelled_at', { ascending: false });
  return { data: (data ?? []) as CancelHistory[], error };
}

// ── Reviews ────────────────────────────────────────────────

export async function getReviews(packageId: number, userId?: string) {
  const { data, error } = await supabaseDb
    .from('reviews')
    .select('*, review_comments(*)')
    .eq('package_id', packageId)
    .order('created_at', { ascending: false });

  if (!data) return { data: [], error };

  let likedSet = new Set<number>();
  if (userId) {
    const { data: likes } = await supabaseDb
      .from('review_likes')
      .select('review_id')
      .eq('user_id', userId);
    likedSet = new Set((likes ?? []).map((l: { review_id: number }) => l.review_id));
  }

  return {
    data: data.map((r) => ({ ...r, user_liked: likedSet.has(r.id) })) as Review[],
    error,
  };
}

export async function submitReview(review: Omit<Review, 'id' | 'likes_count' | 'verified' | 'created_at' | 'review_comments' | 'user_liked'>) {
  const { data, error } = await supabaseDb
    .from('reviews')
    .insert(review)
    .select()
    .single();
  return { data: data as Review | null, error };
}

export async function toggleReviewLike(reviewId: number, userId: string, liked: boolean) {
  if (liked) {
    await supabaseDb.from('review_likes').delete().eq('review_id', reviewId).eq('user_id', userId);
  } else {
    await supabaseDb.from('review_likes').insert({ review_id: reviewId, user_id: userId });
  }
}

export async function addReviewComment(comment: Omit<ReviewComment, 'id' | 'created_at'>) {
  const { data, error } = await supabaseDb
    .from('review_comments')
    .insert(comment)
    .select()
    .single();
  return { data: data as ReviewComment | null, error };
}

// ── Notifications ──────────────────────────────────────────

export async function getNotifications(userId: string) {
  const { data, error } = await supabaseDb
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30);
  return { data: (data ?? []) as Notification[], error };
}

export async function markNotificationRead(id: number) {
  return supabaseDb.from('notifications').update({ read: true }).eq('id', id);
}

export async function markAllNotificationsRead(userId: string) {
  return supabaseDb.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
}

// ── Offers ─────────────────────────────────────────────────

export async function getActiveOffers() {
  const { data, error } = await supabaseDb
    .from('offers')
    .select('*')
    .eq('active', true)
    .or(`valid_until.is.null,valid_until.gt.${new Date().toISOString()}`)
    .order('created_at', { ascending: false });
  return { data: (data ?? []) as Offer[], error };
}

// ── Booking Inquiries ──────────────────────────────────────

export async function submitBookingInquiry(inquiry: Record<string, unknown>) {
  const { data, error } = await supabaseDb
    .from('booking_inquiries')
    .insert(inquiry)
    .select()
    .single();
  return { data, error };
}

// ── Generate order number ──────────────────────────────────
export function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TT-${ts}-${rand}`;
}
