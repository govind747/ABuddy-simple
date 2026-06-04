import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
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
            <Cookie className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Cookie Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, improve your experience, and understand how you use our site. Cookies can be either temporary (session cookies) or long-term (persistent cookies).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Necessary for website functionality</li>
              <li>Enable user login and authentication</li>
              <li>Process bookings and payments</li>
              <li>Remember your cart items</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Performance Cookies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Track website performance and analytics</li>
              <li>Help us understand user behavior</li>
              <li>Identify issues and improve functionality</li>
              <li>Used by Google Analytics</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Functional Cookies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Store language and location preferences</li>
              <li>Enable personalized content</li>
              <li>Improve user experience</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Marketing Cookies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Track your visit across websites</li>
              <li>Show you relevant advertisements</li>
              <li>Measure marketing campaign effectiveness</li>
              <li>Deliver personalized travel offers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authenticate your account and secure sessions</li>
              <li>Remember your booking and search history</li>
              <li>Personalize your travel recommendations</li>
              <li>Analyze website traffic and performance</li>
              <li>Deliver targeted travel advertisements</li>
              <li>Improve overall website functionality</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p>
              We may use cookies from third-party services including Google Analytics, payment processors, and advertising partners. These cookies help us analyze site usage, process payments, and serve relevant travel advertisements based on your interests.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Duration</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Session cookies: Deleted when you close your browser</li>
              <li>Persistent cookies: Remain for 1-2 years</li>
              <li>Analytics cookies: Retained for 26 months</li>
              <li>You can clear cookies anytime from browser settings</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Cookies</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser Settings:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Most browsers allow you to refuse cookies</li>
              <li>You can delete cookies from browser history</li>
              <li>Set cookies to ask before saving</li>
              <li>Disabling cookies may affect site functionality</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Our Cookie Preferences:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You can manage cookie preferences when you first visit</li>
              <li>Update preferences anytime in your account settings</li>
              <li>Essential cookies cannot be disabled</li>
              <li>You can choose to disable marketing cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track</h2>
            <p>
              If your browser has a "Do Not Track" feature enabled, we will respect this preference for some non-essential cookies. However, essential cookies required for site functionality will continue to be used.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. India Data Protection Compliance</h2>
            <p>
              We comply with India's data protection regulations and international privacy standards. Your cookie data is treated as personal information and protected accordingly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Cookie Policy</h2>
            <p>
              We may update this Cookie Policy to reflect changes in our cookie practices or legal requirements. Your continued use of our website constitutes acceptance of any changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p>
              If you have questions about our cookie practices, please contact us at:<br/>
              Email: cookies@traveltour.com<br/>
              Phone: +91-40-1234-5678<br/>
              Address: Hyderabad, Telangana, India
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
