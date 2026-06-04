import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { X } from 'lucide-react';

export default function CookieConsentModal() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setShow(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setShow(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full md:w-full md:max-w-2xl mx-4 bg-white rounded-t-3xl md:rounded-2xl shadow-2xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">We Value Your Privacy</h2>
                <p className="text-gray-600 mt-1">Cookie & Data Protection Notice</p>
              </div>
              <button
                onClick={handleRejectAll}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {!showDetails ? (
              <>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze traffic, and deliver personalized travel recommendations. We respect your privacy and comply with India's data protection regulations.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Learn more about our cookie usage →
                  </button>
                </div>

                <div className="flex gap-3 mt-6 flex-col-reverse md:flex-row">
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1"
                  >
                    Reject All
                  </Button>
                  <Button
                    onClick={handleAcceptEssential}
                    variant="outline"
                    className="flex-1"
                  >
                    Essential Only
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Accept All
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Required for website functionality, login, bookings, and payment processing.
                    </p>
                    <span className="inline-block mt-2 text-xs font-semibold text-blue-600">Always Enabled</span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Help us understand how you use our site and improve performance using analytics.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Remember your preferences, language, and personalization settings.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Deliver personalized travel offers and track marketing campaign effectiveness.
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-6">
                  <p>
                    For detailed information, see our{' '}
                    <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-700 font-medium">
                      Cookie Policy
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 font-medium">
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <div className="flex gap-3 flex-col-reverse md:flex-row">
                  <Button
                    onClick={() => setShowDetails(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1"
                  >
                    Reject All
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Accept All
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
