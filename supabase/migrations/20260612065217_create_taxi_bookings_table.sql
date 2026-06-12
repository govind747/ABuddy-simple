CREATE TABLE taxi_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  car_name TEXT NOT NULL,
  car_type TEXT NOT NULL CHECK (car_type IN ('sedan', 'suv', 'hatchback', 'luxury', 'tempo')),
  capacity INTEGER NOT NULL,
  price_per_km DECIMAL(10,2) NOT NULL,
  min_km INTEGER DEFAULT 10,
  image_url TEXT,
  features TEXT[],
  ac_available BOOLEAN DEFAULT true,
  driver_experience INTEGER DEFAULT 5,
  rating DECIMAL(3,2) DEFAULT 4.5,
  total_trips INTEGER DEFAULT 100,
  location TEXT NOT NULL,
  available BOOLEAN DEFAULT true
);

ALTER TABLE taxi_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_taxi_bookings" ON taxi_bookings FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "select_taxi_bookings_anon" ON taxi_bookings FOR SELECT
  TO anon USING (true);

CREATE POLICY "insert_taxi_bookings" ON taxi_bookings FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_taxi_bookings" ON taxi_bookings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_taxi_bookings" ON taxi_bookings FOR DELETE
  TO authenticated USING (true);
