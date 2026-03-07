import Link from "next/link";
import { ArrowRight, Home, Wrench, Phone } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-primary-600 mb-2 font-[family-name:var(--font-manrope)]">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Wrench className="h-4 w-4" /> Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Phone className="h-4 w-4" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
