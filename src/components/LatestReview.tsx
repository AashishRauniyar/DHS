"use client";


import Image from "next/image"
import { useState, useEffect } from "react"


export default function LatestReview() {
  // State to track the current slide position
  const [slidePosition, setSlidePosition] = useState(0);
  // State to track screen size
  const [visibleCards, setVisibleCards] = useState(2);

  // Array of review data
  const reviews = [
    {
      title: "Essential Oils : What To Know About Essential Oils?",
      image: "/placeholder.svg?height=288&width=384",
    },
    {
      title: "Dietitian-Approved Foods To Boost Testosterone Naturally",
      image: "/placeholder.svg?height=288&width=384",
    },
    {
      title: "Best Low-Carb Vegetables, Recommended By Dietitians",
      image: "/placeholder.svg?height=288&width=384",
    },
    {
      title: "List Of Low-Calorie Foods – Nutritious Way For Healthy Diet",
      image: "/placeholder.svg?height=288&width=384",
    },
    {
      title: "10 Superfoods For Better Health",
      image: "/placeholder.svg?height=288&width=384",
    },
    {
      title: "Healthy Breakfast Ideas For Weight Loss",
      image: "/placeholder.svg?height=288&width=384",
    },
  ];

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to slide left
  const slideLeft = () => {
    if (slidePosition > 0) {
      setSlidePosition(slidePosition - 1);
    }
  };

  // Function to slide right
  const slideRight = () => {
    if (slidePosition < reviews.length - visibleCards) {
      setSlidePosition(slidePosition + 1);
    }
  };

  // Calculate slide percentage based on visible cards
  const slidePercentage = 100 / visibleCards;

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8 border-b pb-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-500">
            Latest Review
          </h2>
          <a
            href="#"
            className="text-red-600 font-bold flex items-center hover:underline text-sm sm:text-base"
          >
            VIEW ALL
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${slidePosition * slidePercentage}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`px-2 sm:px-3 md:px-4 flex-shrink-0`}
                  style={{ width: `${slidePercentage}%` }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md sm:shadow-lg h-full">
                    {" "}
                    <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200 relative">
                      <Image

                        src={review.image || "/placeholder.svg"} 


                        alt={review.title}
                        className="w-full h-full object-cover"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-center line-clamp-2">
                        {review.title}
                      </h3>
                      <div className="mt-4 sm:mt-6 flex justify-center">
                        <a
                          href="#"
                          className="text-blue-500 hover:text-blue-700 text-sm sm:text-base font-medium"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow - Positioned at the middle of the image section */}
          <button
            className={`absolute left-0 bg-white rounded-full p-2 sm:p-3 shadow-md z-10 ${
              slidePosition === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            style={{ top: "calc(24px + 12%)" }}
            onClick={slideLeft}
            disabled={slidePosition === 0}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-6 sm:w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow - Positioned at the middle of the image section */}
          <button
            className={`absolute right-0 bg-white rounded-full p-2 sm:p-3 shadow-md z-10 ${
              slidePosition >= reviews.length - visibleCards
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            style={{ top: "calc(24px + 12%)" }}
            onClick={slideRight}
            disabled={slidePosition >= reviews.length - visibleCards}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-6 sm:w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
