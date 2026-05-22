import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TripCard } from '@/components/dashboard/TripCard';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchFavoriteTrips } from '@/lib/supabase-queries';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoriteTripsPage() {
  const { user } = useAuth();
  const { data: trips, isLoading } = useQuery({ queryKey: ['favorite-trips', user?.id], queryFn: () => fetchFavoriteTrips(user!.id), enabled: !!user?.id });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Favorite Trips</h1>
          <p className="text-muted-foreground text-sm mt-1">Trips you have marked as favorites</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1,2].map(i => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
          </div>
        ) : (trips ?? []).length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-semibold text-foreground mb-2">No favorite trips yet</p>
            <p className="text-sm text-muted-foreground">Heart a trip to save it here for quick access</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(trips ?? []).map(t => <TripCard key={t.id} trip={{ ...t, userId: user?.id ?? '' }} />)}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
