import { Link } from "react-router-dom";
import { Home, PackageX } from "lucide-react";
import type { JSX } from "react";

function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="rounded-full bg-gray-200 p-8 inline-block mb-6">
          <PackageX className="w-16 h-16 text-muted-foreground" />
          <span className="text-6xl">📦❌</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back to
          rescuing food!
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-[#2D5A27] hover:bg-[#234519] text-white font-semibold py-2 px-4 rounded-full shadow-sm"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
