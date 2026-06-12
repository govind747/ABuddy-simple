CREATE TABLE holiday_homes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  home_name TEXT NOT NULL,
  home_type TEXT NOT NULL CHECK (home_type IN ('villa', 'cottage', 'farmhouse', 'apartment', 'bungalow')),
  location TEXT NOT NULL,
  address TEXT,
  price_per_night DECIMAL(10,2) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 4.0,
  total_reviews INTEGER DEFAULT 30,
  image_url TEXT,
  images TEXT[],
  amenities TEXT[],
  bedrooms INTEGER DEFAULT 2,
  bathrooms INTEGER DEFAULT 2,
  max_guests INTEGER DEFAULT 4,
  has_kitchen BOOLEAN DEFAULT true,
  has_pool BOOLEAN DEFAULT false,
  has_garden BOOLEAN DEFAULT true,
  has_parking BOOLEAN DEFAULT true,
  has_wifi BOOLEAN DEFAULT true,
  distance_from_beach DECIMAL(10,2),
  distance_from_market DECIMAL(10,2),
  description TEXT,
  rules TEXT[],
  contact_number TEXT,
  owner_name TEXT,
  available BOOLEAN DEFAULT true
);

ALTER TABLE holiday_homes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_holiday_homes" ON holiday_homes FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "select_holiday_homes_anon" ON holiday_homes FOR SELECT
  TO anon USING (true);

CREATE POLICY "insert_holiday_homes" ON holiday_homes FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_holiday_homes" ON holiday_homes FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_holiday_homes" ON holiday_homes FOR DELETE
  TO authenticated USING (true);
