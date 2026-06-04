import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
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

      toast.success('Thank you! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+91-40-1234-5678',
      details: 'Mon-Fri, 9 AM - 6 PM IST',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@traveltour.com',
      details: 'We reply within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Hyderabad, Telangana, India',
      details: 'Head Office Location',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: '9 AM - 6 PM IST',
      details: 'Monday - Friday',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black text-gray-900 mb-3">Get In Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions about our travel services? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-semibold mb-1">{info.content}</p>
                <p className="text-sm text-gray-600">{info.details}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                <Input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Instant Support</h3>
                <p className="text-gray-600">
                  Get quick responses to your travel inquiries. Our team is dedicated to providing excellent customer service.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Custom Packages</h3>
                <p className="text-gray-600">
                  Tell us your travel dreams and we'll create a personalized itinerary tailored to your preferences and budget.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Get advice from our experienced travel consultants who know India inside out and can guide you to hidden gems.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Best Deals</h3>
                <p className="text-gray-600">
                  Contact us directly for exclusive discounts and special offers not available on our website.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-2">Travel Guidelines for India</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Valid passport with 6+ months validity</li>
                <li>✓ Visa requirements as per nationality</li>
                <li>✓ Travel insurance recommended</li>
                <li>✓ Vaccination certificates if required</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
