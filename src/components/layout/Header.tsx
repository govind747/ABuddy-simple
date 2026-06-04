import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import NotificationsPanel from '@/components/layout/NotificationsPanel';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Compass, Menu, X, LayoutDashboard, ShoppingBag, Calendar, Circle as XCircle, KeyRound, LogOut, User, ShoppingCart, Tag, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Services',
    submenu: [
      { href: '/services/solo-travel', label: 'Solo Travel' },
      { href: '/services/family-group', label: 'Family Group' },
      { href: '/services/school-group', label: 'School Tours' },
      { href: '/services/college-group', label: 'College Adventures' },
      { href: '/services/corporate', label: 'Corporate Retreats' },
    ]
  },
  { href: '/destinations', label: 'Destinations' },
  { href: '/packages', label: 'Packages' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
];

const userMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/dashboard/upcoming-trips', label: 'Upcoming Journey', icon: Calendar },
  { href: '/dashboard/cancel-history', label: 'Cancel History', icon: XCircle },
  { href: '/dashboard/reset-password', label: 'Update Password', icon: KeyRound },
];

export function Header() {
  const { user, signOut } = useAuth();
  const { count: cartCount } = useCart();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-background/80 backdrop-blur-sm border-b border-border/50'}`}>
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">TRAVEL</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isSubmenu = 'submenu' in link;

              if (isSubmenu) {
                return (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger asChild>
                      <button className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1 text-foreground/70 hover:text-foreground hover:bg-secondary`}>
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {link.submenu?.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <DropdownMenuItem className="cursor-pointer">
                            {item.label}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${location === link.href ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-foreground hover:bg-secondary'}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <NotificationsPanel />

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Cart">
              <ShoppingCart className="h-5 w-5 text-foreground/70" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-colors">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block max-w-20 truncate text-xs">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-xs font-semibold truncate">{user.user_metadata?.full_name || 'Traveler'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/offers" className="flex items-center gap-2 cursor-pointer">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">Offers & Deals</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="rounded-full hidden md:flex gap-1.5" onClick={() => setLoginOpen(true)}>
                <User className="h-3.5 w-3.5" /> Login
              </Button>
            )}

            <button className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background py-4 px-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${location === link.href ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-foreground hover:bg-secondary'}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/offers" className="block px-4 py-2.5 text-sm font-medium text-primary rounded-xl hover:bg-primary/5 transition-colors">
              🏷️ Offers & Deals
            </Link>
            {!user && (
              <div className="pt-2">
                <Button className="w-full rounded-full" size="sm" onClick={() => { setMobileOpen(false); setLoginOpen(true); }}>Login / Sign Up</Button>
              </div>
            )}
            {user && (
              <button onClick={signOut} className="w-full text-left px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
