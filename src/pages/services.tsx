import ServiceCard from '@/components/services/ServiceCard';

export default function Services() {
  const soloTravelServices = [
    {
      id: 'solo_travel',
      title: 'Solo Adventure Packages',
      destination: 'Multiple Destinations',
      activities: ['Self-paced exploration', 'Meet fellow travelers', 'Solo hiking', 'Cultural tours'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    },
  ];

  const familyGroupServices = [
    {
      id: 'family_group',
      title: 'Family Vacation Packages',
      destination: 'Beach & Mountain Resorts',
      activities: ['Family-friendly activities', 'Kids entertainment', 'Water sports', 'Shopping tours'],
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    },
  ];

  const schoolGroupServices = [
    {
      id: 'school_group',
      title: 'School Study Tours',
      destination: 'Historical & Educational Sites',
      activities: ['Educational tours', 'Historical sites', 'Science museums', 'Cultural learning'],
      image: 'https://images.unsplash.com/photo-1427504494785-cdl7e9fadeb3?w=800&q=80',
    },
  ];

  const collegeGroupServices = [
    {
      id: 'college_group',
      title: 'College Outdoor Excursions',
      destination: 'Adventure Destinations',
      activities: ['Adventure sports', 'Team building', 'Camping', 'Outdoor activities', 'Night camping'],
      image: 'https://images.unsplash.com/photo-1551632786-de41ec16a82d?w=800&q=80',
    },
  ];

  const corporateServices = [
    {
      id: 'corporate',
      title: 'Corporate Retreats',
      destination: 'Premium Locations',
      activities: ['Team building', 'Strategic sessions', 'Adventure sports', 'Luxury accommodations'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Travel Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect travel package tailored to your needs. From solo adventures to corporate retreats, we have something for everyone.
          </p>
        </div>
      </div>

      {/* Solo Travel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Solo Travel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {soloTravelServices.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* Family Group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 bg-blue-50 py-16 rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Family Group Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {familyGroupServices.map(service => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* School Group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">School Study Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolGroupServices.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* College Group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 bg-green-50 py-16 rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">College Outdoor Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collegeGroupServices.map(service => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Corporate Retreats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporateServices.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}
