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
import { 
  Menu, X, LayoutDashboard, ShoppingBag, Calendar, Circle as XCircle, 
  KeyRound, LogOut, User, ShoppingCart, Tag, ChevronDown, Sparkles,
  Car, Hotel, Train, Plane, Home, UserPlus, FilePlus, Users, Briefcase, 
  FileCheck, Shield, DollarSign, HelpCircle, CalendarDays, Map, Calculator, 
  BellRing, Layers
} from 'lucide-react';

interface SubmenuSection {
  sectionTitle: string;
  items: { href: string; label: string; desc?: string; icon: any }[];
}

interface NavLink {
  href?: string;
  label: string;
  sections?: SubmenuSection[];
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    label: 'Services',
    sections: [
      {
        sectionTitle: "Core Booking Desks",
        items: [
          { href: '/services/taxi-booking', label: 'Taxi Booking', desc: 'Hills-certified fleet transit', icon: Car },
          { href: '/services/hotel-booking', label: 'Hotel Booking', desc: 'Verified alpine accommodations', icon: Hotel },
          { href: '/services/train-ticket', label: 'Train Tickets', desc: 'IRCTC regional connectivity', icon: Train },
          { href: '/services/flight-ticket', label: 'Flight Tickets', desc: 'Domestic & charter routes', icon: Plane },
          { href: '/services/holiday-homes', label: 'Holiday Homes', desc: 'Exclusive local luxury stays', icon: Home },
        ]
      },
      {
        sectionTitle: "Partner & Agent Portals",
        items: [
          { href: '/portals/become-agent', label: 'Become an Agent', desc: 'Earn with our network layout', icon: UserPlus },
          { href: '/portals/add-services', label: 'Add Services', desc: 'List your regional logistics', icon: FilePlus },
          { href: '/portals/agent-login', label: 'Agent Portal', desc: 'B2C tracking interface console', icon: Users },
          { href: '/portals/services-login', label: 'Services Portal', desc: 'Vendor inventory allocations', icon: Layers },
          { href: '/portals/corporate-agent', label: 'Corporate Agent', desc: 'Managed enterprise dashboards', icon: Briefcase },
        ]
      },
      {
        sectionTitle: "Corporate & Governance",
        items: [
          { href: '/corporate/docs', label: 'Company Dox', desc: 'Statutory registry & compliance', icon: FileCheck },
          { href: '/corporate/media-kit', label: 'Media Kit', desc: 'Brand assets & press components', icon: Shield },
          { href: '/corporate/financials', label: 'Financials', desc: 'Audit configurations & returns', icon: DollarSign },
          { href: '/corporate/team', label: 'Team Info', desc: 'Meet our expedition architects', icon: Users },
          { href: '/corporate/investor-relations', label: 'Investor Relations', desc: 'Stakeholder resource channels', icon: HelpCircle },
        ]
      },
      {
        sectionTitle: "Expedition Utility Tools",
        items: [
          { href: '/tools/planning-calendar', label: 'Planning Calendar', desc: 'High-altitude weather mapping', icon: CalendarDays },
          { href: '/tools/itinerary-planner', label: 'Itinerary Planner', desc: 'Dynamic day-to-day generator', icon: Map },
          { href: '/tools/destination-planner', label: 'Destination Planner', desc: 'Regional perimeter coordinator', icon: Layers },
          { href: '/tools/budget-planner', label: 'Budget Planner', desc: 'Cost allocation parameters', icon: DollarSign },
          { href: '/tools/finance-calculator', label: 'Trip Finance Calculator', desc: 'EMI & pooled expense mapping', icon: Calculator },
          { href: '/tools/holiday-calendar', label: 'Holiday Calendar', desc: 'National & regional holiday matrices', icon: Calendar },
          { href: '/tools/alert-setup', label: 'Alert Setup', desc: 'Instant route anomaly triggers', icon: BellRing },
        ]
      }
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
  
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState<{ [key: string]: boolean }>({});
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { 
    setMobileOpen(false); 
    setMobileSectionsOpen({});
  }, [location]);

