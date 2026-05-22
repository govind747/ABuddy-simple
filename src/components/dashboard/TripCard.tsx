import { Calendar, MapPin, Users, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavoriteTrip } from '@/lib/supabase-queries';

interface Trip {
  id: number;
  packageTitle?: string | null;
  destinationName?: string | null;
  imageUrl?: string | null;
  status: string;
  travelDate: string;
  returnDate?: string | null;
  travelers?: number | null;
  price: number;
  isFavorite?: boolean | null;
  userId: string;
}

export function TripCard({ trip }: { trip: Trip }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => toggleFavoriteTrip(trip.id, !trip.isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['favorite-trips'] });
    },
  });

  const handleFavorite = () => mutation.mutate();

  const statusColors: Record<string, string> = {
    upcoming: 'bg-blue-100 text-blue-700',
    past: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-testid={`card-trip-${trip.id}`}>
      <div className="flex flex-col sm:flex-row">
        {trip.imageUrl && (
          <div className="sm:w-40 h-40 sm:h-auto shrink-0">
            <img src={trip.imageUrl} alt={trip.packageTitle ?? 'Trip'} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-bold text-foreground">{trip.packageTitle ?? 'Travel Package'}</h3>
              {trip.destinationName && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />{trip.destinationName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge className={`rounded-full text-xs capitalize ${statusColors[trip.status] ?? 'bg-secondary text-secondary-foreground'}`}>
                {trip.status}
              </Badge>
              <button onClick={handleFavorite} className={`transition-colors ${trip.isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`} data-testid={`button-favorite-${trip.id}`}>
                <Heart className={`h-4 w-4 ${trip.isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(trip.travelDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{trip.travelers ?? 1} traveler{(trip.travelers ?? 1) > 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-primary text-lg">${trip.price.toLocaleString()}</p>
            <Button variant="outline" size="sm" className="rounded-full" data-testid={`button-view-trip-${trip.id}`}>View Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
