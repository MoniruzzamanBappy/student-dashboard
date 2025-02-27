"use client";

import {
  FaArrowUp,
  FaDollarSign,
  FaTrophy,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";

export default function DashboardCard({ title, value, status }) {
  const iconMap = {
    "Total Students": {
      icon: <FaUserGraduate />,
      gradient: "from-blue-500 to-blue-400",
    },
    "Total Courses": {
      icon: <FaUniversity />,
      gradient: "from-green-500 to-green-400",
    },
    "Total Faculty": {
      icon: <FaTrophy />,
      gradient: "from-amber-500 to-amber-400",
    },
    Revenue: {
      icon: <FaDollarSign />,
      gradient: "from-purple-500 to-purple-400",
    },
  };

  const { icon, gradient } = iconMap[title] || {
    icon: <FaUniversity />,
    gradient: "from-gray-500 to-gray-400",
  };

  return (
    <div
      className={`group relative p-6 rounded-2xl bg-gradient-to-br ${gradient} text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-light opacity-90">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
          </div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm">
            <FaArrowUp className="w-4 h-4 mr-1" />
            12.5%
          </span>
          <span className="text-sm font-light">vs last month</span>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}