  const toggleMobileSection = (section: string) => {
    setMobileSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white border-b border-slate-200/85 shadow-md shadow-slate-100/50' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
      }`}>
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          
          {/* IDENTITY BRAND CORE */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="AdventureBuddy Logo" 
              className="h-8 w-auto object-contain transition-transform duration-500 group-hover:rotate-[15deg]" 
            />
            <span className="text-xl font-black tracking-tighter text-blue-950">
              AdventureBuddy
            </span>
          </Link>

          {/* DESKTOP NAVIGATION INTERFACE */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-full border border-slate-200/60">
            {navLinks.map((link) => {
              const isMegaMenu = 'sections' in link;
              const isActive = location === link.href;

              if (isMegaMenu) {
                const isSubmenuActive = link.sections?.some(sec => sec.items.some(item => location === item.href));

                return (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger asChild>
                      <button className={`group px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-1.5 outline-none ${
                        isSubmenuActive 
                          ? 'text-white bg-primary shadow-lg' 
                          : 'text-blue-950 hover:text-primary hover:bg-slate-200/50'
                      }`}>
                        {link.label}
                        <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>
                    
                    {/* ENHANCED MULTI-COLUMN MEGA DROPDOWN */}
                    <DropdownMenuContent 
                      align="center" 
                      sideOffset={14}
                      className="w-[85vw] max-w-5xl p-6 bg-white border border-slate-200 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in-50 slide-in-from-top-3 duration-300"
                    >
                      {link.sections?.map((section) => (
                        <div key={section.sectionTitle} className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-slate-100 pb-1.5 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-orange-500" /> {section.sectionTitle}
                          </p>
                          <div className="space-y-1">
                            {section.items.map((item) => {
                              const isChildActive = location === item.href;
                              const ItemIcon = item.icon;
                              return (
                                <Link key={item.href} href={item.href}>
                                  <DropdownMenuItem className={`cursor-pointer rounded-xl px-3 py-2 transition-all duration-200 flex items-start gap-3 ${
                                    isChildActive 
                                      ? 'bg-primary text-white focus:bg-primary focus:text-white font-bold' 
                                      : 'text-blue-950 focus:text-primary focus:bg-slate-50'
                                  }`}>
                                    <ItemIcon className={`h-4 w-4 mt-0.5 shrink-0 ${isChildActive ? 'text-white' : 'text-slate-500 group-hover:text-primary'}`} />
                                    <div className="flex flex-col gap-0.5">
                                      <span className="text-xs font-bold tracking-wide">{item.label}</span>
                                      <span className={`text-[10px] leading-normal font-medium ${isChildActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                        {item.desc}
                                      </span>
                                    </div>
                                  </DropdownMenuItem>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'text-white bg-primary shadow-lg' 
                      : 'text-blue-950 hover:text-primary hover:bg-slate-200/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTON SYSTEMS */}
          <div className="flex items-center gap-2">
            <NotificationsPanel />

            {/* Shopping Cart Trigger */}
            <button 
              onClick={() => setCartOpen(true)} 
              className="relative p-2.5 rounded-full text-blue-950 hover:text-primary hover:bg-slate-50 transition-all duration-200" 
              aria-label="Shopping Cart Drawer"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 leading-none border border-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-950 hover:bg-primary hover:text-white transition-all duration-200 group">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-blue-950 group-hover:bg-white group-hover:text-primary flex items-center justify-center text-[10px] font-black transition-colors duration-200">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block max-w-[90px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                    <ChevronDown className="h-3 w-3 text-slate-500 group-hover:text-white hidden sm:block transition-colors duration-200" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1 bg-white border border-slate-200 rounded-xl text-blue-950 shadow-xl">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-black uppercase tracking-wider truncate text-primary">{user.user_metadata?.full_name || 'Active Explorer'}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">{user.email}</p>
                  </div>
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-950 focus:bg-primary focus:text-white">
                          <Icon className="h-3.5 w-3.5 text-slate-400 focus:text-white" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem asChild>
                    <Link href="/offers" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-primary focus:bg-primary focus:text-white">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Offers & Deals</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem className="text-red-500 focus:text-white focus:bg-red-500 cursor-pointer rounded-lg px-2.5 py-2 text-xs font-bold uppercase tracking-wider" onClick={signOut}>
                    <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full hidden md:flex gap-1.5 border-slate-200 bg-white text-blue-950 hover:bg-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200" 
                onClick={() => setLoginOpen(true)}
              >
                <User className="h-3.5 w-3.5" /> Login
              </Button>
            )}

            {/* Mobile Expand Trigger */}
            <button className="md:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-blue-950 hover:text-primary transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE RESPONSIVE DRAWDOWN NAVIGATION CONTAINER */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1.5 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => {
              const isMegaMenu = 'sections' in link;
              
              if (isMegaMenu) {
                const isParentOpen = mobileSectionsOpen[link.label];
                return (
                  <div key={link.label} className="space-y-1">
                    <button 
                      onClick={() => toggleMobileSection(link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-blue-950 hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isParentOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    
                    {/* OPERATIONAL NESTED MOBILE CATEGORIES */}
                    {isParentOpen && (
                      <div className="pl-3 space-y-3 border-l border-slate-100 ml-4 py-1">
                        {link.sections?.map((section) => (
                          <div key={section.sectionTitle} className="space-y-1">
                            <p className="text-[9px] font-black tracking-widest text-orange-500 uppercase px-3 py-1 bg-slate-50 rounded-md w-fit">
                              {section.sectionTitle}
                            </p>
                            <div className="space-y-0.5">
                              {section.items.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <Link 
                                    key={item.href} 
                                    href={item.href}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                                      location === item.href ? 'text-white bg-primary' : 'text-blue-950 hover:text-primary hover:bg-slate-50'
                                    }`}
                                  >
                                    <ItemIcon className="h-3.5 w-3.5 opacity-80" />
                                    <span>{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={link.href} href={link.href}
                  className={`block px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                    location === link.href ? 'text-white bg-primary' : 'text-blue-950 hover:text-primary hover:bg-slate-50'
                  }`}>
                  {link.label}
                </Link>
              );
            })}
            
            <Link href="/offers" className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-primary rounded-xl hover:bg-slate-50 transition-colors">
              <Tag className="h-3.5 w-3.5" /> Offers & Deals
            </Link>
            
            {!user && (
              <div className="pt-3 border-t border-slate-100 mt-2">
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider py-4" size="sm" onClick={() => { setMobileOpen(false); setLoginOpen(true); }}>
                  Login / Sign Up
                </Button>
              </div>
            )}
            {user && (
              <div className="pt-2 border-t border-slate-100 mt-2">
                <button onClick={signOut} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                  Logout System
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}