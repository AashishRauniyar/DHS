"use client";

import Link from "next/link";
import Image from "next/image";


interface HealthArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
}

export default function GeneralHealthListing() {
  // Sample data for health articles
  const articles: HealthArticle[] = [
    {
      id: "1",
      title:
        "UroControl Pro Review 2025: The Ultimate Solution for Bladder Control?",
      date: "March 22, 2025",
      category: "Bladder Control",
      categorySlug: "bladder-control",
      description:
        "UroControl Pro claims to strengthen pelvic floor muscles and improve bladder control with natural ingredients. Our comprehensive review examines the science behind this supplement and whether it actually delivers results for those suffering from urinary incontinence...",
      image: "/placeholder.svg",
    },
    {
      id: "2",
      title:
        "MuscleMax Elite Review: Does This Bodybuilding Supplement Actually Work?",
      date: "March 19, 2025",
      category: "Body Building",
      categorySlug: "body-building",
      description:
        "MuscleMax Elite promises to accelerate muscle growth, enhance recovery, and maximize workout performance. But does the science support these claims? Our in-depth analysis reveals what you need to know before investing in this popular bodybuilding supplement...",
      image: "/placeholder.svg",
    },
    {
      id: "3",
      title:
        "ImmunoShield Plus Review 2025: Boost Your Immune System Naturally",
      date: "March 17, 2025",
      category: "Immune Support",
      categorySlug: "immune-support",
      description:
        "ImmunoShield Plus combines vitamins, minerals, and herbal extracts to strengthen your immune system and protect against seasonal threats. Our detailed review examines the ingredient profile, clinical evidence, and user experiences to determine if this supplement is worth your investment...",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Main Content */}
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            General Health
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow overflow-hidden p-6 border-b"
              >
                <div className="flex-shrink-0 w-full md:w-48">
                  {" "}
                  <Link href="#">
                    <div className="border p-2 inline-block">
                      <Image
                        src={"/bodybuilding.jpg"}
                        alt={article.title}
                        width={200}
                        height={200}
                        className="w-full h-auto"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link
                      href="#"
                      className="hover:text-blue-500 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-gray-700 mb-4">{article.description}</p>

                  <div className="flex justify-between items-center">
                    <Link
                      href="#"
                      className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                    >
                      Read more
                    </Link>
                    <Link
                      href="#"
                      className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      Leave a comment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Recent Posts
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline block transition-colors"
                    >
                      UroControl Pro Review 2025: The Ultimate Solution for
                      Bladder Control?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline block transition-colors"
                    >
                      MuscleMax Elite Review: Does This Bodybuilding Supplement
                      Actually Work?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline block transition-colors"
                    >
                      ImmunoShield Plus Review 2025: Boost Your Immune System
                      Naturally
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Recent Comments
                </h3>
                <ul className="space-y-4">
                  <li className="text-sm">
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline font-medium transition-colors"
                    >
                      Sarah J.
                    </Link>
                    <span className="text-gray-600"> on </span>
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline transition-colors"
                    >
                      UroControl Pro Review 2025
                    </Link>
                  </li>
                  <li className="text-sm">
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline font-medium transition-colors"
                    >
                      Mike T.
                    </Link>
                    <span className="text-gray-600"> on </span>
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline transition-colors"
                    >
                      MuscleMax Elite Review
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-blue-500 flex items-center transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Bladder Control
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-blue-500 flex items-center transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Body Building
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-blue-500 flex items-center transition-colors"
                    >
                      <span className="mr-2">•</span>
                      Immune Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
