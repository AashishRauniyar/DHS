import Image from "next/image";

export default function Featured() {
  const featuredLogos = [
    { name: "Fox News", src: "/fox-logo.png" },
    { name: "BBC NEWS", src: "/bbc-news.png" },
    { name: "CNN", src: "/cnn-logo.png" },
    { name: "NBC", src: "/foxNews.png" },
    { name: "BLOOMBERG", src: "/bloomberg-logo.png" },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-500 text-center font-Poppins">
          FEATURED ON
        </h2>

        <div className="flex flex-wrap justify-center mt-6 sm:mt-8 md:mt-12 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center">
          {featuredLogos.map((logo, index) => (
            <div key={index} className="flex flex-col items-center p-2 sm:p-3">
              <div className="w-24 sm:w-32 md:w-40 h-16 sm:h-20 md:h-24 relative">
                <Image
                  src={logo.src}
                  alt={logo.name + " Logo"}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm sm:text-base md:text-lg font-semibold mt-2 sm:mt-3 md:mt-4 text-gray-600">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
