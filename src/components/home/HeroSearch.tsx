import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Building2, Chrome as Home, Brain as Train, Plane, MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

interface SearchTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
}

const searchTabs: SearchTab[] = [
  { id: 'taxi', label: 'Taxi', icon: <Car className="h-5 w-5" />, href: '/taxi-booking' },
  { id: 'hotel', label: 'Hotel', icon: <Building2 className="h-5 w-5" />, href: '/hotel-booking' },
  { id: 'holiday', label: 'Holiday Homes', icon: <Home className="h-5 w-5" />, href: '/holiday-homes' },
  { id: 'train', label: 'Train Ticket', icon: <Train className="h-5 w-5" />, href: '/train-booking', disabled: true },
  { id: 'flight', label: 'Flight', icon: <Plane className="h-5 w-5" />, href: '/flight-booking', disabled: true },
];

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState('taxi');
  const [location, setLocation] = useLocation();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    dropDate: '',
    guests: '1',
  });

  const handleSearch = () => {
    const tab = searchTabs.find(t => t.id === activeTab);
    if (tab && !tab.disabled) {
      setLocation(tab.href);
    }
  };

  const currentTab = searchTabs.find(t => t.id === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-1 mb-4">
        {searchTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-lg'
                : tab.disabled
                ? 'bg-white/20 text-white/40 cursor-not-allowed'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form Container */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
      >
        {currentTab?.disabled ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              {currentTab.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This service is currently under development.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* From / Location */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  {activeTab === 'taxi' ? 'Pickup Location' : activeTab === 'hotel' ? 'Destination' : 'Location'}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={activeTab === 'taxi' ? 'Enter pickup city' : activeTab === 'hotel' ? 'Enter city' : 'Enter location'}
                    value={searchData.from}
                    onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* To / Check-in */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  {activeTab === 'taxi' ? 'Drop Location' : 'Check-in'}
                </label>
                <div className="relative">
                  {activeTab === 'taxi' ? (
                    <>
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter drop city"
                        value={searchData.to}
                        onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      />
                    </>
                  ) : (
                    <>
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchData.pickupDate}
                        onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Date / Check-out */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  {activeTab === 'taxi' ? 'Pickup Date' : 'Check-out'}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={activeTab === 'taxi' ? 'date' : 'date'}
                    value={activeTab === 'taxi' ? searchData.pickupDate : searchData.dropDate}
                    onChange={(e) => setSearchData({
                      ...searchData,
                      [activeTab === 'taxi' ? 'pickupDate' : 'dropDate']: e.target.value
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  {activeTab === 'taxi' ? 'Passengers' : 'Guests'}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none bg-white"
                  >
                    {activeTab === 'taxi' ? (
                      <>
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4 Passengers</option>
                        <option value="5">5+ Passengers</option>
                      </>
                    ) : (
                      <>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all text-lg"
              >
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
