import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import logo from "../images/shuttle-logo.png"; // replace with your logo path

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/venues" },
    { name: "Venues", href: "/venues" },
    { name: "Bookings", href: "/bookings" },
    {name: "Slots", href: "/available-slots"},
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="ShuttleTime Logo" className="h-10 w-auto mr-2" />
            <span className="text-2xl font-bold text-blue-600">Shuttle</span>
            <span className="text-2xl font-bold text-green-600">Time</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 hover:scale-105 transition-all duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
