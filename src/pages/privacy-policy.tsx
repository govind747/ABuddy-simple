import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Privacy Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy ("Policy") describes how Travel Tour ("Company," "we," "us," or "our") collects, uses, and protects your personal information when you visit our website, use our services, or make a booking with us for travel packages across India.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Address, city, state, postal code</li>
              <li>Date of birth and passport details</li>
              <li>Payment and billing information</li>
              <li>Travel preferences and health information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Automatically Collected Information:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browsing history and interaction data</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Analytics data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your bookings and payments</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send booking confirmations and travel updates</li>
              <li>Personalize your experience and recommendations</li>
              <li>Conduct marketing and promotional activities</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. India Travel Guidelines Compliance</h2>
            <p>
              We comply with all India travel regulations and data protection laws. Your passport details and travel information are kept secure and shared only with authorized travel partners and government agencies as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Travel partners and hotels in India</li>
              <li>Transportation providers and guides</li>
              <li>Payment processors and financial institutions</li>
              <li>Insurance companies for travel insurance</li>
              <li>Government agencies when required by law</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. All sensitive data including payment information is encrypted using SSL/TLS technology. However, no system is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies & Tracking</h2>
            <p>
              We use cookies to improve your browsing experience. You can manage cookie preferences through your browser settings. For more details, see our Cookie Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes your acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:<br/>
              Email: privacy@traveltour.com<br/>
              Phone: +91-40-1234-5678<br/>
              Address: Hyderabad, Telangana, India
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
