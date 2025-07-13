import SearchSection from "@/components/SearchSection";
import Categories from "@/components/category-section";

export default function ProductSearch() {
  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-6">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Welcome to Daily Health Supplement.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted source for health product reviews, wellness articles,
            and expert advice.
          </p>
        </div>
      </main>
      <SearchSection />
      <Categories />
    </div>
  );
}
