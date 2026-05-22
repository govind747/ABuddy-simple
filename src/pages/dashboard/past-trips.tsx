import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TripCard } from '@/components/dashboard/TripCard';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchTrips } from '@/lib/supabase-queries';
import { History } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PastTripsPage() {
  const { user } = useAuth();
  const { data: trips, isLoading } = useQuery({ queryKey: ['trips', user?.id, 'past'], queryFn: () => fetchTrips(user!.id, 'past'), enabled: !!user?.id });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Past Trips</h1>
          <p className="text-muted-foreground text-sm mt-1">Your completed travel experiences</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
          </div>
        ) : (trips ?? []).length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-semibold text-foreground mb-2">No past trips</p>
            <p className="text-sm text-muted-foreground">Your completed adventures will appear here</p>
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
