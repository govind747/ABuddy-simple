import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ForgotPasswordPage from "@/pages/forgot-password";
import ResetPasswordPage from "@/pages/reset-password";
import DestinationsPage from "@/pages/destinations";
import DestinationDetailPage from "@/pages/destination-detail";
import PackagesPage from "@/pages/packages";
import PackageDetailPage from "@/pages/package-detail";
import GalleryPage from "@/pages/gallery";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import DashboardPage from "@/pages/dashboard/index";
import UpcomingTripsPage from "@/pages/dashboard/upcoming-trips";
import PastTripsPage from "@/pages/dashboard/past-trips";
import FavoriteTripsPage from "@/pages/dashboard/favorite-trips";
import TxHistoryPage from "@/pages/dashboard/tx-history";
import DashboardResetPasswordPage from "@/pages/dashboard/reset-password";
import ProfilePage from "@/pages/dashboard/profile";
import OrdersPage from "@/pages/dashboard/orders";
import CancelHistoryPage from "@/pages/dashboard/cancel-history";
import CheckoutPage from "@/pages/checkout";
import OffersPage from "@/pages/offers";
import ServicesPage from "@/pages/services";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component }: { component: () => React.ReactElement | null }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Redirect to="/login" />;
  return <Component />;
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <AppShell><Home /></AppShell>} />
      <Route path="/destinations" component={() => <AppShell><DestinationsPage /></AppShell>} />
      <Route path="/destinations/:id" component={() => <AppShell><DestinationDetailPage /></AppShell>} />
      <Route path="/packages" component={() => <AppShell><PackagesPage /></AppShell>} />
      <Route path="/packages/:id" component={() => <AppShell><PackageDetailPage /></AppShell>} />
      <Route path="/gallery" component={() => <AppShell><GalleryPage /></AppShell>} />
      <Route path="/blog" component={() => <AppShell><BlogPage /></AppShell>} />
      <Route path="/blog/:id" component={() => <AppShell><BlogDetailPage /></AppShell>} />
      <Route path="/services" component={() => <AppShell><ServicesPage /></AppShell>} />
      <Route path="/offers" component={() => <AppShell><OffersPage /></AppShell>} />
      <Route path="/checkout" component={() => <AppShell><CheckoutPage /></AppShell>} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/dashboard" component={() => <AppShell><ProtectedRoute component={DashboardPage} /></AppShell>} />
      <Route path="/dashboard/profile" component={() => <AppShell><ProtectedRoute component={ProfilePage} /></AppShell>} />
      <Route path="/dashboard/orders" component={() => <AppShell><ProtectedRoute component={OrdersPage} /></AppShell>} />
      <Route path="/dashboard/upcoming-trips" component={() => <AppShell><ProtectedRoute component={UpcomingTripsPage} /></AppShell>} />
      <Route path="/dashboard/past-trips" component={() => <AppShell><ProtectedRoute component={PastTripsPage} /></AppShell>} />
      <Route path="/dashboard/favorite-trips" component={() => <AppShell><ProtectedRoute component={FavoriteTripsPage} /></AppShell>} />
      <Route path="/dashboard/tx-history" component={() => <AppShell><ProtectedRoute component={TxHistoryPage} /></AppShell>} />
      <Route path="/dashboard/reset-password" component={() => <AppShell><ProtectedRoute component={DashboardResetPasswordPage} /></AppShell>} />
      <Route path="/dashboard/cancel-history" component={() => <AppShell><ProtectedRoute component={CancelHistoryPage} /></AppShell>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <WouterRouter base={(import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
