import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchTrips } from '@/lib/supabase-queries';
import { getUserOrders } from '@/lib/supabase-db';
import { Calendar, ShoppingBag, XCircle, Clock, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

function CurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-6 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-sm mb-1 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Local Time</p>
          <p className="text-4xl font-bold tracking-tight">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-white/70 text-sm mt-1">
            {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-xs flex items-center gap-1 justify-end mb-1"><MapPin className="h-3 w-3" /> Location</p>
          <p className="text-white font-semibold text-sm">Your Dashboard</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: trips, isLoading: tripsLoading } = useQuery({ queryKey: ['trips', user?.id, 'all'], queryFn: () => fetchTrips(user!.id), enabled: !!user?.id });
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    getUserOrders(user.id).then(({ data }) => setOrderCount(data.length));
  }, [user]);

  const upcoming = (trips ?? []).filter(t => t.status === 'upcoming');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Here's a snapshot of your travel activity</p>
        </div>

        <CurrentTime />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="My Orders" value={orderCount} icon={ShoppingBag} />
          <StatsCard label="Upcoming" value={upcoming.length} icon={Calendar} />
          <StatsCard label="Past Trips" value={(trips ?? []).filter(t => t.status === 'past').length} icon={Calendar} />
          <StatsCard label="Cancelled" value={(trips ?? []).filter(t => t.status === 'cancelled').length} icon={XCircle} />
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/dashboard/orders', label: 'My Orders', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
            { href: '/dashboard/upcoming-trips', label: 'Upcoming Journey', icon: Calendar, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
            { href: '/dashboard/cancel-history', label: 'Cancel History', icon: XCircle, color: 'bg-red-50 text-red-600 hover:bg-red-100' },
            { href: '/offers', label: 'Offers & Deals', icon: Calendar, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
          ].map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-border cursor-pointer transition-colors ${color}`}>
                <Icon className="h-6 w-6" />
                <span className="text-xs font-semibold text-center leading-tight">{label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Upcoming trips */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Upcoming Trips</h2>
            <Link href="/dashboard/upcoming-trips">
              <Button variant="outline" size="sm" className="rounded-full text-xs">View All</Button>
            </Link>
          </div>
          {tripsLoading ? (
            <div className="space-y-3">
              {[1, 2].map(i => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
            </div>
          ) : upcoming.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-foreground mb-1">No upcoming trips</p>
              <p className="text-sm text-muted-foreground mb-4">Start exploring destinations to plan your next adventure</p>
              <Link href="/packages">
                <Button size="sm" className="rounded-full">Browse Packages</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.slice(0, 3).map(t => (
                <div key={t.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center">
                  {t.imageUrl && <img src={t.imageUrl} alt={t.destinationName ?? ''} className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{t.destinationName ?? 'Trip'}</p>
                    <p className="text-xs text-muted-foreground">{t.travelDate}</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full capitalize">{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
