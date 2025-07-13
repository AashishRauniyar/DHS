"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email address")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setMessage("Thank you for subscribing!")
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="bg-blue-100 py-12 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-3/5 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-blue-600 text-center md:text-left mb-6">
              SUBSCRIBE TO OUR NEWSLETTER
            </h2>

            <form onSubmit={handleSubmit} className="max-w-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email Address..."
                  className="flex-grow px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SENDING..." : "SUBMIT"}
                </button>
              </div>

              {message && (
                <p className={`mt-2 ${message.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>{message}</p>
              )}
            </form>

            <div className="mt-4 text-gray-700">
              <p>Spam-free newsletters directly from our health experts and professionals.</p>
              <p>
                Your{" "}
                <Link href="/privacy-policy" className="text-blue-500 hover:underline">
                  privacy
                </Link>{" "}
                is important to us
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="absolute w-56 h-56 border-2 border-dashed border-gray-400 rounded-full"></div>

              {/* Email icons */}
              <div className="relative">
                <div className="absolute -top-10 -left-8 transform rotate-12 bg-blue-300 w-16 h-12 rounded-sm"></div>
                <div className="absolute top-0 left-0 transform -rotate-6 bg-blue-400 w-20 h-16 rounded-sm"></div>
                <div className="absolute top-6 right-0 transform rotate-12 bg-blue-200 w-12 h-10 rounded-sm"></div>

                {/* Paper airplane */}
                <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-4">
                  <div className="w-12 h-12 bg-blue-300 transform rotate-45 skew-x-12 skew-y-12"></div>
                </div>

                {/* Decorative elements */}
                <span className="absolute top-0 right-12 text-blue-300 text-2xl">+</span>
                <span className="absolute -top-8 left-4 text-blue-300 text-2xl">•</span>
                <span className="absolute bottom-4 left-16 text-blue-300 text-2xl">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

