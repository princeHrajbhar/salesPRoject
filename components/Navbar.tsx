"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    // Optionally redirect to home or login
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
              <div className="text-white mr-4">
                Welcome, {user?.name}
              </div>
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
