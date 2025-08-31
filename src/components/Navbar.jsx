// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../images/shuttle-logo.png";
import { isLoggedIn, logout, getUser } from "../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/venues" },
    { name: "Venues", href: "/venues" },
    { name: "Bookings", href: "/bookings" },
    { name: "Slots", href: "/available-slots" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const user = getUser();

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
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 hover:scale-105 transition-all duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}

            {/* ✅ Show logged-in user + icon + logout */}
            {isLoggedIn() && user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <User size={18} className="text-blue-600" />
                  <span>Hi, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
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

            {/* ✅ Mobile user + icon + logout */}
            {isLoggedIn() && user && (
              <div className="px-3 py-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <User size={18} className="text-blue-600" />
                  <span>Hi, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
