"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const router = useRouter();

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    // Call the logout API to clear the token from cookies
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      // Remove token from local storage
      localStorage.removeItem("token");

      // Update state
      setIsAuthenticated(false);

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hover:text-blue-400 transition duration-300 flex items-center">
          <Link href="/">
            {/* Reduce padding and adjust logo size */}
            <Image
              src="/logo.png" // Make sure the logo image is correctly placed in the public folder
              alt="E-Cell Logo"
              width={40} // Adjust the width and height for appropriate sizing
              height={40}
              className="object-contain" // Ensures it fits without stretching
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className={`hidden lg:flex space-x-4 ${isMobileMenuOpen ? "flex flex-col mt-2" : ""}`}>
          <Link href="/" className="text-white hover:text-blue-400 transition duration-300">
            Home
          </Link>
          <Link href="/event" className="text-white hover:text-blue-400 transition duration-300">
            Events
          </Link>
          <Link href="/team" className="text-white hover:text-blue-400 transition duration-300">
            Team
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col space-y-2 mt-2">
          <Link href="/home" className="text-white hover:text-blue-400 transition duration-300">
            Home
          </Link>
          <Link href="/event" className="text-white hover:text-blue-400 transition duration-300">
            Events
          </Link>
          <Link href="/team" className="text-white hover:text-blue-400 transition duration-300">
            Team
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
