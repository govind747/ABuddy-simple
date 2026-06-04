import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: June 2026</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-gray-600 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using Travel Tour website and services, you agree to be bound by these Terms of Service. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Travel Package Terms</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking and Confirmation:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>A 30% advance payment is required to confirm your booking</li>
              <li>Balance payment must be completed 15 days before departure</li>
              <li>Confirmation email will be sent after payment</li>
              <li>All bookings are subject to availability</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Travel Documentation:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for obtaining valid travel documents</li>
              <li>Passport must be valid for 6 months beyond travel dates</li>
              <li>Visa requirements vary by nationality - check before booking</li>
              <li>Travel insurance is highly recommended</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation and Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations 30+ days before: Full refund</li>
              <li>Cancellations 15-29 days before: 75% refund</li>
              <li>Cancellations 7-14 days before: 50% refund</li>
              <li>Cancellations within 7 days: 25% refund</li>
              <li>No refunds for personal emergencies or no-shows</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. India Travel Guidelines</h2>
            <p>All travelers must comply with India travel regulations, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Entry requirements and visa regulations</li>
              <li>Health and vaccination requirements</li>
              <li>Currency and customs regulations</li>
              <li>Local laws and cultural norms</li>
              <li>Environmental protection laws</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Health and Safety</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Travelers must be in good health to participate</li>
              <li>Travel insurance is mandatory for medical emergencies</li>
              <li>Disclose any medical conditions during booking</li>
              <li>Follow all safety guidelines provided by guides</li>
              <li>Company not responsible for weather-related issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability Limitation</h2>
            <p>
              Travel Tour shall not be liable for: personal injury, property damage, flight delays, hotel overbooking, natural disasters, political unrest, or any circumstances beyond our reasonable control. Travelers participate in tours at their own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are in INR (Indian Rupees)</li>
              <li>Accepted payment methods: Credit/Debit cards, Bank transfer, Digital wallets</li>
              <li>Exchange rates subject to change</li>
              <li>All taxes and service charges included in quoted price</li>
              <li>No refunds for personal items or missed activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Group Travel Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minimum 8 people for group discount rates</li>
              <li>School groups require signed parental consent</li>
              <li>Corporate groups require written agreement</li>
              <li>Group leaders responsible for participant conduct</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms shall be governed by the laws of India. Both parties agree to attempt resolution through negotiation before pursuing legal action.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
            <p>
              Travel Tour reserves the right to modify these terms at any time. Your continued use of the service constitutes acceptance of any changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
            <p>
              For questions regarding these terms, contact us at:<br/>
              Email: legal@traveltour.com<br/>
              Phone: +91-40-1234-5678<br/>
              Address: Hyderabad, Telangana, India
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
