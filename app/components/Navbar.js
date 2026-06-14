import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Team Sphere Logo"
            className="h-10 w-auto"
          />

          <span className="text-xl font-bold text-gray-900">
            Team Sphere
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/terms"
            className="text-gray-700 hover:text-blue-600"
          >
            Terms
          </Link>

          <Link
            href="/privacy"
            className="text-gray-700 hover:text-blue-600"
          >
            Privacy
          </Link>
        </div>
      </div>
    </nav>
  );
}