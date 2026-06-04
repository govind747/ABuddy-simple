import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Users2, 
  Compass, 
  Percent 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('queries').insert({
        name: form.name,
        email: form.email,
        mobile: form.phone,
        service_type: 'contact_inquiry',
        destination_interest: form.subject,
        special_requests: form.message,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Thank you! Our travel architects will contact you shortly.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Desk',
      content: '+91-40-1234-5678',
      details: 'Mon-Fri, 9 AM - 6 PM IST',
      color: 'from-blue-500/20 to-cyan-500/5',
      iconColor: 'text-blue-500',
    },
    {
      icon: Mail,
      title: 'Email Correspondence',
      content: 'info@traveltour.com',
      details: 'Inquiries answered within 24 hours',
      color: 'from-purple-500/20 to-pink-500/5',
      iconColor: 'text-purple-500',
    },
    {
      icon: MapPin,
      title: 'Headquarters Location',
      content: 'Hyderabad, Telangana, India',
      details: 'Global Operations Centre',
      color: 'from-emerald-500/20 to-teal-500/5',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Clock,
      title: 'Active Operating Hours',
      content: '9:00 AM - 6:00 PM IST',
      details: 'Monday through Friday schedule',
      color: 'from-amber-500/20 to-orange-500/5',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative overflow-hidden">
      {/* Dynamic Background Blur Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

      {/* 1. HERO HEADER BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4 text-primary text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="h-3.5 w-3.5" /> Plan Your Next Adventure
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-foreground bg-clip-text"
        >
          Connect With Our Travel Architects
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Have custom routing requests, high-altitude itinerary mapping requirements, or premium booking questions? Drop us a line.
        </motion.p>
      </section>

      {/* 2. CONTACT INFO INTERACTIVE GRID SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border/60 hover:border-border rounded-2xl p-6 shadow-sm shadow-foreground/[0.01] transition-all relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${info.color} rounded-bl-full opacity-40 group-hover:opacity-70 transition-opacity -z-10`} />
                
                <div className="w-12 h-12 rounded-xl bg-background border border-border shadow-inner flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className={`h-5 w-5 ${info.iconColor}`} />
                </div>
                
                <h3 className="font-bold text-foreground text-base mb-2 tracking-tight">{info.title}</h3>
                <p className="text-foreground font-semibold text-sm break-all mb-1 select-all">{info.content}</p>
                <p className="text-xs text-muted-foreground font-medium">{info.details}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. SPLIT MAIN CONTAINER: FORM & WHY US CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: THE PREMIUM COMPACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-8 shadow-xl shadow-foreground/[0.01] relative"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">Send an Inquiry</h2>
              <p className="text-sm text-muted-foreground font-medium">Fill out your parameters to dispatch a priority tracking card to our travel agents.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Full Name <span className="text-destructive">*</span></label>
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="E.g., John Doe"
                    className="h-11 rounded-xl bg-background border-border/60 focus-visible:ring-primary/40"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Email Address <span className="text-destructive">*</span></label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="h-11 rounded-xl bg-background border-border/60 focus-visible:ring-primary/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Mobile / Contact Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="h-11 rounded-xl bg-background border-border/60 focus-visible:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Destination Interest <span className="text-destructive">*</span></label>
                  <Input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="E.g., Uttarakhand Luxury Package"
                    className="h-11 rounded-xl bg-background border-border/60 focus-visible:ring-primary/40"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Special Allocation Requests <span className="text-destructive">*</span></label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your target budget, vehicle preferences, hotel tier requirements, or dietary guidelines..."
                  rows={5}
                  className="rounded-xl bg-background border-border/60 focus-visible:ring-primary/40 resize-none p-4"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-md shadow-primary/10 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider group"
              >
                {loading ? (
                  'Transmitting Records...'
                ) : (
                  <>
                    Discharge Live Query 
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: BENEFITS & TRAVEL COMPLIANCE PACKS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-black text-foreground tracking-tight mb-6">Why Partner With Us?</h2>
              
              <div className="space-y-5">
                {[
                  { icon: CheckCircle2, title: 'Instantaneous Support Networks', desc: 'Accelerated escalation matrices routing directly to local regional hubs during transits.' },
                  { icon: Compass, title: 'Tailored Custom Architectural Plans', desc: 'Dynamically configure elevation stops, dedicated safe vehicles, and preferred luxury hotels.' },
                  { icon: Users2, title: 'Expert Field Advisors', desc: 'Direct mapping updates supplied by certified regional guides embedded in locations.' },
                  { icon: Percent, title: 'Optimized Direct Rates', desc: 'By interacting with our home desk, you bypass third-party aggregators completely.' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm tracking-tight mb-0.5">{item.title}</h4>
                      <p className="text-muted-foreground text-xs font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGH VALUE REGIONAL LEGAL GUIDE GLOW CARD */}
            <div className="p-6 bg-gradient-to-br from-secondary/40 to-secondary/10 border border-border/80 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-3 text-amber-600 dark:text-amber-500 font-bold text-sm tracking-tight">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                Cross-Border Compliance Notice
              </div>
              <ul className="text-xs text-muted-foreground space-y-2.5 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">✓</span> Passports must contain at least 6 months remaining validity from day of entry.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">✓</span> Foreign nationals must secure e-Tourist Visas before target landing dates.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">✓</span> High-altitude travel protection frameworks are strongly encouraged.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">✓</span> Keep valid physical National/Voter IDs accessible for mountain checkpoint validations.
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}