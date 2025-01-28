"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaHome, FaCalendarAlt, FaUser, FaEnvelope, FaCertificate, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { MenuItem } from "@/utility/types/MenuItem";

// Menu items
const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <FaHome />, path: "/" },
  { name: "Event", icon: <FaCalendarAlt />, path: "/event" },
  { name: "Member", icon: <FaUser />, path: "/member" },
  { name: "Blast Message", icon: <FaEnvelope />, path: "/blast-message" },
  { name: "Certification", icon: <FaCertificate />, path: "/certification" },
  { name: "Profile", icon: <FaUserCircle />, path: "/profile" },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const handleMenuClick = (item: MenuItem) => {
    setActive(item.path);
    router.push(item.path);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white pt-3 pb-4 px-6 flex flex-col justify-between z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full pt-2">
          {/* Logo and title */}
          <div className="flex items-center mb-6">
            <Image src="/logo.png" alt="App Logo" className="h-10 mx-auto" width={40} height={40} />
            <span className="text-lg font-semibold ml-2 md:text-xl md:ml-4">E-Cell SRMUH</span>
          </div>

          {/* Menu items */}
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                    active === item.path ? "bg-gray-700 text-yellow-500" : "hover:bg-gray-700 hover:text-yellow-500"
                  }`}
                  onClick={() => handleMenuClick(item)}
                  role="button"
                  aria-pressed={active === item.path}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { className: "h-5 w-5" })}
                  <span className="ml-3 text-lg">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-auto">
          <span className="text-sm hidden sm:block">© 2024 E-Cell SRMUH</span>
        </div>
      </nav>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
