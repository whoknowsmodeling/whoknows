import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Contact Us',
  description:
    'Get in touch with WhoKnows Models. Contact us for model bookings, partnerships, or general inquiries. We are here to help connect you with exceptional talent.',
  keywords: [
    'contact modelling agency',
    'model booking',
    'fashion agency contact',
    'WhoKnows Models contact',
  ],
  canonical: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Have questions about our models, bookings, or services? We&apos;d love to
                hear from you. Send us a message and we&apos;ll respond as soon as
                possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:contact@whoknowsmodels.com"
                      className="text-neutral-600 hover:text-black transition-colors"
                    >
                      contact@whoknowsmodels.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a
                      href="tel:+6285721288138"
                      className="text-neutral-600 hover:text-black transition-colors"
                    >
                      +62 857-2128-8138
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-neutral-600">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-200">
                <h3 className="font-medium mb-4">Office Hours</h3>
                <div className="space-y-2 text-neutral-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (WIB)</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-50 p-6 lg:p-10">
              <h2 className="font-serif text-2xl font-medium tracking-tight mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact' },
            ])
          ),
        }}
      />
    </>
  );
}
