import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Star, MapPin, Phone, Wifi, Car, Utensils, Check, ListFilter as Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface HotelBooking {
  id: string;
  hotel_name: string;
  hotel_type: string;
  location: string;
  address: string;
  price_per_night: number;
  rating: number;
  total_reviews: number;
  image_url: string;
  amenities: string[];
  room_types: string[];
  capacity: number;
  ac_available: boolean;
  wifi_available: boolean;
  parking_available: boolean;
  restaurant_available: boolean;
  distance_from_center: number;
  description: string;
  contact_number: string;
  available: boolean;
}

const hotelTypeLabels: Record<string, string> = {
  budget: 'Budget',
  standard: 'Standard',
  premium: 'Premium',
  luxury: 'Luxury',
  resort: 'Resort',
};

const hotelTypeColors: Record<string, string> = {
  budget: 'bg-gray-100 text-gray-700',
  standard: 'bg-blue-100 text-blue-700',
  premium: 'bg-purple-100 text-purple-700',
  luxury: 'bg-amber-100 text-amber-700',
  resort: 'bg-green-100 text-green-700',
};

export default function HotelBookingPage() {
  const [hotels, setHotels] = useState<HotelBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotel_bookings')
        .select('*')
        .eq('available', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const locations = [...new Set(hotels.map(h => h.location))];
  const hotelTypes = [...new Set(hotels.map(h => h.hotel_type))];

  const filteredHotels = hotels.filter(hotel => {
    if (selectedType !== 'all' && hotel.hotel_type !== selectedType) return false;
    if (selectedLocation !== 'all' && hotel.location !== selectedLocation) return false;
    if (priceRange !== 'all') {
      if (priceRange === 'budget' && hotel.price_per_night > 2000) return false;
      if (priceRange === 'mid' && (hotel.price_per_night < 2000 || hotel.price_per_night > 6000)) return false;
      if (priceRange === 'luxury' && hotel.price_per_night < 6000) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
          alt="Hotel Booking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 via-indigo-900/70 to-indigo-900/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Hotel Booking</h1>
            <p className="text-lg text-indigo-100 max-w-xl mx-auto">
              Find the perfect stay from budget-friendly to luxury accommodations across Telangana
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center">
          <Filter className="h-5 w-5 text-gray-500" />
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="all">All Hotel Types</option>
              {hotelTypes.map(type => (
                <option key={type} value={type}>{hotelTypeLabels[type] || type}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (under Rs 2,000)</option>
              <option value="mid">Mid-range (Rs 2,000 - Rs 6,000)</option>
              <option value="luxury">Luxury (Rs 6,000+)</option>
            </select>
          </div>
          <span className="text-sm text-gray-500 ml-auto">
            {filteredHotels.length} hotels found
          </span>
        </div>

        {/* Hotel List - Row View */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto" />
            <p className="text-gray-500 mt-4">Loading available hotels...</p>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hotels available matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHotels.map((hotel, idx) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto flex-shrink-0 relative">
                    <img
                      src={hotel.image_url}
                      alt={hotel.hotel_name}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full uppercase ${hotelTypeColors[hotel.hotel_type] || 'bg-gray-100 text-gray-700'}`}>
                      {hotelTypeLabels[hotel.hotel_type] || hotel.hotel_type}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{hotel.hotel_name}</h3>
                        <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4" /> {hotel.address}
                        </p>
                        {hotel.distance_from_center && (
                          <p className="text-xs text-gray-500 mt-1">
                            {hotel.distance_from_center} km from city center
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{hotel.rating}</span>
                          <span className="text-xs text-gray-500">({hotel.total_reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">{hotel.description}</p>

                    {/* Quick Amenities */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {hotel.ac_available && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <span className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">AC</span>
                          </span>
                        </span>
                      )}
                      {hotel.wifi_available && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Wifi className="h-5 w-5 text-green-600" />
                        </span>
                      )}
                      {hotel.parking_available && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Car className="h-5 w-5 text-gray-600" />
                        </span>
                      )}
                      {hotel.restaurant_available && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Utensils className="h-5 w-5 text-amber-600" />
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" /> {hotel.capacity} guests
                      </span>
                    </div>

                    {/* Room Types */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {hotel.room_types.slice(0, 3).map((room, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {room}
                        </span>
                      ))}
                    </div>

                    {/* Price and Action */}
                    <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-indigo-600">
                          Rs {hotel.price_per_night.toLocaleString('en-IN')}<span className="text-base font-normal text-gray-500">/night</span>
                        </p>
                      </div>
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
