import Link from "next/link"
export default function Footer() {

 

    return (
      <footer className="bg-gray-800 text-white">
        {/* Top Navigation Bar */}
        <div className="border-b border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-wrap justify-center md:justify-end space-x-2 md:space-x-6">
              
              <Link href="/About" className="py-2 px-1 hover:text-gray-300 transition-colors">
                About Us
              </Link>
              <Link href="/PrivacyPolicy" className="py-2 px-1 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/ReturnPolicy" className="py-2 px-1 hover:text-gray-300 transition-colors">
                Return Policy
              </Link>
              <Link href="/Terms" className="py-2 px-1 hover:text-gray-300 transition-colors">
                Terms of Use
              </Link>
              <Link href="/About#affiliate-disclosure" className="py-2 px-1 hover:text-gray-300 transition-colors">
                Disclosure
              </Link>
              <Link href="/About#contact-us" className="py-2 px-1 hover:text-gray-300 transition-colors">
                Contact Us
              </Link>
              <Link href="/WriteForUs" className="py-2 px-1 hover:text-gray-300 transition-colors">
                Write For Us
              </Link>
            </nav>
          </div>
        </div>
  
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Our Company</h3>
              <p className="text-gray-300 text-sm mb-4">
                We are dedicated to providing honest, unbiased reviews of health supplements and wellness products to help
                you make informed decisions about your health.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="/ArticleListing" className="text-gray-300 hover:text-white transition-colors">
                    Product Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Buying Guides
                  </a>
                </li>
                <li>
                  <a href="/GeneralHealth" className="text-gray-300 hover:text-white transition-colors">
                    Health Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/SiteMap" className="text-gray-300 hover:text-white transition-colors">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Brain Supplements
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Joint Health
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Weight Loss
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Immune Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Sleep Aids
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Vitamins & Minerals
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for the latest product reviews and health tips.
              </p>
              <form className="mt-4">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="bg-gray-900 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-2 md:mt-0">
                Disclaimer: These statements have not been evaluated by the FDA. Products are not intended to diagnose,
                treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  