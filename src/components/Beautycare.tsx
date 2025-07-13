/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";

export default function BeautyCareListing() {
  return (
    <div className="max-w-4xl mx-auto bg-white font-sans">
      {/* Header - Blue gradient */}
      <div className=" text-blue-500 p-6 text-2xl mb-10 mt-10 ">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">
            The Truth & Real Deal on Anti-Aging Products
          </h1>
        </div>
      </div>

      {/* Author info - Enhanced with better spacing and styling */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex items-center text-sm text-gray-600 gap-6 border-b border-gray-100 pb-4">
          <div className="flex items-center">
            {" "}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden mr-3 shadow-sm border border-blue-50">
              <Image
                src="/placeholder.svg"
                alt="Author"
                width={30}
                height={30}
                className="object-cover"
              />
            </div>
            <span className="font-medium">Dr. James Wilson</span>
          </div>
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Published: April 10, 2025</span>
          </div>
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Updated: April 20, 2025</span>
          </div>
        </div>
      </div>

      {/* Introduction - Better typography and spacing */}
      <div className="container mx-auto px-6 mb-12">
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          Beauty Care supplements are designed to help improve overall wellness
          and support bodily functions for optimal health and appearance.
        </p>
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          What is a Beauty Care Supplement?
        </h2>
        <p className="mb-5 text-gray-700 leading-relaxed">
          Beauty Care supplements are used by a combination of people to improve
          wellness and, in many cases, address specific beauty concerns like
          hair health, skin elasticity, and nail strength.
        </p>
        <p className="mb-5 text-gray-700 leading-relaxed">
          However, some of the ingredients used are not backed with solid
          research for the intended effect, making consumer education important.
          The dietary supplements that support beauty can help with skin
          radiance, hair growth, and overall appearance.
        </p>
        <p className="mb-5 text-gray-700 leading-relaxed">
          Beauty care is described as a person's overall physical appearance and
          wellness. When the body's systems operate at their optimal capacity,
          people typically experience better skin, healthier hair, stronger
          nails, and a more youthful appearance.
        </p>
        <p className="mb-8 text-gray-700 leading-relaxed">
          Many people turn to supplements to help maintain their beauty or to
          address specific concerns. However, it's important to note that
          supplements are not a substitute for a healthy balanced diet, regular
          exercise, adequate sleep, and proper skincare. Always consult with
          your doctor or a qualified healthcare professional before starting any
          supplement.
        </p>
        {/* Image section - Enhanced with better shadows and styling */}{" "}
        <div className="mb-10">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 max-w-2xl mx-auto shadow-lg">
            <Image
              src="/placeholder.svg"
              alt="Person taking beauty supplements"
              className="w-full rounded-lg"
              width={600}
              height={400}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-3 italic">
            Beauty Care supplements can support overall wellness and appearance
          </p>
        </div>
        <p className="mb-6 text-gray-700 leading-relaxed">
          Beauty Care supplements can be helpful to many individuals who want to
          help boost their appearance and functional quality of life. It is
          advisable that one checks with their doctor before taking any
          supplements especially if they are dealing with certain medical
          conditions.
        </p>
        {/* CTA Button - Blue gradient styling */}
        <div className="text-center mb-12">
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            EXPLORE ALL CATEGORIES
          </button>
        </div>
        {/* Best Supplement Section - Enhanced with better card styling */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6">
          Best Beauty Care Supplement
        </h2>
        <div className="flex flex-col md:flex-row gap-8 border border-gray-100 p-6 rounded-xl mb-12 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
          <div className="md:w-1/3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 mx-auto max-w-[200px] shadow-md">
              <Image
                src="/placeholder.svg"
                alt="BeautyVital Plus bottle"
                className="mx-auto"
                width={200}
                height={300}
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              BeautyVital Plus
            </h3>
            <div className="flex mb-3">
              <span className="text-yellow-400 text-lg">★★★★★</span>
            </div>
            <p className="mb-5 text-gray-700 leading-relaxed">
              BeautyVital is a highly effective beauty supplement that combines
              vitamins, minerals, collagen, and herbs that improve skin
              elasticity, strengthen hair and nails, and promote a youthful
              appearance.
            </p>
            <p className="font-bold mb-5 text-blue-500">
              Use for 30-60 days for optimal results
            </p>
            <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:from-blue-500 hover:to-blue-700 transition-all duration-300 mb-5 w-full md:w-auto shadow-md hover:shadow-lg transform hover:-translate-y-1">
              CHECK BEST PRICE
            </button>
            <div className="flex gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm border border-blue-50">
                <Image
                  src="/placeholder.svg"
                  alt="Certification 1"
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm border border-blue-50">
                <Image
                  src="/placeholder.svg"
                  alt="Certification 2"
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm border border-blue-50">
                <Image
                  src="/placeholder.svg"
                  alt="Certification 3"
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm border border-blue-50">
                <Image
                  src="/placeholder.svg"
                  alt="Certification 4"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Supplement Reviews Table - Enhanced with better table styling */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6">
          Beauty Care Supplement Reviews
        </h2>
        <div className="overflow-x-auto mb-12 rounded-xl shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700">
                <th className="border border-gray-100 p-4 text-left font-semibold">
                  Beauty Supplements
                </th>
                <th className="border border-gray-100 p-4 text-left font-semibold">
                  Quality Rating
                </th>
                <th className="border border-gray-100 p-4 text-left font-semibold">
                  Support
                </th>
                <th className="border border-gray-100 p-4 text-left font-semibold">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-100 p-4">
                  <div className="font-bold text-gray-800">
                    BeautyVital Plus
                  </div>
                  <div className="text-sm text-gray-600">
                    Complete Beauty Formula
                  </div>
                </td>
                <td className="border border-gray-100 p-4 text-yellow-400">
                  ★★★★★
                </td>
                <td className="border border-gray-100 p-4">
                  Full Spectrum Beauty
                </td>
                <td className="border border-gray-100 p-4 font-medium">
                  $49.99
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-100 p-4">
                  <div className="font-bold text-gray-800">RadiantSkin</div>
                  <div className="text-sm text-gray-600">
                    Skin Elasticity Complex
                  </div>
                </td>
                <td className="border border-gray-100 p-4 text-yellow-400">
                  ★★★★☆
                </td>
                <td className="border border-gray-100 p-4">Skin Health</td>
                <td className="border border-gray-100 p-4 font-medium">
                  $39.99
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-100 p-4">
                  <div className="font-bold text-gray-800">LuxeHair</div>
                  <div className="text-sm text-gray-600">
                    Hair Growth Formula
                  </div>
                </td>
                <td className="border border-gray-100 p-4 text-yellow-400">
                  ★★★★☆
                </td>
                <td className="border border-gray-100 p-4">
                  Hair & Nail Health
                </td>
                <td className="border border-gray-100 p-4 font-medium">
                  $34.99
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* CTA Button - Blue gradient styling */}
        <div className="text-center mb-12">
          <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            SEE MORE
          </button>
        </div>
        {/* Common Ingredients Section - Enhanced with better card styling */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6">
          What are the Common Ingredients Used in Beauty Care Products?
        </h2>
        <p className="mb-5 text-gray-700 leading-relaxed">
          The most common ingredients are:
        </p>
        <div className="mb-8 space-y-5">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="font-bold text-blue-500 mb-2">Collagen</h3>
            <p className="text-gray-700 leading-relaxed">
              Collagen is the most abundant protein in the body and provides
              structure to skin, hair, and nails. As we age, collagen production
              decreases, leading to wrinkles and less elastic skin.
              Supplementing with collagen may help improve skin elasticity and
              hydration.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="font-bold text-blue-500 mb-2">Biotin</h3>
            <p className="text-gray-700 leading-relaxed">
              Biotin, also known as vitamin B7, helps with the metabolism of
              fatty acids, amino acids, and glucose. It's essential for healthy
              hair, skin, and nails. Biotin deficiency can lead to hair loss,
              skin rashes, and brittle nails, making it a popular ingredient in
              beauty supplements.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="font-bold text-blue-500 mb-2">Hyaluronic Acid</h3>
            <p className="text-gray-700 leading-relaxed">
              Hyaluronic acid is a substance naturally found in the skin, eyes,
              and joints. It can hold up to 1,000 times its weight in water,
              making it excellent for skin hydration. As a supplement, it may
              help improve skin moisture and reduce the appearance of fine
              lines.
            </p>
          </div>
        </div>
        <p className="mb-8 text-gray-700 leading-relaxed">
          Other ingredients commonly used in beauty supplements include Vitamins
          A, C, and E, Zinc, Selenium, Omega-3 fatty acids, and various
          antioxidants. While these ingredients have numerous beauty benefits,
          it's always advisable to consult with a healthcare professional before
          starting any supplement.
        </p>
        {/* Natural Supplements Section - Better typography and spacing */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6">
          What are the Best Natural Supplements for Beauty Care?
        </h2>
        <p className="mb-6 text-gray-700 leading-relaxed">
          These natural supplements may help with overall beauty and support
          skin, hair, and nail health:
        </p>
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="font-bold text-blue-500 text-xl mb-2">
              Evening Primrose Oil
            </h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Evening primrose oil is rich in gamma-linolenic acid (GLA), an
              essential fatty acid that helps maintain healthy skin. It may help
              improve skin elasticity, moisture, and firmness, and is often used
              to address skin conditions like eczema and acne.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-500 text-xl mb-2">Fish Oil</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Fish oil is rich in omega-3 fatty acids, which are essential for
              maintaining cell membranes and producing the skin's natural oil
              barrier. This helps keep skin hydrated, plumper, and younger
              looking. Omega-3s may also reduce inflammation, which can cause
              redness and acne.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-500 text-xl mb-2">
              Green Tea Extract
            </h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Green tea extract is rich in antioxidants called catechins, which
              help protect the skin from damage caused by free radicals. It may
              help reduce signs of aging, improve skin elasticity, and protect
              against sun damage. Green tea extract also has anti-inflammatory
              properties.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-500 text-xl mb-2">
              Resveratrol
            </h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Resveratrol is a powerful antioxidant found in red grapes,
              berries, and peanuts. It helps protect the skin from environmental
              damage, reduces inflammation, and may help slow the aging process
              by activating certain genes that promote longevity.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-blue-500 text-xl mb-2">Aloe Vera</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Aloe vera is known for its soothing and healing properties. When
              taken as a supplement, it may help improve skin hydration, reduce
              inflammation, and promote collagen production. Aloe vera is also
              rich in vitamins, minerals, and amino acids that support overall
              skin health.
            </p>
          </div>
        </div>
        {/* Do Supplements Work Section - Enhanced with better image styling */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6">
          Do Beauty Care Supplements Really Work?
        </h2>
        <div className="mb-8">
          {" "}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 max-w-2xl mx-auto shadow-lg mb-6">
            <Image
              src="/placeholder.svg"
              alt="Person discussing beauty supplements with doctor"
              className="w-full rounded-lg"
              width={600}
              height={400}
            />
          </div>
          <p className="mb-5 text-gray-700 leading-relaxed">
            If you are experiencing beauty concerns that are affecting your
            confidence and quality of life, speak to your doctor or
            dermatologist about the best approach for addressing these issues.
          </p>
          <p className="mb-5 text-gray-700 leading-relaxed">
            While beauty supplements can help support skin, hair, and nail
            health, they should be used as part of a comprehensive beauty
            regimen that includes proper skincare, a balanced diet rich in
            nutrients, adequate hydration, and protection from environmental
            damage.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Beauty supplements can be divided into two categories:
          </p>
          <ul className="list-disc pl-8 mb-5 text-gray-700 leading-relaxed space-y-2">
            <li>
              Nutrient-based supplements (vitamins, minerals, amino acids)
            </li>
            <li>Herbal and botanical supplements (plant extracts, oils)</li>
          </ul>
          <p className="mb-5 text-gray-700 leading-relaxed">
            Proper nutrition forms the foundation of beauty from within. The
            nutrients we consume play a vital role in skin cell regeneration,
            collagen production, and protection against environmental damage.
            However, many people experience nutritional gaps that can affect
            their appearance.
          </p>
          <p className="mb-5 text-gray-700 leading-relaxed">
            When taken as directed and discussed with your healthcare provider,
            beauty supplements can be effective in promoting skin radiance, hair
            strength, and nail health. However, results vary from person to
            person based on individual factors like genetics, age, and overall
            health.
          </p>
          <p className="mb-8 text-gray-700 leading-relaxed">
            Most beauty supplements require consistent use for at least 4-6
            weeks before noticeable results appear. It's important to be patient
            and consistent with your supplement regimen, as the body needs time
            to utilize the nutrients and produce visible changes.
          </p>
        </div>
        {/* Conclusion - Better typography and spacing */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Conclusion</h2>
        <p className="mb-12 text-gray-700 leading-relaxed">
          Beauty care supplements can be a valuable addition to your beauty
          routine, but they are not a replacement for a healthy lifestyle,
          proper skincare, and good nutrition. Always consult with a healthcare
          professional before starting any new supplement regimen, especially if
          you have existing health conditions or are taking medications.
          Remember that true beauty comes from overall wellness, and supplements
          are just one piece of the puzzle.
        </p>
      </div>
    </div>
  );
}
