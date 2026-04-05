import { Metadata } from 'next';
import { ApplyForm } from '@/components/forms/ApplyForm';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Apply to be a Model',
  description:
    'Apply to become a model at WhoKnows Models. Submit your application and start your modelling career with our international agency. We welcome all aspiring models.',
  keywords: [
    'become a model',
    'modelling application',
    'model scouting',
    'fashion career',
    'model audition',
    'join modelling agency',
  ],
  canonical: '/apply',
});

export default function ApplyPage() {
  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                Join Our Roster
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight mb-4">
                Apply to be a Model
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                We&apos;re always looking for fresh faces and unique talent. Fill out the
                form below and our scouting team will review your application.
              </p>
            </div>

            <div className="bg-white p-6 lg:p-10 border border-neutral-200">
              <ApplyForm />
            </div>

            <div className="mt-8 text-center text-sm text-neutral-500">
              <p>
                By submitting this application, you agree to our privacy policy and
                terms of service. We will contact you within 5-7 business days if
                your application is selected for the next step.
              </p>
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
              { name: 'Apply', url: '/apply' },
            ])
          ),
        }}
      />
    </>
  );
}
