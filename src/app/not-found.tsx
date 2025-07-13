import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-100">
      {/* Simple 404 Text */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-500 mb-6">
        Sorry, the page you&#39;re looking for doesn&#39;t exist or has been moved.
      </p>

      {/* Return to Home Button */}
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Go Back to Home
      </Link>

      {/* Optional: Small Footer Message */}
      <div className="mt-8 text-gray-500 text-sm">
        <p>If you need help, feel free to reach out to us.</p>
      </div>
    </div>
  );
}
