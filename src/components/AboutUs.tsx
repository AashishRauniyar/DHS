/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import ContactUsSection from "./ContactUs"
import TeamSection from "./team"
import NewsletterSubscription from "./newsletter-subscription"


export default function AboutUs() {
  return (
    <div>
    <div className="container mx-auto px-3 py-6 max-w-5xl">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>

      {/* Navigation Menu */}
      <div className="bg-gray-100 rounded-md mb-10">
        <nav className="flex flex-wrap justify-center py-3">
          <Link href="#our-mission" className="px-5 py-2 text-blue-600 hover:underline text-lg">
            Our Mission
          </Link>
          <Link href="#who-we-are" className="px-5 py-2 text-blue-600 hover:underline text-lg">
            Who We Are
          </Link>
          <Link href="#our-team" className="px-5 py-2 text-blue-600 hover:underline text-lg">
            Meet the Team
          </Link>
          <Link href="#affiliate-disclosure" className="px-5 py-2 text-blue-600 hover:underline text-lg">
            Affiliate Disclosure
          </Link>
          <Link href="#contact-us" className="px-5 py-2 text-blue-600 hover:underline text-lg">
            Contact Us
          </Link>
          <Link href="#team" className="px-5 py-2 text-blue-600 hover:underline text-lg">
            Our Contributors
          </Link>
        </nav>
      </div>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">What is Daily Health Supplement?</h2>
        <p className="mb-5 text-lg">
          Daily Health Supplement is your trusted source for comprehensive, accurate, and up-to-date information about
          health supplements. We understand that navigating the world of health supplements can be overwhelming, with
          countless products and conflicting information available. That's why we're dedicated to providing you with
          reliable, evidence-based reviews and educational content to help you make informed decisions about your
          health.
        </p>
        <p className="mb-5 text-lg">
          At Daily Health Supplement, we are committed to transparency, integrity, and excellence in all that we do. Our
          team of experienced health professionals, including doctors, nutritionists, and researchers, works tirelessly
          to ensure that the information we provide is accurate, reliable, and understandable. We believe that everyone
          deserves access to trustworthy health information, and we strive to be your go-to resource for all things
          related to health supplements.
        </p>
        <p className="mb-5 text-lg">
          We take a rigorous approach to our reviews, conducting thorough research and analysis on a wide range of
          health supplements. Our comprehensive evaluation process examines clinical trials, user feedback, ingredient
          quality, manufacturing standards, and more to ensure that you understand both benefits and potential
          drawbacks. We cover a variety of health topics, including weight loss, weight management, brain health, joint
          health, skin supplements, and immune support.
        </p>
        <p className="mb-5 text-lg">
          Our goal is not just to inform but to educate and inspire our readers to take charge of their health and
          well-being. Whether you're interested in supplements to help boost your energy levels, enhance your physical
          fitness, improve your mental clarity, or address specific health concerns, we're here to provide you with the
          information you need to make every step of the way.
        </p>
        <p className="mb-5 text-lg">
          We also understand the importance of community and engagement. We encourage our readers to share their
          experiences and provide us with valuable feedback. Your questions, comments, and suggestions help us improve
          our content and ensure that we remain responsive to your needs.
        </p>
        <p className="mb-5 text-lg">
          Thank you for choosing Daily Health Supplement as your trusted partner in health and wellness. We are honored
          to be a part of your health journey and look forward to helping you achieve your health goals and aspirations.
        </p>
      </section>

      {/* Our Mission */}
      <section id="our-mission" className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">OUR MISSION</h2>
        <div className="bg-gray-50 border-l-4 border-green-500 p-5 mb-5">
          <p className="mb-3 text-lg">
            At Daily Health Supplement, our mission is to provide reliable and transparent reviews of health
            supplements, empowering consumers to make informed decisions about their health by offering detailed,
            science-backed information.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Who We Are</h2>
        <p className="mb-5 text-lg">
          Daily Health Supplement is a premier online platform dedicated to providing the most reliable and
          comprehensive reviews about health supplements. Founded with a vision to cut through the noise and give
          consumers high-quality health information, our journey began several years ago when a group of health
          professionals noticed a gap in accessible, independent health supplement reviews.
        </p>
      </section>

      {/* Our Founding Story */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Our Founding Story</h2>
        <p className="mb-5 text-lg">
          Daily Health Supplement was born out of frustration with the health supplement industry. Our diverse group of
          doctors, nutritionists, dietitians, and fitness experts. They noticed a troubling trend: many people were
          making health decisions based on misinformation or inadequate research. Determined to change this, they
          created a platform where everyday people could find trustworthy, thoroughly researched information about
          health supplements.
        </p>
        <p className="mb-5 text-lg">
          Starting with just a handful of reviews, our platform's mission to demystify the supplement industry quickly
          gained traction. Our founders pooled their extensive knowledge and experience to establish rigorous review
          methodologies. Over time, our team of content was backed by scientific evidence and real user experiences. As
          our reputation for honesty and accuracy grew, so did our audience and audience grew rapidly.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">What We Do</h2>
        <ul className="list-disc pl-8 space-y-4 mb-5 text-lg">
          <li>
            <strong>In-depth Reviews:</strong> We conduct rigorous testing on a wide range of health supplements,
            including weight loss, joint health, male enhancement, dog vitamins, skin, and more.
          </li>
          <li>
            <strong>Educational Content:</strong> We create informative articles about health topics and supplements.
          </li>
          <li>
            <strong>Expert Analysis:</strong> Our reviews are based on extensive research, clinical trials, and user
            feedback. We analyze ingredients, manufacturing processes, side effects, and cost to give you a complete
            picture.
          </li>
          <li>
            <strong>Wellness Guidance:</strong> Beyond just supplements, we provide advice for a healthier lifestyle.
            Our content covers a variety of topics related to health, beauty, and wellness.
          </li>
        </ul>
      </section>

      {/* Our Approach */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Our Approach</h2>
        <p className="mb-5 text-lg">
          Our team invests a significant amount of time researching and studying health supplements. Our team reviews
          scientific studies, clinical trials, and user testimonials to provide you with accurate information.
        </p>
        <p className="mb-5 text-lg">
          <strong>Research:</strong> We spend hundreds of hours of research. We analyze ingredients, dosages, and
          potential side effects.
        </p>
        <p className="mb-5 text-lg">
          <strong>Review:</strong> Our reviews are detailed and transparent. We provide a thorough analysis of each
          supplement, including pros and cons, and give an informed decision.
        </p>
        <p className="mb-5 text-lg">
          <strong>Revise:</strong> We regularly update our content to ensure it remains current. If you find that you
          believe is inaccurate, please contact us, and we will verify and correct it promptly.
        </p>
      </section>

      {/* Affiliate Disclosure */}
      <section id="affiliate-disclosure" className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Affiliate Disclosure</h2>
        <p className="mb-5 text-lg">
          Daily Health Supplement is a commercial site. Some of the links on our site are affiliate links, which means
          we may receive a small commission if you purchase through them. This does not affect our reviews or
          recommendations, as our primary goal is to provide you with accurate and unbiased information to help you make
          informed decisions about your health.
        </p>
      </section>

      {/* Meet the Team */}
      <section id="our-team" className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Meet the Team</h2>
        <p className="mb-5 text-lg">
          Our team at Daily Health Supplement is comprised of highly skilled professionals who bring a wealth of
          knowledge from various disciplines. Each member plays a crucial role in ensuring our content is accurate,
          comprehensive, and beneficial to our readers. Here's a closer look at the dedicated individuals who make Daily
          Health Supplement your trusted source for health information:
        </p>

        <div className="space-y-8 mt-8">
          {/* Team Member 1 */}
          <div className="border-b pb-8">
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Dr. Tanner Rector, MD - Chief Medical Officer</h3>
            <p className="mb-3 text-lg">
              Dr. Tanner Rector leads our medical team with over 20 years of experience in clinical practice. With a
              background in internal medicine and nutrition, Dr. Rector brings scientific rigor and precision to ensure
              medical accuracy. Dr. Rector is passionate about helping individuals make informed health decisions. He is
              also a published author in several medical journals and a frequent speaker at health conferences.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="border-b pb-8">
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Hillary Banks, RD - Registered Dietitian</h3>
            <p className="mb-3 text-lg">
              Hillary brings over 15 years of experience as a registered dietitian known for helping people achieve
              their health goals through balanced nutrition and evidence-based practices. She has been a part of the
              Daily Health Supplement team for five years, where she specializes in dietetics and nutrition supplements.
              Hillary has contributed to numerous health publications and has been featured in several health and
              wellness publications.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="border-b pb-8">
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Sarah Goodwin, PhD - Chief Research Scientist</h3>
            <p className="mb-3 text-lg">
              Sarah leads our research department, focusing on the scientific evaluation of health supplements and their
              effects. Leading our research team, he ensures that our reviews are based on solid scientific evidence and
              thorough analysis. Dr. Goodwin's expertise in biochemistry and pharmacology provides invaluable insights
              into how supplements interact with the body.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="border-b pb-8">
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">James Green, MA - Senior Health Writer</h3>
            <p className="mb-3 text-lg">
              James is our senior health writer with over 10 years of experience covering a wide range of health topics,
              including weight loss, fitness, and wellness. He holds a Master's degree in Health Communication and has
              been recognized for his ability to translate complex health information into accessible content for our
              readers.
            </p>
          </div>

          {/* Team Member 5 */}
          <div className="border-b pb-8">
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Nathan Meyers, ND - Naturopathic Doctor</h3>
            <p className="mb-3 text-lg">
              Dr. Nathan Meyers is a licensed naturopathic doctor with over 15 years of experience in clinical and
              herbal medicine. Specializing in natural supplements and alternative therapies, Dr. Meyers brings a unique
              perspective to our team. Dr. Meyers frequently lectures on natural health remedies and is actively
              involved in community health initiatives.
            </p>
          </div>

          {/* Wellness Contributors */}
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Wellness Contributors</h3>
            <div className="space-y-6">
              <div>
                <p className="font-medium text-xl mb-1">Shayna Ashworth</p>
                <p className="text-lg">
                  Shayna Ashworth is a freelance writer and health enthusiast with a deep love for fitness and
                  nutrition. She contributes regularly to our blog, bringing her insights on wellness trends and healthy
                  living. With a background in journalism, Shayna has become a trusted and reliable voice for our
                  content.
                </p>
              </div>
              <div>
                <p className="font-medium text-xl mb-1">Wayne Anderson</p>
                <p className="text-lg">
                  Wayne is a certified personal trainer and fitness coach with over 10 years of experience in the
                  fitness industry. He provides valuable insights into effective workout routines and supplement
                  strategies. Wayne's articles are well-researched and geared toward helping readers achieve their
                  fitness goals.
                </p>
              </div>
              <div>
                <p className="font-medium text-xl mb-1">Jayne Decker</p>
                <p className="text-lg">
                  Jayne Decker is a certified personal trainer and nutrition coach who writes about effective workout
                  routines and nutrition tips. He holds certifications from several renowned fitness organizations and
                  has helped thousands of clients achieve their fitness objectives over his 12-year career in the health
                  and wellness industry.
                </p>
              </div>
              <div>
                <p className="font-medium text-xl mb-1">Nyssa Penny</p>
                <p className="text-lg">
                  Nyssa Penny is a research scientist specializing in dietary supplements. She ensures that our content
                  is scientifically accurate, evidence-based, and accessible to our readers. Nyssa holds a Master's
                  degree in Nutrition Science and is passionate about educating the public on making informed health
                  decisions.
                </p>
              </div>
              <div>
                <p className="font-medium text-xl mb-1">Barrett Dubois</p>
                <p className="text-lg">
                  Barrett is a health and fitness expert with a passion for writing. He contributes insightful articles
                  on nutrition and wellness, drawing from his background in sports science and nutrition. Barrett's
                  engaging style and expertise make his contributions a valued asset to our readers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-lg">
          Our team's diverse expertise and shared commitment to health and wellness drive our mission to provide
          reliable, accessible information. Together, we work tirelessly to ensure that Daily Health Supplement remains
          your trusted source for health supplement information.
        </p>
      </section>

      {/* Contact Us Section */}
      <ContactUsSection />

      {/* Team Section */}
      <TeamSection />

      
    </div>
    {/* Newsletter Subscription */}
    <NewsletterSubscription />
    </div>
  )
}

