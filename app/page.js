"use client";
import Link from "next/link";
import { FiArrowRight, FiBook, FiTrendingUp, FiUsers } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Students", path: "/students" },
  { name: "Courses", path: "/courses" },
  { name: "Faculty", path: "/faculty" },
  { name: "Reports", path: "/reports" },
];

function HomeLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Revolutionize Your Institution's Management
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          EduManage provides a comprehensive solution for academic institutions
          to manage students, courses, faculty, and reporting in one unified
          platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/features"
            className="px-8 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-200"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your academic institution
              efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiUsers,
                title: "Student Management",
                description:
                  "Manage student records, attendance, and performance.",
              },
              {
                icon: FiBook,
                title: "Course Management",
                description:
                  "Easily create, manage, and track courses and curriculum.",
              },
              {
                icon: FiTrendingUp,
                title: "Advanced Analytics",
                description:
                  "Get insights with detailed reports and analytics.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Transform Your Institution?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Join thousands of institutions using EduManage to streamline their
          operations.
        </p>
        <Link
          href="/signup"
          className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center space-x-2 mx-auto w-fit"
        >
          <span>Start Your Free Trial</span>
          <FiArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 text-center text-gray-600">
        © {new Date().getFullYear()} EduManage. All rights reserved.
      </footer>
    </div>
  );
}

export default HomeLayout;
