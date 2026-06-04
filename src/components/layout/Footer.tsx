import { Link } from 'wouter';
import { Compass, Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-white">TRAVEL</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Discover extraordinary destinations worldwide with your most trusted travel companion.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary transition-colors flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/destinations', label: 'Destinations' },
                { href: '/packages', label: 'Packages' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/blog', label: 'Blog' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/contact-us', label: 'Contact Us' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
                { href: '/cookie-policy', label: 'Cookie Policy' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary shrink-0" />Hyderabad, Telangana, India</li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-primary shrink-0" />info@traveltour.com</li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-primary shrink-0" />+91-40-1234-5678</li>
            </ul>

            <h4 className="font-bold text-white mt-7 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-slate-800 text-sm px-3 py-2 rounded-lg flex-1 outline-none focus:ring-1 focus:ring-primary text-slate-200 placeholder:text-slate-500 border border-slate-700" />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} TRAVEL. All rights reserved.</p>
          <p>Made with ❤️ for explorers everywhere</p>
        </div>
      </div>
    </footer>
  );
}
