// src/components/Footer.jsx
import { Instagram, Twitter, Facebook } from "lucide-react";

// Simple inline shuttlecock SVG (no external icon needed)
const ShuttlecockIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* shuttle head */}
    <circle cx="19" cy="5" r="2" />
    {/* feather lines */}
    <path d="M9 3l12 12" />
    <path d="M7 5l12 12" />
    <path d="M5 7l12 12" />
    {/* handle */}
    <path d="M3 13l8 8" />
  </svg>
);

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left - Logo & Tagline */}
        <div className="flex items-center gap-2">
          <ShuttlecockIcon size={24} className="text-green-500" />
          <span className="text-lg font-semibold text-white">ShuttleTime</span>
        </div>

        <p className="text-sm text-gray-400">
          Smash your limits. Play badminton anytime 🏸
        </p>

        {/* Right - Social Links */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-pink-400 transition" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter">
            <Twitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-4 pt-2 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShuttleTime. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
