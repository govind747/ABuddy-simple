/*
  # Create Queries Table

  1. New Tables
    - `queries`
      - `id` (integer, primary key)
      - `user_id` (uuid, foreign key to auth.users - nullable for non-logged-in users)
      - `service_type` (text - solo_travel, family_group, school_group, college_group, corporate)
      - `name` (text)
      - `email` (text)
      - `mobile` (text)
      - `number_of_travelers` (integer)
      - `travel_dates` (text - date range)
      - `destination_interest` (text - nullable)
      - `special_requests` (text - nullable)
      - `status` (text - pending, contacted, converted)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `queries` table
    - Add policy for users to view their own queries
    - Add policy for anyone to insert queries (both authenticated and anonymous)

  3. Indexes
    - Index on user_id for faster queries
    - Index on service_type for filtering
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS public.queries (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('solo_travel', 'family_group', 'school_group', 'college_group', 'corporate')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  number_of_travelers INTEGER NOT NULL DEFAULT 1,
  travel_dates TEXT,
  destination_interest TEXT,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own queries
CREATE POLICY "Users can view own queries"
  ON public.queries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Anyone can insert queries (with or without login)
CREATE POLICY "Anyone can submit queries"
  ON public.queries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS queries_user_id_idx ON public.queries(user_id);
CREATE INDEX IF NOT EXISTS queries_service_type_idx ON public.queries(service_type);
CREATE INDEX IF NOT EXISTS queries_created_at_idx ON public.queries(created_at DESC);
