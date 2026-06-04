/*
  # Create Notifications Table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users - nullable for non-logged-in users)
      - `title` (text)
      - `message` (text)
      - `type` (text - info, success, warning, error, booking)
      - `icon` (text - optional, icon name)
      - `read` (boolean, default false)
      - `action_url` (text - optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `notifications` table
    - Add policy for users to view their own notifications
    - Add policy for admins to create notifications

  3. Indexes
    - Index on user_id for faster queries
    - Index on created_at for sorting
    - Index on read for filtering unread
*/

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'booking')),
  icon TEXT,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON public.notifications(read);
