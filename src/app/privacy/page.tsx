import { Metadata } from 'next';
import { PolicyLayout } from '@/components/layout/PolicyLayout';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description: 'Learn how WhoKnows Models collects, uses, and protects your personal data.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="April 9, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          At WhoKnows Models, we respect your privacy and are committed to protecting your personal data. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit 
          our website or interact with our agency.
        </p>
      </section>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We may collect several types of information from and about users of our Site, including:</p>
        <ul>
          <li><strong>Identifiers:</strong> Name, professional name, email address, telephone number, and social media handles.</li>
          <li><strong>Professional Information:</strong> Portfolios, measurements, age, and location provided during the application process.</li>
          <li><strong>Internet Activity:</strong> IP addresses, browsing history, and interactions with our website.</li>
          <li><strong>Geolocation Data:</strong> Physical location or movement data.</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>WhoKnows Models uses the data we collect for various purposes, including:</p>
        <ul>
          <li>To process model applications and manage representation.</li>
          <li>To maintain and improve our website performance and user experience.</li>
          <li>To communicate with you regarding bookings, castings, or news.</li>
          <li>To comply with legal obligations and protect the security of our platform.</li>
        </ul>
      </section>

      <section>
        <h2>3. Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information. We may share your data with:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> IT hosting, storage, and specialized marketing partners.</li>
          <li><strong>Clients:</strong> Potential clients for casting and booking purposes (only relevant identifiers and professional portfolio).</li>
          <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and property.</li>
        </ul>
      </section>

      <section>
        <h2>4. Your Rights</h2>
        <p>
          Depending on your location (such as the EU under GDPR or California under CCPA), you may have 
          specific rights regarding your personal information, including the right to access, correct, 
          or delete the data we hold about you. 
        </p>
        <p>
          To exercise these rights, please contact us at <strong>legal@whoknowsmodels.com</strong>.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and administrative security measures designed to protect 
          your personal data against accidental or unlawful destruction, loss, alteration, 
          unauthorized disclosure, or access.
        </p>
      </section>
    </PolicyLayout>
  );
}
