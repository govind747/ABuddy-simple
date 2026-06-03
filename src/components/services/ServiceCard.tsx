import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import QueryModal from './QueryModal';

interface ServiceCardProps {
  id: string;
  title: string;
  image: string;
  destination: string;
  activities: string[];
}

export default function ServiceCard({ id, title, image, destination, activities }: ServiceCardProps) {
  const [showQuery, setShowQuery] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Destination:</p>
            <p className="text-gray-800 font-medium">{destination}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Activities:</p>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {activity}
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setShowQuery(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Explore More
          </Button>
        </div>
      </Card>

      {showQuery && (
        <QueryModal
          serviceType={id}
          serviceTitle={title}
          onClose={() => setShowQuery(false)}
        />
      )}
    </>
  );
}
