import { Metadata } from 'next';
import Image from 'next/image';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us',
  description:
    'Learn about WhoKnows Models - an international modelling agency dedicated to discovering and representing exceptional talent in the fashion industry. Our story, mission, and values.',
  keywords: [
    'about WhoKnows Models',
    'modelling agency',
    'fashion industry',
    'model management',
    'international models',
    'talent agency',
  ],
  canonical: '/about',
});

const stats = [
  { label: 'Models', value: '100+' },
  { label: 'Countries', value: '25+' },
  { label: 'Campaigns', value: '500+' },
  { label: 'Years', value: '10+' },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We maintain the highest standards in everything we do, from talent selection to client partnerships.',
  },
  {
    icon: Users,
    title: 'Diversity',
    description:
      'We celebrate unique beauty in all its forms, representing diverse talent from around the world.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'With connections across fashion capitals, we open doors to international opportunities.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      'We build lasting relationships based on trust, transparency, and mutual respect.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
              Our Story
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight mb-6">
              About WhoKnows Models
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Founded with a vision to redefine the modelling industry, WhoKnows Models
              has grown from a boutique agency to an internationally recognized name in
              fashion and talent management.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[21/9] mb-16 lg:mb-24 overflow-hidden">
            <Image
              src="/hero/hero-2.jpg"
              alt="WhoKnows Models team"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-24">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight mb-6">
                Our Mission
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                At WhoKnows Models, we believe that every individual possesses unique
                beauty waiting to be discovered. Our mission is to identify, nurture, and
                promote exceptional talent while maintaining the highest ethical standards
                in the industry.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We are committed to creating meaningful opportunities for our models,
                connecting them with leading brands, designers, and publications that
                share our values of creativity, professionalism, and authenticity.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight mb-6">
                Our Vision
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                We envision a fashion industry that celebrates diversity, embraces
                innovation, and empowers talent to reach their full potential. WhoKnows
                Models strives to be at the forefront of this transformation.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                By leveraging our global network and industry expertise, we aim to become
                the bridge between aspiring models and the international fashion stage,
                one successful career at a time.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-neutral-200 mb-16 lg:mb-24">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-4xl lg:text-5xl font-medium mb-2">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-16 lg:mb-24">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-medium tracking-tight mb-4">
                Our Values
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-2">{title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-neutral-50 p-8 lg:p-12 text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
              Whether you&apos;re an aspiring model or a brand seeking exceptional talent,
              we&apos;re here to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/apply"
                className="px-8 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Apply Now
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border border-black text-black font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Contact Us
              </a>
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
              { name: 'About', url: '/about' },
            ])
          ),
        }}
      />
    </>
  );
}
