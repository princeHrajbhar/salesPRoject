"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    // Call the logout API to clear the token from cookies
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });

      // Remove token from local storage
      localStorage.removeItem('token');

      // Update state
      setIsAuthenticated(false);

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold text-lg">
          <Link href="/">E-Cell</Link>
        </div>
        <div>
          <Link href="/" className="text-white mr-4">Home</Link>
          <Link href="/event" className="text-white mr-4">Events</Link>
          <Link href="/team" className="text-white mr-4">Team</Link>

          {isAuthenticated ? (
            <>
              <Link href="/profile" className="text-white mr-4">Profile</Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white mr-4">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
