"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiAward,
  FiBarChart2,
  FiBook,
  FiHome,
  FiMenu,
  FiUsers,
  FiX,
} from "react-icons/fi";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Students", path: "/students", icon: <FiUsers /> },
    { name: "Courses", path: "/courses", icon: <FiBook /> },
    { name: "Faculty", path: "/faculty", icon: <FiAward /> },
    { name: "Reports", path: "/reports", icon: <FiBarChart2 /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg hidden md:block">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-white text-xl font-bold">
                EduManage
              </Link>
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pathname === item.path
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-2xl p-2 rounded-lg hover:bg-white/10"
          >
            <FiMenu />
          </button>
          <Link href="/" className="text-white text-lg font-bold">
            EduManage
          </Link>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-blue-600">EduManage</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg m-2 text-sm font-medium transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
