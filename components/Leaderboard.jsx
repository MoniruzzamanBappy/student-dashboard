"use client";
import Image from "next/image";
import { FiAward, FiStar, FiTrendingUp } from "react-icons/fi";

export default function Leaderboard({ students = [] }) {
  const getAvatar = (id) => `https://robohash.org/${id}?set=set5&size=100x100`;

  const processedStudents = students.map((student) => ({
    ...student,
    marks: Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000,
    percentage: (Math.random() * (95 - 75) + 75).toFixed(1) + "%",
    year: Math.floor(Math.random() * (2025 - 2015 + 1)) + 2015,
  }));

  const topStudents = [...processedStudents]
    .sort((a, b) => b.gpa - a.gpa)
    .slice(0, 5);

  if (topStudents.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="text-gray-400 mb-4 flex justify-center">
          <FiAward className="w-12 h-12" />
        </div>
        <p className="text-gray-500">No student records available</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <FiStar className="w-6 h-6 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <span className="text-sm font-medium">View All</span>
          <FiTrendingUp className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {topStudents.map((student, index) => (
          <div
            key={student.id}
            className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 flex-1 min-w-[100px]">
              <div className="relative">
                <Image
                  src={getAvatar(student.id)}
                  alt={student.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-blue-200"
                />
                <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  #{index + 1}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">ID: {student.id}</p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              <div className="flex-1 min-w-[100px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Progress
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {student.percentage}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                    style={{ width: student.percentage }}
                  />
                </div>
              </div>

              <div className="flex justify-between sm:justify-normal gap-4">
                <div className="text-right sm:text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {student.marks}
                  </p>
                  <p className="text-xs text-gray-500">Marks</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {student.year}
                  </p>
                  <p className="text-xs text-gray-500">Year</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
