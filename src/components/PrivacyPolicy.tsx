/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import NewsletterSubscription from "./newsletter-subscription"

export default function PrivacyPolicy() {
  return (
    <div>
    <div className="container mx-auto px-3 py-6 max-w-5xl">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-8">Effective Date: [01-07-2022]</p>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Introduction</h2>
        <p className="mb-4 text-lg">
          Daily Health Supplement ("we", "us", "our") is committed to protecting your privacy and providing a safe
          online experience for all of our users. This Privacy Policy outlines how we collect, use, disclose, and
          safeguard your information when you visit our website{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            [www.dailyhealthsupplement.com]
          </Link>{" "}
          (the "Site").
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Information We Collect</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-3">Personal Information</h3>
          <p className="mb-3 text-lg">
            We may collect personal information that you voluntarily provide to us when you interact with our Site, such
            as when you subscribe to our newsletter, participate in surveys or contests, or contact us for support. This
            information may include:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-lg">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-3">Non-Personal Information</h3>
          <p className="mb-3 text-lg">
            We also collect non-personal information automatically as you navigate through the Site. This information
            may include:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2 text-lg">
            <li>Browser type</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Internet service provider</li>
            <li>Pages visited</li>
            <li>Referring URL</li>
            <li>Time and date of visits</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">How We Use Your Information</h2>
        <p className="mb-3 text-lg">We use the information we collect in the following ways:</p>
        <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
          <li>To personalize your experience and deliver content and product offerings relevant to your interests.</li>
          <li>To improve our website in order to better serve you.</li>
          <li>To administer a contest, promotion, survey, or other site feature.</li>
          <li>To send periodic emails regarding your order or other products and services.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Disclosure of Your Information</h2>
        <p className="mb-4 text-lg">
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This
          does not include trusted third parties who assist us in operating our website, conducting our business, or
          servicing you, as long as those parties agree to keep this information confidential.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Affiliate Links and Advertising</h2>
        <p className="mb-4 text-lg">
          Daily Health Supplement participates in affiliate marketing programs, which means we may earn commissions on
          editorially chosen products purchased through our links to retailer sites. These affiliate links do not
          influence our editorial content, and we only recommend products we genuinely believe in.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Third-Party Links</h2>
        <p className="mb-4 text-lg">
          Occasionally, at our discretion, we may include or offer third-party products or services on our website.
          These third-party sites have separate and independent privacy policies. We therefore have no responsibility or
          liability for the content and activities of these linked sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Security of Your Information</h2>
        <p className="mb-4 text-lg">
          We implement a variety of security measures to maintain the safety of your personal information when you
          enter, submit, or access your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Your Consent</h2>
        <p className="mb-4 text-lg">By using our Site, you consent to our website's privacy policy.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Changes to Our Privacy Policy</h2>
        <p className="mb-4 text-lg">
          If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply
          only to information collected after the date of the change.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Contact Us</h2>
        <p className="mb-4 text-lg">
          If you have any questions regarding this Privacy Policy, you may contact us using the information below:
        </p>
        <p className="mb-1 text-lg">
          Email:{" "}
          <Link href="mailto:info@dailyhealthsupplement.com" className="text-blue-600 hover:underline">
            info@dailyhealthsupplement.com
          </Link>
        </p>
        <p className="mb-1 text-lg">Address: 65 Main Street, New York, NY 10009, USA/Canada</p>
        <p className="text-lg">Phone (Toll Free): +1 (866) 121-2589</p>
      </section>
    </div>
    <NewsletterSubscription/>
    </div>
  )
}

