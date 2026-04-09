import { Metadata } from 'next';
import { PolicyLayout } from '@/components/layout/PolicyLayout';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Terms of Use',
  description: 'The terms and conditions for using the WhoKnows Models website and services.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Use" lastUpdated="April 9, 2026">
      <section>
        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using the WhoKnows Models website, you agree to be bound by these Terms of Use 
          and our Privacy Policy. If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2>1. Intellectual Property Rights</h2>
        <p>
          The content on this website, including but not limited to images, text, logos, brand identity, 
          and portfolio material, is the property of WhoKnows Models or its licensors. 
          Everything is protected by international copyright and intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive license to view the content for personal, 
          non-commercial purposes only. Any unauthorized reproduction, redistribution, or mirroring 
          is strictly prohibited.
        </p>
      </section>

      <section>
        <h2>2. Authorized Use</h2>
        <p>
          You may use the Site for lawful purposes only. You are prohibited from:
        </p>
        <ul>
          <li>Using the Site in any way that violates applicable laws or regulations.</li>
          <li>Introducing viruses, trojans, or other malicious software.</li>
          <li>Attempting to gain unauthorized access to our servers or databases.</li>
          <li>Automated scraping or data mining of model portfolios or agency content.</li>
        </ul>
      </section>

      <section>
        <h2>3. User Submissions</h2>
        <p>
          Any materials or feedback you submit through the Site (excluding model applications) 
          shall be treated as non-confidential. WhoKnows Models shall have a perpetual, 
          royalty-free license to use such submissions for any purpose.
        </p>
      </section>

      <section>
        <h2>4. Disclaimers and Limitation of Liability</h2>
        <p>
          The information on this Site is provided "as is" for general information purposes. 
          While we strive for accuracy, WhoKnows Models does not warrant the completeness or 
          reliability of any information provided.
        </p>
        <p>
          In no event shall WhoKnows Models be liable for any damages arising out of your 
          use or inability to use the Site.
        </p>
      </section>

      <section>
        <h2>5. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless WhoKnows Models, its affiliates, and its 
          employees from any claims or legal fees arising from your breach of these Terms of Use.
        </p>
      </section>

      <section>
        <h2>6. Modifications</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Changes will be effective 
          immediately upon posting to the Site. Your continued use of the Site signifies 
          your acceptance of the updated terms.
        </p>
      </section>
    </PolicyLayout>
  );
}
