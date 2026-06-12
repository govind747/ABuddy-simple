import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, Star, MapPin, Phone, Clock, Check, ListFilter as Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface TaxiBooking {
  id: string;
  car_name: string;
  car_type: string;
  capacity: number;
  price_per_km: number;
  min_km: number;
  image_url: string;
  features: string[];
  ac_available: boolean;
  driver_experience: number;
  rating: number;
  total_trips: number;
  location: string;
  available: boolean;
}

const carTypeLabels: Record<string, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  hatchback: 'Hatchback',
  luxury: 'Luxury',
  tempo: 'Tempo Traveller',
};

export default function TaxiBookingPage() {
  const [taxis, setTaxis] = useState<TaxiBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  useEffect(() => {
    fetchTaxis();
  }, []);

  const fetchTaxis = async () => {
    try {
      const { data, error } = await supabase
        .from('taxi_bookings')
        .select('*')
        .eq('available', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setTaxis(data || []);
    } catch (error) {
      console.error('Error fetching taxis:', error);
    } finally {
      setLoading(false);
    }
  };

  const locations = [...new Set(taxis.map(t => t.location))];
  const carTypes = [...new Set(taxis.map(t => t.car_type))];

  const filteredTaxis = taxis.filter(taxi => {
    if (selectedType !== 'all' && taxi.car_type !== selectedType) return false;
    if (selectedLocation !== 'all' && taxi.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1449960233566-6c1d1e1e0d6e?w=1600&q=80"
          alt="Taxi Booking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/70 to-blue-900/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Taxi Booking</h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto">
              Reliable cabs with experienced drivers for your safe journey across Telangana
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
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="all">All Car Types</option>
              {carTypes.map(type => (
                <option key={type} value={type}>{carTypeLabels[type] || type}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-500 ml-auto">
            {filteredTaxis.length} vehicles found
          </span>
        </div>

        {/* Taxi List - Row View */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="text-gray-500 mt-4">Loading available taxis...</p>
          </div>
        ) : filteredTaxis.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No taxis available matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTaxis.map((taxi, idx) => (
              <motion.div
                key={taxi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-72 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={taxi.image_url}
                      alt={taxi.car_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase">
                            {carTypeLabels[taxi.car_type] || taxi.car_type}
                          </span>
                          {taxi.ac_available && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              AC
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{taxi.car_name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" /> {taxi.capacity} seats
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> {taxi.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {taxi.driver_experience}+ yrs exp
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{taxi.rating}</span>
                          <span className="text-xs text-gray-500">({taxi.total_trips} trips)</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {taxi.features.slice(0, 4).map((feature, i) => (
                        <span key={i} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          <Check className="h-3 w-3 text-green-600" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and Action */}
                    <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-blue-600">
                          Rs {taxi.price_per_km.toLocaleString('en-IN')}<span className="text-base font-normal text-gray-500">/km</span>
                        </p>
                        <p className="text-xs text-gray-500">Min. {taxi.min_km} km booking</p>
                      </div>
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
