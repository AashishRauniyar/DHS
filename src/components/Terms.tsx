/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import NewsletterSubscription from "./newsletter-subscription"

export default function TermsOfUse() {
  return (
    <div>
    <div className="container mx-auto px-3 py-6 max-w-5xl">
      <h1 className="text-4xl font-bold text-blue-600 mb-1">Terms of Use</h1>
      <p className="text-gray-700 mb-8">Effective Date: 01-07-2022</p>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Acceptance of Terms</h2>
        <p className="mb-4 text-lg">
          Welcome to Daily Health Supplement ("we", "us", "our"). These Terms of Use govern your use of our website{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            [www.dailyhealthsupplement.com]
          </Link>{" "}
          (the "Site"). By accessing or using the Site, you agree to these Terms of Use and our{" "}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          . If you do not agree with these terms, please do not use the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Use of the Site</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>License:</strong> We grant you a limited, non-exclusive, non-transferable license to access and use
            the Site for personal, non-commercial use.
          </li>
          <li>
            <strong>User Conduct:</strong> You agree not to:
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>Use the Site in any unlawful manner or for any unlawful purpose.</li>
              <li>Impersonate any person or entity or falsely state or otherwise misrepresent your identity.</li>
              <li>
                Attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or
                networks connected to the Site.
              </li>
            </ul>
          </li>
          <li>
            <strong>Content:</strong> All content on the Site, including text, graphics, images, logos, and software, is
            the property of Daily Health Supplement or its content suppliers and is protected by copyright and other
            intellectual property laws.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Disclaimer of Warranties</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>General:</strong> The information provided on the Site is for general informational purposes only.
            We make no representations or warranties of any kind, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability with respect to the Site or the information, products, services,
            or related graphics contained on the Site for any purpose.
          </li>
          <li>
            <strong>Health Information:</strong> Any health-related information provided on the Site is not intended to
            constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or
            other qualified health provider with any questions you may have regarding a medical condition. Never
            disregard professional medical advice or delay in seeking it based on information from this Site.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Limitation of Liability</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>Exclusion of Damages:</strong> In no event shall Daily Health Supplement, its affiliates, or their
            respective officers, directors, employees, or agents be liable to you for any direct, indirect, incidental,
            special, punitive, or consequential damages whatsoever resulting from:
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>Errors, mistakes, or inaccuracies of content.</li>
              <li>
                Personal injury or property damage of any nature whatsoever resulting from your access to and use of the
                Site.
              </li>
              <li>
                Unauthorized access to or use of our secure servers and/or any and all personal information stored
                therein.
              </li>
            </ul>
          </li>
          <li>
            <strong>Indemnity:</strong> You agree to indemnify, defend, and hold harmless Daily Health Supplement and
            its affiliates from any claims, losses, liabilities, damages, costs, and expenses, including reasonable
            attorneys' fees, arising out of or relating to your use or misuse of the Site, violation of these Terms of
            Use, or violation of any rights of another.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Third-Party Links & Ads</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>Links to Third-Party Sites:</strong> The Site may contain links to third-party websites or services
            that are not owned or controlled by Daily Health Supplement. We have no control over, and assume no
            responsibility for, the content, privacy policies, or practices of any third-party sites or services. You
            acknowledge and agree that Daily Health Supplement shall not be responsible or liable, directly or
            indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or
            reliance on any such content, goods, or services available through any such third-party websites or
            services.
          </li>
          <li>
            <strong>Advertisements:</strong> We may display advertisements from third parties on the Site. These
            advertisements may be targeted based on information gathered through your interaction with the Site. The
            appearance of advertisements on the Site does not constitute endorsement by Daily Health Supplement of the
            products or services advertised.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Disclaimers</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>No Medical Advice:</strong> The content provided on the Site is for informational purposes only. It
            is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the
            advice of your physician or other qualified health provider with any questions you may have regarding a
            medical condition.
          </li>
          <li>
            <strong>Supplement Recommendations:</strong> Any recommendations regarding supplements on the Site are based
            on our editorial discretion and should not be considered endorsements. Use any supplements discussed on the
            Site at your own risk and discretion.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Limitation on Liability</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>Exclusion of Damages:</strong> To the fullest extent permitted by applicable law, in no event shall
            Daily Health Supplement, its affiliates, or their respective officers, directors, employees, or agents be
            liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
            revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
            losses, resulting from your access to or use of or inability to access or use the Site; (ii) any conduct or
            content of any third party on the Site, including without limitation, any defamatory, offensive, or illegal
            conduct of other users or third parties; or (iii) unauthorized access, use, or alteration of your
            transmissions or content.
          </li>
          <li>
            <strong>Indemnification:</strong> You agree to defend, indemnify, and hold harmless Daily Health Supplement,
            its affiliates, licensors, and service providers, and its and their respective officers, directors,
            employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims,
            liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys'
            fees) arising out of or relating to your violation of these Terms of Use or your use of the Site, including,
            but not limited to, your User Contributions, any use of the Site's content, services, and products other
            than as expressly authorized in these Terms of Use or your use of any information obtained from the Site.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Copyright Policy</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>Copyright Infringement:</strong> We respect the intellectual property rights of others and expect
            users of the Site to do the same. If you believe that your copyrighted work has been copied in a way that
            constitutes copyright infringement and is accessible on this Site, please notify us immediately.
          </li>
          <li>
            <strong>Notification:</strong> To notify us of claimed infringement, please send a written communication to
            our designated Copyright Agent at the following address:
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>Name: [Your Name]</li>
              <li>Address: [Your Address]</li>
              <li>Email: [Your Email Address]</li>
              <li>Phone: [Your Phone Number]</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Copyright/Trademark</h2>
        <p className="mb-4 text-lg">
          All content, trademarks, service marks, trade names, and logos of Daily Health Supplement used on the Site are
          trademarks or registered trademarks of Daily Health Supplement or its affiliates. You may not use, copy,
          reproduce, republish, upload, post, transmit, distribute, or modify these trademarks in any way.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Modifications</h2>
        <ol className="list-decimal pl-8 mb-4 space-y-4 text-lg">
          <li>
            <strong>Changes to Terms:</strong> We reserve the right to modify or replace these Terms of Use at any time.
            It is your responsibility to check these Terms periodically for changes. Your continued use of the Site
            following the posting of any changes to these Terms constitutes acceptance of those changes.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Governing Law</h2>
        <p className="mb-4 text-lg">
          <strong>Jurisdiction:</strong> These Terms of Use shall be governed by and construed in accordance with the
          laws of the State of New York, without regard to its conflict of law principles.
        </p>
      </section>
    </div>
    <NewsletterSubscription/>
    </div>
  )
}

