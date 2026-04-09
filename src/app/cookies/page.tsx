import { Metadata } from 'next';
import { PolicyLayout } from '@/components/layout/PolicyLayout';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Cookie Policy',
  description: 'How WhoKnows Models uses cookies and tracking technologies on our website.',
  canonical: '/cookies',
});

export default function CookiesPage() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="April 9, 2026">
      <section>
        <h2>What are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device when you visit most websites. 
          They are widely used to make websites work, or work more efficiently, as well as to 
          provide information to the owners of the site.
        </p>
      </section>

      <section>
        <h2>1. How We Use Cookies</h2>
        <p>
          WhoKnows Models uses cookies to enhance your browsing experience, analyze site traffic, 
          and provide secure access to admin panels.
        </p>
      </section>

      <section>
        <h2>2. Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Strictly Necessary Cookies:</strong> These are essential for you to browse 
            the website and use its features, such as accessing secure areas of the site (Admin Dashboard).
          </li>
          <li>
            <strong>Performance and Analytics Cookies:</strong> These cookies collect information 
            about how visitors use a website, for instance, which pages visitors go to most often. 
            This helps us improve how our website works.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These allow the website to remember choices 
            you make (such as your user name or language) and provide enhanced, more personal features.
          </li>
          <li>
            <strong>Targeting/Advertising Cookies:</strong> These may be used by third-party 
            advertising networks to deliver ads more relevant to you and your interests.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Managing Cookies</h2>
        <p>
          Most web browsers allow some control of most cookies through the browser settings. 
          To find out more about cookies, including how to see what cookies have been set, 
          visit <a href="https://www.aboutcookies.org" className="text-white hover:underline">www.aboutcookies.org</a>.
        </p>
        <p>
          Please note that disabling certain cookies may affect the functionality of our website.
        </p>
      </section>
    </PolicyLayout>
  );
}
