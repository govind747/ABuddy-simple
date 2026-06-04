import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CircleHelp as HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What travel documents do I need for tours in India?',
    answer: 'For Indian travel, you need a valid passport with at least 6 months validity. Depending on your nationality, you may require a visa. We recommend an e-Tourist Visa (eTV) for most foreign nationals, which can be obtained online. Domestic travelers within India only need a valid ID like Aadhar or passport. Travel insurance is highly recommended for all tours.',
  },
  {
    id: 'faq2',
    question: 'What is the best time to visit India?',
    answer: 'The best time to visit India is October to March when the weather is cool and dry. North India experiences pleasant weather during winter (November-February), while South India is ideal year-round. Summer (April-June) is extremely hot. Monsoon season (June-September) is wet but offers scenic beauty at discounted rates.',
  },
  {
    id: 'faq3',
    question: 'Are your tour packages customizable?',
    answer: 'Yes! All our tour packages are highly customizable. You can adjust dates, duration, destinations, activities, and accommodation levels. Our travel experts will work with you to create the perfect itinerary. Contact us with your preferences and budget, and we\'ll tailor a package just for you.',
  },
  {
    id: 'faq4',
    question: 'What is your cancellation policy?',
    answer: 'Our cancellation policy is flexible: Cancellations made 30+ days before departure receive a full refund. Cancellations 15-29 days before receive 75% refund. Cancellations 7-14 days before receive 50% refund. Cancellations within 7 days receive 25% refund. Force majeure situations may be handled differently.',
  },
  {
    id: 'faq5',
    question: 'Do you provide travel insurance?',
    answer: 'We strongly recommend travel insurance for all tours. While not mandatory, it covers medical emergencies, trip cancellations, lost luggage, and other unforeseen circumstances. We can help arrange comprehensive travel insurance through our partners at competitive rates.',
  },
  {
    id: 'faq6',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, bank transfers, and digital wallets. A 30% advance payment is required to confirm your booking, with the balance due 15 days before departure.',
  },
  {
    id: 'faq7',
    question: 'Is vegetarian/vegan food available?',
    answer: 'Absolutely! India has a rich vegetarian culture. All our packages include vegetarian and vegan meal options. Please inform us of your dietary preferences during booking so we can arrange suitable meals at every destination.',
  },
  {
    id: 'faq8',
    question: 'What is your group size policy?',
    answer: 'Solo travelers to large groups are welcome! Our standard group size is 8-20 people for guided tours. Solo travelers can join group tours or request exclusive private tours. School and corporate groups of any size can be accommodated with advance notice.',
  },
  {
    id: 'faq9',
    question: 'Do you provide travel guidance for first-time visitors to India?',
    answer: 'Yes! Our team provides comprehensive pre-trip guidance including visa information, packing tips, cultural etiquette, local customs, safety tips, and health precautions. We send a detailed information packet to all travelers before their journey.',
  },
  {
    id: 'faq10',
    question: 'What are the health and safety guidelines for your tours?',
    answer: 'Safety is our top priority. All tours include: experienced guides, travel insurance recommendations, medical contacts at each location, safe accommodations, reliable transportation, and 24/7 customer support. We follow all local health regulations and guidelines.',
  },
];

function FAQItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-left font-semibold text-gray-900">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-gray-50"
          >
            <p className="px-6 py-4 text-gray-600 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our travel services in India
          </p>
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Our travel experts are here to help. Contact us anytime!
            </p>
            <a
              href="/contact-us"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Contact Us →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
