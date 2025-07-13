import NewsletterSubscription from "./newsletter-subscription";

export default function WriteForUs() {
    return (
        <div>
      <div className="container mx-auto px-3 py-6 max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-1">Write For Us</h1>
        <p className="text-gray-700 mb-8">Guest Post Opportunities</p>
  
        <section className="mb-8">
          <p className="mb-4 text-lg">
            Welcome to Daily Health Supplement! We invite expert contributors and wellness enthusiasts to join us in
            sharing valuable insights and empowering our readers with informative content. Whether you&apos;re a seasoned
            health professional, a passionate advocate for wellness, or a storyteller with a fitness journey to share, we
            encourage you to submit your best articles to be featured on our platform.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-5">Why Write for Us?</h2>
          <p className="mb-4 text-lg">
            At Daily Health Supplement, we are committed to providing our audience with accurate, evidence- based
            information on health and wellness. By contributing a guest post, you have the opportunity to:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
            <li>
              <strong>Share Expertise:</strong> Showcase your knowledge and expertise in health, fitness, weight loss,
              sexual health, lifestyle, relationships, or product reviews.
            </li>
            <li>
              <strong>Reach a Wide Audience:</strong> Connect with our diverse and engaged community of readers who are
              passionate about improving their health and well-being.
            </li>
            <li>
              <strong>Build Your Reputation:</strong> Gain exposure as a thought leader in your field and expand your
              professional network.
            </li>
            <li>
              <strong>Contribute to Education:</strong> Educate and empower individuals to make informed decisions about
              their health through your valuable insights.
            </li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-5">Our Main Categories</h2>
          <p className="mb-4 text-lg">We welcome submissions in the following main categories:</p>
          <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
            <li>Health & Fitness</li>
            <li>Weight Loss</li>
            <li>Sexual Health</li>
            <li>Lifestyle and Fitness Stories</li>
            <li>Love & Relationships</li>
            <li>Product Reviews on Health Supplements</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-5">Submission Guidelines</h2>
          <p className="mb-4 text-lg">
            To ensure the quality and relevance of our content, please adhere to the following guidelines when submitting
            your guest post:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
            <li>
              <strong>Word Count:</strong> Articles should be 750+ words in length.
            </li>
            <li>
              <strong>Content Focus:</strong> Focus on providing valuable content rather than promotional material. Avoid
              direct sales pitches.
            </li>
            <li>
              <strong>Editing:</strong> We reserve the right to edit submissions for style, including typos, grammar,
              redundancy, and overall clarity.
            </li>
            <li>
              <strong>Content Permissions:</strong> You are responsible for obtaining all necessary permissions for
              content, including rights to use any photos, audio, video, or other media.
            </li>
            <li>
              <strong>Byline/Bio:</strong> Include a brief byline (two to three sentences) at the end of your article with
              your bio and social media handles (e.g., Facebook, Twitter, website).
            </li>
            <li>
              <strong>Originality:</strong> We accept only original content that has not been published elsewhere.
              Submissions will be checked for plagiarism using tools such as Plagiarism Checker or Copyscape.
            </li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-5">How to Submit</h2>
          <p className="mb-4 text-lg">
            Please email your submissions or any questions to [Your Email Address]. Include your article as a Word
            document or in the body of the email. We aim to review submissions promptly and will notify you of the status
            of your article.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-5">Contact Us</h2>
          <p className="mb-4 text-lg">
            If you have any further inquiries about guest posting or would like more information, please feel free to
            contact us at [Your Contact Email].
          </p>
          <p className="mb-4 text-lg">
            We look forward to collaborating with you to provide valuable content that educates, inspires, and empowers
            our readers on their journey to better health and wellness.
          </p>
        </section>
      </div>
      <NewsletterSubscription/>
      </div>
    )
  }
  
  