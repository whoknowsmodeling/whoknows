import Link from 'next/link';
import { Mail, Phone, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  models: [
    { label: 'Women', href: '/women' },
    { label: 'Men', href: '/men' },
    { label: 'Apply Now', href: '/apply' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  policies: [
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Under 18 FAQs', href: '/under-18' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block font-serif text-2xl font-bold tracking-tight text-white mb-4"
            >
              WhoKnows<span className="font-light">Models</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mb-6">
              An international modelling agency representing the finest talent worldwide.
              Discover our roster of exceptional models for fashion, editorial, and commercial work.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/whoknows.models"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@whoknowsmodels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 fill-current" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.474V9.574a6.33 6.33 0 0 0-6.326 6.325 6.33 6.33 0 0 0 10.741 4.474l.004-.004c.451-.444.814-.972 1.066-1.55.253-.577.387-1.192.39-1.815V8.474a8.231 8.231 0 0 0 5.488 2.325V7.354a4.793 4.793 0 0 1-2.13-.668Z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/whoknowsmodels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Models Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Models</h3>
            <ul className="space-y-3">
              {footerLinks.models.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Policies</h3>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a
              href="tel:+6285721288138"
              className="flex items-center gap-2 text-neutral-400 text-sm hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+62 857-2128-8138</span>
            </a>
            <a
              href="mailto:whoknowsmodels@gmail.com"
              className="flex items-center gap-2 text-neutral-400 text-sm hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>whoknowsmodels@gmail.com</span>
            </a>
          </div>
          <p className="text-neutral-500 text-xs">
            © {currentYear} WhoKnows Models. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
