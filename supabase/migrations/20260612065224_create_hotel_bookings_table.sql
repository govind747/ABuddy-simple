CREATE TABLE hotel_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  hotel_name TEXT NOT NULL,
  hotel_type TEXT NOT NULL CHECK (hotel_type IN ('budget', 'standard', 'premium', 'luxury', 'resort')),
  location TEXT NOT NULL,
  address TEXT,
  price_per_night DECIMAL(10,2) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 4.0,
  total_reviews INTEGER DEFAULT 50,
  image_url TEXT,
  amenities TEXT[],
  room_types TEXT[],
  capacity INTEGER DEFAULT 2,
  ac_available BOOLEAN DEFAULT true,
  wifi_available BOOLEAN DEFAULT true,
  parking_available BOOLEAN DEFAULT true,
  restaurant_available BOOLEAN DEFAULT true,
  distance_from_center DECIMAL(10,2),
  description TEXT,
  contact_number TEXT,
  available BOOLEAN DEFAULT true
);

ALTER TABLE hotel_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_hotel_bookings" ON hotel_bookings FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "select_hotel_bookings_anon" ON hotel_bookings FOR SELECT
  TO anon USING (true);

CREATE POLICY "insert_hotel_bookings" ON hotel_bookings FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_hotel_bookings" ON hotel_bookings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_hotel_bookings" ON hotel_bookings FOR DELETE
  TO authenticated USING (true);
