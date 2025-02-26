"use client";

import {
  FaDollarSign,
  FaTrophy,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";

export default function DashboardCard({ title, value }) {
  // Define icons based on title
  const iconMap = {
    "Total Students": <FaUserGraduate className="text-blue-500 text-4xl" />,
    "Total Courses": <FaUniversity className="text-green-500 text-4xl" />,
    "Total Faculty": <FaTrophy className="text-yellow-500 text-4xl" />,
    Revenue: <FaDollarSign className="text-orange-500 text-4xl" />,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
      {/* Text Content */}
      <div>
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>

      {/* React Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        {iconMap[title] || <FaUniversity className="text-gray-500 text-4xl" />}
      </div>
    </div>
  );
}
