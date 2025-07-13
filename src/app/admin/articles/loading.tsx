// src/app/articles/loading.tsx

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg text-blue-600 font-semibold">Loading articles...</p>
    </div>
  );
}
