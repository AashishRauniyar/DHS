import Link from "next/link"
import NewsletterSubscription from "./newsletter-subscription"

export default function ReturnPolicy() {
  return (
    <div>
    <div className="container mx-auto px-3 py-6 max-w-5xl">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Return Policy</h1>
      <p className="mb-8 text-lg">
        At Daily Health Supplement, we strive to ensure that our customers receive products they are satisfied with. If
        for any reason you are not happy with your purchase and wish to return it, please review our return policy
        guidelines below.
      </p>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Check Items on Delivery</h2>
        <p className="mb-4 text-lg">
          We recommend thoroughly inspecting all items upon delivery to ensure they meet your expectations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">General Return and Refund Policies</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-3">Returns</h3>
          <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
            <li>You have 30 days from the date of receiving the product to initiate a return.</li>
            <li>
              To be eligible for a return, the product must be unused and in the same condition as when you received it.
            </li>
            <li>The product must be returned in its original packaging.</li>
            <li>A receipt or proof of purchase is required.</li>
            <li>
              All items must be returned in their original condition, including tags, user manuals, warranty cards, and
              the original manufacturer&apos;s packaging.
            </li>
            <li>
              Note that return options may vary by location. Please read all terms and conditions before making a
              purchase.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-3">Refunds</h3>
          <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
            <li>Upon receiving your returned product, it will be inspected, and you will be notified of receipt.</li>
            <li>
              Contact our customer service at [Customer Service Email] or [Customer Service Phone Number] to initiate
              your refund request.
            </li>
            <li>Once inspected and approved, your refund will be processed to your original payment method.</li>
            <li>
              Depending on the product and payment method, refunds may take a specified number of days to reflect in
              your account.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Shipping</h2>
        <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
          <li>You are responsible for the cost of returning the product. Shipping expenses are non-refundable.</li>
          <li>If a refund is issued, the cost of return shipping will be deducted from your refund amount.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Exchange</h2>
        <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
          <li>
            For exchanges, please contact the customer support team of the respective brand or product you purchased.
            They may offer free returns within a specific timeframe for store credit, a replacement product, or a refund
            to the original payment method.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Exceptions to the Return and Refund Policy</h2>
        <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
          <li>Discounted items are final sale and cannot be returned or exchanged.</li>
          <li>Returned items must have all tags attached and be in their original packaging.</li>
          <li>Items returned must show no visible signs of wear or use.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-5">Steps to Initiate a Return</h2>
        <p className="mb-4 text-lg">
          To initiate a return, please follow these steps on the manufacturer or product&apos;s official website:
        </p>
        <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
          <li>Reply to your order confirmation email to request a return.</li>
          <li>Print the prepaid return shipping label received via email.</li>
          <li>Ship all items back using the provided shipping label.</li>
        </ul>
      </section>

      <section className="mb-8">
        <p className="mb-4 text-lg">
          For any questions or further assistance regarding our Return Policy, please contact us at:
        </p>
        <ul className="list-disc pl-8 mb-4 space-y-3 text-lg">
          <li>
            <strong>Email:</strong>{" "}
            <Link href="mailto:info@dailyhealthsupplement.com" className="text-blue-600 hover:underline">
              info@dailyhealthsupplement.com
            </Link>
          </li>
          <li>
            <strong>Address:</strong> 65 Main Street, New York, NY 10009, USA/Canada Toll Free: 1 (866) 121-2589
          </li>
        </ul>
      </section>
    </div>
    <NewsletterSubscription/>
    </div>
  )
}

