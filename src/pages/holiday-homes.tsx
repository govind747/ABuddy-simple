import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chrome as Home, Users, Star, MapPin, Phone, Wifi, Car, BedDouble, Bath, Check, ListFilter as Filter, TreePalm, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface HolidayHome {
  id: string;
  home_name: string;
  home_type: string;
  location: string;
  address: string;
  price_per_night: number;
  rating: number;
  total_reviews: number;
  image_url: string;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  has_kitchen: boolean;
  has_pool: boolean;
  has_garden: boolean;
  has_parking: boolean;
  has_wifi: boolean;
  distance_from_beach: number | null;
  distance_from_market: number;
  description: string;
  rules: string[];
  contact_number: string;
  owner_name: string;
  available: boolean;
}

const homeTypeLabels: Record<string, string> = {
  villa: 'Villa',
  cottage: 'Cottage',
  farmhouse: 'Farmhouse',
  apartment: 'Apartment',
  bungalow: 'Bungalow',
};

const homeTypeColors: Record<string, string> = {
  villa: 'bg-purple-100 text-purple-700',
  cottage: 'bg-green-100 text-green-700',
  farmhouse: 'bg-amber-100 text-amber-700',
  apartment: 'bg-blue-100 text-blue-700',
  bungalow: 'bg-rose-100 text-rose-700',
};

export default function HolidayHomesPage() {
  const [homes, setHomes] = useState<HolidayHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const { data, error } = await supabase
        .from('holiday_homes')
        .select('*')
        .eq('available', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setHomes(data || []);
    } catch (error) {
      console.error('Error fetching holiday homes:', error);
    } finally {
      setLoading(false);
    }
  };

  const locations = [...new Set(homes.map(h => h.location))];
  const homeTypes = [...new Set(homes.map(h => h.home_type))];

  const filteredHomes = homes.filter(home => {
    if (selectedType !== 'all' && home.home_type !== selectedType) return false;
    if (selectedLocation !== 'all' && home.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1564013799919-abba0fc483d5?w=1600&q=80"
          alt="Holiday Homes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-emerald-900/70 to-emerald-900/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Holiday Homes</h1>
            <p className="text-lg text-emerald-100 max-w-xl mx-auto">
              Discover private villas, farmhouses, and cottages for your perfect getaway
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
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-700"
            >
              <option value="all">All Home Types</option>
              {homeTypes.map(type => (
                <option key={type} value={type}>{homeTypeLabels[type] || type}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-700"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-500 ml-auto">
            {filteredHomes.length} homes found
          </span>
        </div>

        {/* Homes List - Row View */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
            <p className="text-gray-500 mt-4">Loading holiday homes...</p>
          </div>
        ) : filteredHomes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No holiday homes available matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHomes.map((home, idx) => (
              <motion.div
                key={home.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto flex-shrink-0 relative">
                    <img
                      src={home.image_url}
                      alt={home.home_name}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full uppercase ${homeTypeColors[home.home_type] || 'bg-gray-100 text-gray-700'}`}>
                      {homeTypeLabels[home.home_type] || home.home_type}
                    </span>
                    {home.distance_from_beach !== null && home.distance_from_beach < 1 && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Waves className="h-3 w-3" /> Beach
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{home.home_name}</h3>
                        <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4" /> {home.address || home.location}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Hosted by {home.owner_name}</p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{home.rating}</span>
                          <span className="text-xs text-gray-500">({home.total_reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">{home.description}</p>

                    {/* Property Details */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" /> {home.bedrooms} Bedrooms
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {home.bathrooms} Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {home.max_guests} Guests
                      </span>
                    </div>

                    {/* Quick Amenities Icons */}
                    <div className="flex flex-wrap gap-3 mt-3">
                      {home.has_kitchen && (
                        <span className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-orange-50 rounded">
                          Kitchen
                        </span>
                      )}
                      {home.has_pool && (
                        <span className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-blue-50 rounded">
                          Pool
                        </span>
                      )}
                      {home.has_garden && (
                        <span className="flex items-center gap-1 text-xs text-gray-600 px-2 py-1 bg-green-50 rounded">
                          <TreePalm className="h-3 w-3" /> Garden
                        </span>
                      )}
                      {home.has_wifi && (
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <Wifi className="h-4 w-4 text-green-600" />
                        </span>
                      )}
                      {home.has_parking && (
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <Car className="h-4 w-4 text-gray-600" />
                        </span>
                      )}
                    </div>

                    {/* Distance Info */}
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                      {home.distance_from_beach !== null && (
                        <span className="flex items-center gap-1">
                          <Waves className="h-3 w-3 text-blue-500" /> {home.distance_from_beach} km to beach
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        {home.distance_from_market} km to market
                      </span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          Rs {home.price_per_night.toLocaleString('en-IN')}<span className="text-base font-normal text-gray-500">/night</span>
                        </p>
                      </div>
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Contact Host
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
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
