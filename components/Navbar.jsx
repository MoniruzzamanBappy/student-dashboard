"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // React Icons for menu & close

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get the current active route

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Courses", path: "/courses" },
    { name: "Faculty", path: "/faculty" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <>
      {/* Navbar for Large Screens */}
      <nav className="bg-[#4286a1] p-4 py-3 text-white hidden md:block">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-1 rounded-md ${
                pathname === item.path
                  ? "bg-white text-[#4286a1] font-bold" // Active route style
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-[#4286a1] p-4 text-white">
        {/* Hamburger Icon */}
        <button onClick={() => setSidebarOpen(true)} className="text-2xl">
          <FiMenu />
        </button>
        <h1 className="text-lg font-semibold">Menu</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-10 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-[#4286a1]">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl text-gray-700"
          >
            <FiX />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)} // Close sidebar on link click
              className={`px-4 py-2 rounded-md ${
                pathname === item.path
                  ? "bg-[#4286a1] text-white font-bold"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;
