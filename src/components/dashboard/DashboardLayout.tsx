import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  XCircle,
  KeyRound,
  LogOut,
  User,
  Tag,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'My Profile', icon: User },
  { href: '/dashboard/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/dashboard/upcoming-trips', label: 'Upcoming Journey', icon: Calendar },
  { href: '/dashboard/cancel-history', label: 'Cancel History', icon: XCircle },
  { href: '/dashboard/reset-password', label: 'Update Password', icon: KeyRound },
  { href: '/offers', label: 'Offers & Deals', icon: Tag },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm text-foreground truncate">{user?.user_metadata?.full_name || 'Traveler'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  const isOffer = item.href === '/offers';
                  return (
                    <Link key={item.href} href={item.href}>
                      <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary text-primary-foreground' : isOffer ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    </Link>
                  );
                })}
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
