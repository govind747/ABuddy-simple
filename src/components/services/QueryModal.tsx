import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { LoginModal } from '@/components/auth/LoginModal';

interface QueryModalProps {
  serviceType: string;
  serviceTitle: string;
  onClose: () => void;
}

interface UserProfile {
  full_name: string | null;
  email: string | null;
  mobile: string | null;
}

export default function QueryModal({ serviceType, serviceTitle, onClose }: QueryModalProps) {
  const { user, loading: authLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    number_of_travelers: '1',
    travel_dates: '',
    destination_interest: '',
    special_requests: '',
  });

  useEffect(() => {
    if (user && !authLoading) {
      fetchUserProfile();
    }
  }, [user, authLoading]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('full_name, email, mobile')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setUserProfile(data);
        setFormData(prev => ({
          ...prev,
          name: data.full_name || '',
          email: data.email || '',
          mobile: data.mobile || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('queries').insert({
        user_id: user?.id || null,
        service_type: serviceType,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        number_of_travelers: parseInt(formData.number_of_travelers),
        travel_dates: formData.travel_dates,
        destination_interest: formData.destination_interest,
        special_requests: formData.special_requests,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Query submitted successfully! We will contact you soon.');
      onClose();
    } catch (error) {
      console.error('Error submitting query:', error);
      toast.error('Failed to submit query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return null;
  }

  if (!user) {
    return (
      <>
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sign In Required</DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <p className="text-gray-600 mb-6">
                Please sign in to submit your {serviceTitle} query. This helps us personalize your experience.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowLogin(true);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Sign In / Sign Up
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {showLogin && <LoginModal open={true} onClose={() => setShowLogin(false)} />}
      </>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{serviceTitle} - Query Form</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              placeholder="+91 98765 43210"
              required
            />
          </div>

          {/* Number of Travelers */}
          <div>
            <Label htmlFor="travelers">Number of Travelers *</Label>
            <Select value={formData.number_of_travelers} onValueChange={(value) =>
              setFormData(prev => ({ ...prev, number_of_travelers: value }))
            }>
              <SelectTrigger id="travelers">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 10, 15, 20, 30, 50].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Travel Dates */}
          <div>
            <Label htmlFor="dates">Travel Dates (Format: DD/MM/YYYY - DD/MM/YYYY)</Label>
            <Input
              id="dates"
              value={formData.travel_dates}
              onChange={(e) => setFormData(prev => ({ ...prev, travel_dates: e.target.value }))}
              placeholder="01/06/2026 - 15/06/2026"
            />
          </div>

          {/* Destination Interest */}
          <div>
            <Label htmlFor="destination">Destination Interest</Label>
            <Input
              id="destination"
              value={formData.destination_interest}
              onChange={(e) => setFormData(prev => ({ ...prev, destination_interest: e.target.value }))}
              placeholder="Where would you like to travel?"
            />
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="requests">Special Requests</Label>
            <Textarea
              id="requests"
              value={formData.special_requests}
              onChange={(e) => setFormData(prev => ({ ...prev, special_requests: e.target.value }))}
              placeholder="Any specific requirements or preferences?"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Query'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
