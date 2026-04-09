import { Metadata } from 'next';
import { PolicyLayout } from '@/components/layout/PolicyLayout';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Under 18 FAQs & Safety',
  description: 'Safety guidelines and FAQs for models under the age of 18 applying to WhoKnows Models.',
  canonical: '/under-18',
});

export default function Under18Page() {
  return (
    <PolicyLayout title="Under 18 FAQs" lastUpdated="April 9, 2026">
      <section>
        <h2>Our Commitment to Safety</h2>
        <p>
          WhoKnows Models is committed to the safety and well-being of all our talent, 
          especially those under the age of 18. We have strict protocols in place to 
          ensure our young models are protected and that their education remains 
          their top priority.
        </p>
      </section>

      <section>
        <h2>1. Can I apply if I am under 18?</h2>
        <p>
          Yes. We review applications from individuals aged 14 and above. However, 
          all applicants under the age of 18 <strong>must</strong> have the consent 
          and active involvement of a parent or legal guardian throughout the 
          entire application and representation process.
        </p>
      </section>

      <section>
        <h2>2. Identification Requirements</h2>
        <p>
          If you are under 18, we will require proof of age and a copy of your 
          parent or guardian’s identification before any representation 
          agreement can be signed.
        </p>
      </section>

      <section>
        <h2>3. Guardian Participation</h2>
        <p>
          A parent or legal guardian must be present during:
        </p>
        <ul>
          <li>All initial interviews and agency meetings.</li>
          <li>All professional photo shoots and bookings.</li>
          <li>Any travel required for international opportunities.</li>
        </ul>
      </section>

      <section>
        <h2>4. Application Photos for Minors</h2>
        <p>
          When submitting photos for someone under 18, please follow these safety guidelines:
        </p>
        <ul>
          <li>Submit simple, natural snapshots using daylight.</li>
          <li>No makeup is required or recommended.</li>
          <li>Wear standard, comfortable clothing (e.g. Jeans and a T-shirt).</li>
          <li>Photos should be taken by a parent or trusted adult.</li>
        </ul>
      </section>

      <section>
        <h2>5. Education First Policy</h2>
        <p>
          We strictly adhere to "Education First" principles. We will work with 
          schools and parents to ensure that modelling assignments do not 
          interfere with a minor's academic responsibilities and growth.
        </p>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p>
          Parents or guardians with questions regarding our minor protection 
          policies should reach out to <strong>legal@whoknowsmodels.com</strong>.
        </p>
      </section>
    </PolicyLayout>
  );
}
