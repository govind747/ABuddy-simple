/*
  # Tour & Travel Database Seed Data

  This file contains all seed data for testing your Supabase database.
  Run this SQL in your Supabase SQL Editor to populate your tables.

  Tables included:
  - destinations (12 rows)
  - packages (12 rows)
  - gallery (12 rows)
  - blog_posts (6 rows)
  - testimonials (6 rows)
  - offers (6 rows)
*/

-- ============================================================
-- DESTINATIONS
-- ============================================================

INSERT INTO destinations (id, name, country, description, image_url, rating, review_count, price, duration, featured, category) VALUES
(1, 'Bali', 'Indonesia', 'A tropical paradise known for its ancient temples, lush rice terraces, and vibrant culture. Bali offers everything from serene beaches to volcanic mountains.', 'https://images.unsplash.com/photo-1537996197471-d632bd6e6e5e?w=800&q=80', 4.8, 324, 899, '5-7 days', true, 'Beach'),
(2, 'Paris', 'France', 'The City of Light captivates with its iconic Eiffel Tower, world-class museums, charming cafes, and romantic Seine River cruises.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', 4.9, 512, 1299, '4-6 days', true, 'Culture'),
(3, 'Tokyo', 'Japan', 'A mesmerizing blend of ultra-modern technology and traditional temples. From Shibuya crossing to serene gardens, Tokyo never ceases to amaze.', 'https://images.unsplash.com/photo-1540959733332-eab4ded1ed63?w=800&q=80', 4.7, 289, 1499, '5-8 days', true, 'Culture'),
(4, 'Santorini', 'Greece', 'Famous for its stunning sunsets, white-washed buildings with blue domes, and crystal-clear Aegean waters. A dream destination for couples.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', 4.9, 445, 1599, '4-6 days', true, 'Beach'),
(5, 'Swiss Alps', 'Switzerland', 'Majestic snow-capped peaks, pristine lakes, and charming alpine villages. Perfect for skiing, hiking, and breathtaking scenery.', 'https://images.unsplash.com/photo-1531364835185-3a25da6a8b6d?w=800&q=80', 4.8, 198, 2199, '6-8 days', true, 'Mountain'),
(6, 'Maldives', 'Maldives', 'Crystal-clear turquoise waters, overwater bungalows, and pristine white-sand beaches. The ultimate luxury escape.', 'https://images.unsplash.com/photo-1514282401047-d79a71a51bf7?w=800&q=80', 4.9, 367, 2499, '5-7 days', true, 'Beach'),
(7, 'New York', 'USA', 'The city that never sleeps offers Broadway shows, iconic landmarks, world-class dining, and an energy unlike anywhere else.', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80', 4.6, 421, 1399, '4-6 days', false, 'City'),
(8, 'Machu Picchu', 'Peru', 'The ancient Incan citadel perched high in the Andes mountains. A bucket-list destination for adventurers and history lovers.', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80', 4.8, 276, 1899, '6-9 days', false, 'Adventure'),
(9, 'Dubai', 'UAE', 'A futuristic city of skyscrapers, luxury shopping, and desert adventures. From the Burj Khalifa to golden dunes, Dubai dazzles.', 'https://images.unsplash.com/photo-1512453979798-5ea295f9d6a1?w=800&q=80', 4.5, 312, 1699, '4-6 days', false, 'City'),
(10, 'Cape Town', 'South Africa', 'Where mountains meet the sea. Table Mountain, stunning coastlines, vibrant culture, and incredible wildlife await.', 'https://images.unsplash.com/photo-1580060839134-7555b4a4c6a7?w=800&q=80', 4.7, 189, 1299, '5-7 days', false, 'Adventure'),
(11, 'Amalfi Coast', 'Italy', 'Dramatic cliffs, colorful villages, and Mediterranean charm. Drive the winding coastal road and savor authentic Italian cuisine.', 'https://images.unsplash.com/photo-1534113424505-560d3fad5c4b?w=800&q=80', 4.8, 234, 1799, '5-7 days', false, 'Beach'),
(12, 'Kyoto', 'Japan', 'Ancient capital with thousands of temples, traditional tea houses, and stunning bamboo forests. Experience the soul of Japan.', 'https://images.unsplash.com/photo-1493976040374-85c8e12ea389?w=800&q=80', 4.7, 201, 1399, '4-6 days', false, 'Culture')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('destinations_id_seq', 12, true);

-- ============================================================
-- PACKAGES
-- ============================================================

INSERT INTO packages (id, title, destination_id, destination_name, description, image_url, price, original_price, duration, group_size, rating, review_count, featured, includes) VALUES
(1, 'Bali Bliss Retreat', 1, 'Bali', 'Immerse yourself in Balinese culture with temple visits, rice terrace treks, and sunset beach ceremonies. Includes luxury villa stay and spa treatments.', 'https://images.unsplash.com/photo-1537996197471-d632bd6e6e5e?w=800&q=80', 899, 1199, '5 Days', 12, 4.8, 156, true, 'Airport transfer,Luxury villa,Daily breakfast,Spa treatment,Temple tour,Rice terrace trek'),
(2, 'Romantic Paris Escape', 2, 'Paris', 'Experience the magic of Paris with Eiffel Tower visits, Seine River cruises, and gourmet dining at Michelin-starred restaurants.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', 1299, 1699, '4 Days', 8, 4.9, 203, true, 'Airport transfer,4-star hotel,Seine cruise,Eiffel Tower access,Wine tasting,Croissant tour'),
(3, 'Tokyo Discovery Tour', 3, 'Tokyo', 'From Shibuya Crossing to ancient Senso-ji temple, discover the perfect blend of tradition and innovation in Tokyo.', 'https://images.unsplash.com/photo-1540959733332-eab4ded1ed63?w=800&q=80', 1499, 1899, '6 Days', 10, 4.7, 134, true, 'Airport transfer,Boutique hotel,Rail pass,Temple visits,Street food tour,Robot restaurant'),
(4, 'Santorini Sunset Package', 4, 'Santorini', 'Watch legendary sunsets from your cave hotel, explore volcanic beaches, and sail the caldera on a private catamaran.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', 1599, 2099, '5 Days', 6, 4.9, 189, true, 'Airport transfer,Cave hotel,Caldera cruise,Wine tasting,Sunset dinner,Beach hopping'),
(5, 'Swiss Alps Adventure', 5, 'Swiss Alps', 'Conquer the Alps with scenic train rides, mountain hiking, and charming village stays. Includes Jungfraujoch excursion.', 'https://images.unsplash.com/photo-1531364835185-3a25da6a8b6d?w=800&q=80', 2199, 2799, '7 Days', 8, 4.8, 98, true, 'Airport transfer,Mountain lodge,Train passes,Hiking guide,Cheese factory visit,Jungfraujoch trip'),
(6, 'Maldives Luxury Escape', 6, 'Maldives', 'Ultimate overwater villa experience with private pool, butler service, snorkeling with mantas, and dolphin cruises.', 'https://images.unsplash.com/photo-1514282401047-d79a71a51bf7?w=800&q=80', 2499, 3299, '6 Days', 4, 4.9, 167, true, 'Speedboat transfer,Overwater villa,All-inclusive meals,Snorkeling gear,Dolphin cruise,Sunset fishing'),
(7, 'NYC Explorer Pass', 7, 'New York', 'See the Big Apple like a local — Broadway shows, Central Park, Statue of Liberty, and hidden speakeasies.', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80', 1399, 1799, '5 Days', 15, 4.6, 178, false, 'Airport transfer,Manhattan hotel,Subway pass,Broadway show,Statue of Liberty,Food tour'),
(8, 'Inca Trail to Machu Picchu', 8, 'Machu Picchu', 'Trek the legendary Inca Trail through cloud forests to the Lost City. Includes professional guides and camping gear.', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80', 1899, 2399, '8 Days', 10, 4.8, 112, false, 'Airport transfer,Hotel stays,Camping gear,Professional guide,Train tickets,Entry permits'),
(9, 'Dubai Luxury Experience', 9, 'Dubai', 'From the top of Burj Khalifa to desert dune bashing, experience the ultimate in luxury and adventure.', 'https://images.unsplash.com/photo-1512453979798-5ea295f9d6a1?w=800&q=80', 1699, 2199, '5 Days', 12, 4.5, 145, false, 'Airport transfer,5-star hotel,Desert safari,Burj Khalifa access,Gold Souk tour,Dhow cruise'),
(10, 'Cape Town Safari & Coast', 10, 'Cape Town', 'Combine Table Mountain hikes with Big Five safaris and stunning coastal drives along the Cape Peninsula.', 'https://images.unsplash.com/photo-1580060839134-7555b4a4c6a7?w=800&q=80', 1299, 1699, '6 Days', 8, 4.7, 87, false, 'Airport transfer,Boutique hotel,Safari game drive,Table Mountain hike,Cape Point tour,Wine tasting'),
(11, 'Amalfi Coastal Journey', 11, 'Amalfi Coast', 'Drive the legendary Amalfi Coast, visit Positano and Ravello, and learn to make authentic Neapolitan pizza.', 'https://images.unsplash.com/photo-1534113424505-560d3fad5c4b?w=800&q=80', 1799, 2299, '5 Days', 6, 4.8, 103, false, 'Airport transfer,Seaside hotel,Private driver,Cooking class,Limoncello tasting,Boat tour'),
(12, 'Kyoto Cultural Immersion', 12, 'Kyoto', 'Walk through bamboo groves, participate in tea ceremonies, and stay in a traditional ryokan with onsen baths.', 'https://images.unsplash.com/photo-1493976040374-85c8e12ea389?w=800&q=80', 1399, 1799, '5 Days', 8, 4.7, 92, false, 'Airport transfer,Ryokan stay,Tea ceremony,Kimono rental,Bamboo forest guide,Fushimi Inari tour')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('packages_id_seq', 12, true);

-- ============================================================
-- GALLERY
-- ============================================================

INSERT INTO gallery (id, image_url, title, location, category) VALUES
(1, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', 'Tropical Paradise', 'Bali, Indonesia', 'Beach'),
(2, 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', 'Mountain Vista', 'Swiss Alps', 'Mountain'),
(3, 'https://images.unsplash.com/photo-1449824921423-900429980429?w=800&q=80', 'City Lights', 'Tokyo, Japan', 'City'),
(4, 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'Coastal Sunset', 'Santorini, Greece', 'Beach'),
(5, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', 'Desert Dunes', 'Dubai, UAE', 'Adventure'),
(6, 'https://images.unsplash.com/photo-1500530855697-b0141e1b5f9b?w=800&q=80', 'Ancient Temple', 'Kyoto, Japan', 'Culture'),
(7, 'https://images.unsplash.com/photo-1507525428034-b723cf961883?w=800&q=80', 'Beach Walk', 'Maldives', 'Beach'),
(8, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80', 'Mountain Trail', 'Peru', 'Adventure'),
(9, 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', 'Paris Morning', 'Paris, France', 'City'),
(10, 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', 'Safari Sunset', 'Cape Town, South Africa', 'Adventure'),
(11, 'https://images.unsplash.com/photo-1534113424505-560d3fad5c4b?w=800&q=80', 'Coastal Drive', 'Amalfi, Italy', 'Beach'),
(12, 'https://images.unsplash.com/photo-1513635269975-53063b541eb2?w=800&q=80', 'Night Skyline', 'New York, USA', 'City')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('gallery_id_seq', 12, true);

-- ============================================================
-- BLOG POSTS
-- ============================================================

INSERT INTO blog_posts (id, title, excerpt, content, image_url, author, author_avatar, category, read_time) VALUES
(1, '10 Hidden Gems in Southeast Asia', 'Discover off-the-beaten-path destinations that most tourists never find. From secret beaches to ancient ruins, these spots will blow your mind.', 'Southeast Asia is a treasure trove of hidden destinations waiting to be explored. While millions flock to Bali and Phuket, the real magic lies in places that don''t make the Instagram feeds.\n\nFrom the limestone karsts of Phong Nha in Vietnam to the pristine beaches of Koh Kood in Thailand, these destinations offer authentic experiences without the crowds.\n\nHere are our top 10 picks for the adventurous traveler seeking something beyond the ordinary tourist trail.', 'https://images.unsplash.com/photo-1528181304800-259b840de0a4?w=800&q=80', 'Sarah Chen', null, 'Adventure', '8 min read'),
(2, 'The Ultimate Guide to European Train Travel', 'Rail passes, scenic routes, and insider tips for exploring Europe by train. Save money and see more on your next Euro trip.', 'Europe''s rail network is one of the most efficient and scenic ways to explore the continent. Whether you''re zipping between capitals on high-speed trains or winding through alpine valleys on regional routes, train travel offers an experience that flying simply cannot match.\n\nIn this comprehensive guide, we cover everything from choosing the right rail pass to booking strategies, scenic routes you cannot miss, and budget tips that will save you hundreds.', 'https://images.unsplash.com/photo-1474487548417-781cb7c95f70?w=800&q=80', 'Marco Rossi', null, 'Guides', '12 min read'),
(3, 'How to Pack Light for Any Trip', 'Master the art of one-bag travel with our proven packing system. Never check a bag again and travel with true freedom.', 'Packing light is not just about saving on baggage fees — it is about freedom. When everything you need fits in a single carry-on, you move faster, worry less, and enjoy more.\n\nOur tested system involves choosing versatile clothing, using packing cubes effectively, and embracing the concept of layering. Whether you are heading to tropical beaches or snowy mountains, the principles remain the same.', 'https://images.unsplash.com/photo-1556742049-0cf2ef6c0b1e?w=800&q=80', 'Emma Wilson', null, 'Tips', '6 min read'),
(4, 'Best Street Food Around the World', 'From Bangkok''s night markets to Mexico City''s taco stands, discover the most delicious street food on every continent.', 'Street food is the soul of a destination. It tells you more about a culture than any museum can. The sizzle of pad thai on Khao San Road, the aroma of churros in Madrid, the spice of jerk chicken in Kingston — these are the flavors that make travel unforgettable.\n\nWe have curated the ultimate street food guide spanning 20 cities across 6 continents, with tips on what to order, where to find it, and how to stay safe while eating adventurously.', 'https://images.unsplash.com/photo-1555939594-58d6cb0c5a4b?w=800&q=80', 'David Park', null, 'Food', '10 min read'),
(5, 'Photography Tips for Travelers', 'Capture stunning travel photos with just your smartphone. Professional photographer secrets revealed for your next adventure.', 'You do not need expensive camera gear to take breathtaking travel photos. Modern smartphones are incredibly capable, and with the right techniques, you can create images that rival professional work.\n\nFrom golden hour shooting to composition rules, leading lines, and post-processing apps — this guide covers everything you need to elevate your travel photography game.', 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80', 'Lisa Zhang', null, 'Photography', '7 min read'),
(6, 'Sustainable Travel: A Complete Guide', 'Travel responsibly without sacrificing experience. Learn how to reduce your carbon footprint while exploring the world.', 'As travelers, we have a responsibility to protect the destinations we love. Sustainable travel is not about giving up comfort — it is about making smarter choices that benefit both you and the places you visit.\n\nFrom choosing eco-friendly accommodations to supporting local communities, offsetting carbon emissions, and reducing plastic waste, this guide provides actionable steps for every type of traveler.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', 'James Green', null, 'Tips', '9 min read')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('blog_posts_id_seq', 6, true);

-- ============================================================
-- TESTIMONIALS
-- ============================================================

INSERT INTO testimonials (id, name, avatar_url, location, review, rating, trip_destination) VALUES
(1, 'Alex Thompson', null, 'New York, USA', 'Absolutely incredible experience! The Bali package exceeded all my expectations. From the stunning villa to the personalized tours, every detail was perfect. Will definitely book again!', 5, 'Bali, Indonesia'),
(2, 'Maria Garcia', null, 'Madrid, Spain', 'The Paris escape was magical. The Seine cruise at sunset was the highlight of our honeymoon. The hotel was charming and perfectly located. Thank you for an unforgettable trip!', 5, 'Paris, France'),
(3, 'Kenji Tanaka', null, 'Osaka, Japan', 'Even as a Japanese speaker, the Tokyo Discovery Tour showed me hidden gems I never knew existed. The food tour alone was worth the price. Highly recommended!', 4, 'Tokyo, Japan'),
(4, 'Sophie Laurent', null, 'Brussels, Belgium', 'Santorini was a dream come true. The cave hotel with caldera views was breathtaking. The private catamaran cruise was the most romantic experience of my life.', 5, 'Santorini, Greece'),
(5, 'Michael Brown', null, 'Sydney, Australia', 'The Swiss Alps adventure was thrilling. The Jungfraujoch excursion was a once-in-a-lifetime experience. Our guide was knowledgeable and fun. Perfect family trip!', 5, 'Swiss Alps'),
(6, 'Priya Sharma', null, 'Mumbai, India', 'The Maldives luxury escape was pure paradise. The overwater villa with a private pool was incredible. Snorkeling with manta rays was an experience I will never forget.', 5, 'Maldives')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('testimonials_id_seq', 6, true);

-- ============================================================
-- OFFERS
-- ============================================================

INSERT INTO offers (id, title, description, image_url, discount_percent, discount_amount, coupon_code, package_id, destination_id, valid_from, valid_until, active, badge) VALUES
(1, 'Early Bird Special', 'Book 60 days in advance and save big on your dream getaway. Limited spots available!', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', 30, null, 'EARLY30', null, null, NOW(), NOW() + INTERVAL '90 days', true, 'HOT'),
(2, 'Couples Retreat', 'Romantic escapes for two — special discounts on curated couple packages with premium inclusions.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', 20, null, 'COUPLE20', null, null, NOW(), NOW() + INTERVAL '60 days', true, 'NEW'),
(3, 'Group Explorer', 'Groups of 6+ get exclusive negotiated rates. The more you travel together, the more you save.', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', 25, null, 'GROUP25', null, null, NOW(), NOW() + INTERVAL '120 days', true, 'SALE'),
(4, 'Weekend Getaway', 'Flat 15% off all short-trip packages. Perfect for a spontaneous mini-break.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', 15, null, 'WEEKEND15', null, null, NOW(), NOW() + INTERVAL '30 days', true, null),
(5, 'Honeymoon Bliss', 'Exclusive honeymoon packages with complimentary upgrades, candle-lit dinners, and couple spa.', 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80', 18, null, 'HONEY18', null, null, NOW(), NOW() + INTERVAL '45 days', true, 'POPULAR'),
(6, 'Last Minute Deals', 'Grab deeply discounted packages for departures within the next 14 days. Act fast!', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', 40, null, 'LASTMIN40', null, null, NOW(), NOW() + INTERVAL '14 days', true, 'FLASH')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('offers_id_seq', 6, true);

-- ============================================================
-- DONE
-- ============================================================

-- Verify counts
SELECT 'destinations' as table_name, COUNT(*) as count FROM destinations
UNION ALL
SELECT 'packages', COUNT(*) FROM packages
UNION ALL
SELECT 'gallery', COUNT(*) FROM gallery
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'offers', COUNT(*) FROM offers;
