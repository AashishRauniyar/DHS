/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"

export default function ContactUsSection() {
  return (
    <section id="contact-us" className="mb-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-5">Contact Us</h2>
      
      {/* Medical Question Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Do you have a medical question?</h3>
        <p className="mb-4 text-lg">
          While we're unable to provide personal health advice, we are always concerned with the safety of our readers so if you're experiencing any
          medical emergency, call your local emergency services immediately, or visit the nearest emergency urgent care center.
        </p>
      </div>

      {/* Inaccuracy Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Have you found an inaccuracy within our content?</h3>
        <p className="mb-4 text-lg">
          Please visit our <Link href="#" className="text-blue-600 hover:underline">claim your product</Link> page to let us know.
        </p>
      </div>

      {/* Contributing Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Interested in contributing to our site? Want to pitch your product or service?</h3>
        <p className="mb-4 text-lg">
          We're always looking for experienced and qualified writers with expertise and credentials in the areas of health and wellness. We have very
          high standards, something everyone that writes for us is extremely proud of. Sound like you? Please visit our <Link href="#" className="text-blue-600 hover:underline">contributors</Link> page.
        </p>
        <p className="mb-4 text-lg">
          Please note that we do not accept unsolicited guest-authored articles, blogs, or posts.
        </p>
      </div>

      {/* Advertising Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Want to advertise with us?</h3>
        <p className="mb-4 text-lg">
          We offer the highest value to advertisers through a combination of scale, credibility, and intent.
        </p>
        <p className="mb-4 text-lg">
          Interested in advertising with us? Please visit <Link href="#" className="text-blue-600 hover:underline">this page</Link> to learn more.
        </p>
      </div>

      {/* Content Usage Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Would you like to use our content for your own purposes?</h3>
        <p className="mb-4 text-lg">
          Please <Link href="#" className="text-blue-600 hover:underline">contact</Link> our licensing team with your permission request.
        </p>
      </div>

      {/* Site Issues Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Having trouble using our site?</h3>
        <p className="mb-4 text-lg">
          Please visit our <Link href="#" className="text-blue-600 hover:underline">contact us</Link> page to report an issue.
        </p>
      </div>

      {/* Social Media Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Follow DailyHealthSupplement.com</h3>
        <p className="mb-4 text-lg">
          Now that you know more about Consumer Health Digest's mission, be sure to connect with us through social media. You'll never have to worry
          about staying up to date on the latest product reviews and articles, all aimed at one goal: helping you to avoid scams! You can follow our latest
          updates via our <Link href="#" className="text-blue-600 hover:underline">Health Center</Link>, our <Link href="#" className="text-blue-600 hover:underline">Facebook Page</Link>, or on <Link href="#" className="text-blue-600 hover:underline">Twitter</Link>, <Link href="#" className="text-blue-600 hover:underline">YouTube</Link>, <Link href="#" className="text-blue-600 hover:underline">Pinterest</Link>, <Link href="#" className="text-blue-600 hover:underline">Instagram</Link>.
        </p>
      </div>

      {/* Company Information */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Fistail Info Solutions Private Limited</h3>
        
        <div className="mb-4">
          <h4 className="text-xl font-bold text-blue-600 mb-2">USA Business Office</h4>
          <p className="mb-1 text-lg"><strong>Mailing Address</strong></p>
          <p className="mb-1 text-lg">3 E Evergreen Road #1193,</p>
          <p className="text-lg">New City, NY 10956</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xl font-bold text-blue-600 mb-2">India Development Office</h4>
          <p className="mb-1 text-lg"><strong>Mailing Address</strong></p>
          <p className="mb-1 text-lg">15, Software Technology Park,</p>
          <p className="mb-1 text-lg">Link Road, Sadar,</p>
          <p className="mb-1 text-lg">Nagpur, 440001</p>
          <p className="text-lg">Maharashtra, INDIA</p>
        </div>
      </div>

      {/* Praise Section
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Praise and Mentions on Reputable Websites</h3>
        <p className="mb-4 text-lg">
          Consumer Health Digest is proud of the fact that it is consistently featured and recognized in popular magazine publications and blogs.
        </p>
        <p className="mb-4 text-lg">
          From professional industry news articles to bloggers reviewing a product, we truly appreciate each and every shout-out.
        </p>
        <p className="mb-4 text-lg">
          Please <Link href="#" className="text-blue-600 hover:underline">contact us</Link> if you are interested in featuring Consumer Health Digest in an upcoming article, blog, or news post. We enjoy forming new
          relationships with reputable websites.
        </p>
        <p className="mb-4 text-lg font-medium">
          Our work has been shared by, quoted in, and used by organizations including:
        </p>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 uppercase mb-4">AS SEEN IN</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">GREATIST</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">MNN</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">ALLURE</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">ELITE DAILY</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">VOICE</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">PEOPLE</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">COSMOPOLITAN</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-12 flex items-center justify-center">MIGHTY</div>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </section>
  )
}
