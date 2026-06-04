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
  Percent,
  Map,
  Layers
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
      content: '+91-70555-71119',
      details: 'Mon-Sat, 9 AM - 8 PM IST',
      color: 'from-blue-600/20 to-cyan-500/5',
      borderColor: 'group-hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 text-blue-500',
      glow: 'shadow-blue-500/10'
    },
    {
      icon: Mail,
      title: 'Email Desk',
      content: 'info@adventurebuddy.in',
      details: 'Inquiries answered within 24 hours',
      color: 'from-purple-600/20 to-pink-500/5',
      borderColor: 'group-hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 text-purple-500',
      glow: 'shadow-purple-500/10'
    },
    {
      icon: MapPin,
      title: 'Regional Office',
      content: 'Dehradun, Uttarakhand, India',
      details: 'Himalayan Base Operations',
      color: 'from-emerald-600/20 to-teal-500/5',
      borderColor: 'group-hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-500',
      glow: 'shadow-emerald-500/10'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      content: '9:00 AM - 7:00 PM IST',
      details: 'Emergency line active 24/7 during transit',
      color: 'from-amber-600/20 to-orange-500/5',
      borderColor: 'group-hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-500',
      glow: 'shadow-amber-500/10'
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 selection:bg-blue-500/30 relative overflow-hidden pt-20">
      
      {/* BACKGROUND ART & FLOATING GEOMETRIC OBJECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] -z-10" />
      <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] -z-10" />
      
      {/* Floating Topographic / Grid Pattern Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 -z-10" />

      {/* Decorative Abstract Vectors */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-10 text-blue-500/20 hidden lg:block"
      >
        <Compass className="w-16 h-16 stroke-[1]" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 right-12 text-emerald-500/10 hidden lg:block"
      >
        <Map className="w-24 h-24 stroke-[1]" />
      </motion.div>

      {/* 1. HERO HEADER BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full mb-6 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Adventure Buddy Support Base
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
        >
          Let's Map Your Route
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Connect with Uttarakhand's trusted travel architecture network. Get direct configurations on certified mountain transport, safe campsites, and luxury homestays.
        </motion.p>
      </section>

      {/* 2. HIGH-TECH INTERACTIVE INFO CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`bg-[#0d1527]/80 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group hover:shadow-xl ${info.glow}`}
              >
                {/* SVG Decorative Card Art Mesh */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                    <defs>
                      <pattern id={`grid-${idx}`} width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#grid-${idx})`} />
                  </svg>
                </div>

                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${info.color} rounded-bl-full opacity-40 group-hover:opacity-100 transition-all duration-500 -z-10`} />
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110 ${info.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <h3 className="font-bold text-white text-base mb-2 tracking-tight">{info.title}</h3>
                <p className="text-blue-400 font-bold text-sm break-all mb-1 select-all tracking-wide">{info.content}</p>
                <p className="text-xs text-gray-400 font-medium leading-normal">{info.details}</p>
                
                {/* Bottom Border Glow Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-blue-500 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. SPLIT WORKSPACE: ADVANCED FORM & BRAND VALUE MATRICES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* THE CYBERPUNK LABELED FORM ELEMENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#0b1120]/90 backdrop-blur-2xl border border-gray-800/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-emerald-500/40" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-500" /> Dispatch Flight Parameters
              </h2>
              <p className="text-sm text-gray-400">Your secure transmission routes automatically to our emergency deployment desk.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Full Name <span className="text-red-500">*</span></label>
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="E.g., Devendra Singh"
                    className="h-11 rounded-xl bg-[#11192e]/80 border-gray-800 focus:border-blue-500/50 focus:ring-0 text-white placeholder:text-gray-600 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Email Address <span className="text-red-500">*</span></label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="h-11 rounded-xl bg-[#11192e]/80 border-gray-800 focus:border-blue-500/50 focus:ring-0 text-white placeholder:text-gray-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Contact Mobile</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-11 rounded-xl bg-[#11192e]/80 border-gray-800 focus:border-blue-500/50 focus:ring-0 text-white placeholder:text-gray-600 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Target Destination / Subject <span className="text-red-500">*</span></label>
                  <Input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="E.g., Kedarkantha Trek / Taxi Matrix"
                    className="h-11 rounded-xl bg-[#11192e]/80 border-gray-800 focus:border-blue-500/50 focus:ring-0 text-white placeholder:text-gray-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Special Operational Guidelines <span className="text-red-500">*</span></label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Outline your target team count, alternative backup dates, vehicle selection metrics, or preferred camp layouts..."
                  rows={4}
                  className="rounded-xl bg-[#11192e]/80 border-gray-800 focus:border-blue-500/50 focus:ring-0 text-white placeholder:text-gray-600 resize-none p-4 transition-all"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-blue-950/50 transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest group"
              >
                {loading ? (
                  'Transmitting Records...'
                ) : (
                  <>
                    Initialize Live Connection 
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: REVENUE & SAFETY ASSURANCE MATRICES */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#0b1120]/40 border border-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-black text-white tracking-tight mb-5">The Adventure Buddy Blueprint</h2>
              
              <div className="space-y-4">
                {[
                  { icon: CheckCircle2, title: '12+ Years of Trusted Heritage', desc: 'Guiding thousands of families, schools, and corporate groups across India safely.', color: 'text-emerald-400 bg-emerald-500/10' },
                  { icon: Compass, title: 'Verified High-Altitude Transport', desc: 'Hills-certified drivers, tracked fleets, and rigorous multi-point structural layouts.', color: 'text-blue-400 bg-blue-500/10' },
                  { icon: Users2, title: 'Hyper-Local Destination Architects', desc: 'Unlock pristine spots, homestays, and camp vistas typical vendors overlook.', color: 'text-purple-400 bg-purple-500/10' },
                  { icon: Percent, title: 'Honest Direct Pricing', desc: 'Bypass digital distribution middleware to secure optimal real-time regional rates.', color: 'text-amber-400 bg-amber-500/10' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-inner transition-transform group-hover:scale-110 ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200 text-sm tracking-tight mb-0.5">{item.title}</h4>
                      <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGH-IMPACT COMPLIANCE BANNER CARD */}
            <div className="p-5 bg-gradient-to-br from-amber-500/10 via-orange-600/[0.02] to-transparent border border-amber-500/20 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2.5 mb-3 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
                Himalayan Transit Compliance Rules
              </div>
              <ul className="text-xs text-gray-400 space-y-2 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Keep valid physical national identification records ready for regional forest check-posts.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> High-altitude medical clearances are required for high alpine loops.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Route coordinates map dynamically during rainfall alerts via our ground desk.
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. PREMIUM GLOWING GOOGLE MAP EMBED CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-gray-800/80 shadow-2xl relative group bg-[#0d1527]"
        >
          {/* Subtle Outer Card Glow Ring */}
          <div className="absolute inset-0 border border-blue-500/10 rounded-3xl pointer-events-none group-hover:border-blue-500/20 transition-colors duration-500" />
          
          <div className="p-5 border-b border-gray-800/80 flex flex-wrap items-center justify-between gap-4 bg-[#0a101f]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-inner">
                <Map className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm tracking-tight">Adventure Buddy Command Station</h3>
                <p className="text-xs text-gray-400 font-medium">Dehradun Headquarters, Uttarakhand Gateway</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1" /> Live Operations Base
            </div>
          </div>
          
          {/* Responsive Map Container with Dark Mode Styling Blend */}
          <div className="w-full h-[380px] grayscale invert-[0.9] contrast-[1.1] opacity-85 group-hover:opacity-95 transition-opacity duration-500">
            <iframe
              title="Adventure Buddy Operations Base Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m2!1d78.0322!2d30.3165!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c35b6c3188df1!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>

    </div>
  );
}