"use client";

import Image from "next/image";

export default function Leaderboard({ students = [] }) {
  // Generate dynamic avatars using RoboHash based on student IDs
  const getAvatar = (id) => `https://robohash.org/${id}?set=set5&size=50x50`;

  // Modify students data to include marks and percentage
  const processedStudents = students.map((student) => {
    const marks = Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000; // Random marks between 1000-1200
    const percentage = ((marks / 1200) * 100).toFixed(1) + "%"; // Calculate percentage
    const year = Math.floor(Math.random() * (2025 - 2015 + 1)) + 2015; // Random year between 2015-2025

    return {
      ...student,
      marks,
      percentage,
      year,
    };
  });

  // Sort students by GPA and pick the top 5
  const topStudents = [...processedStudents]
    .sort((a, b) => b.gpa - a.gpa)
    .slice(0, 5);

  if (topStudents.length === 0) {
    return (
      <p className="text-center text-gray-500">No student data available</p>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">⭐ Star Students</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-xl">⋮</span>
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-3 font-medium text-gray-600">ID</th>
              <th className="p-3 font-medium text-gray-600">Name</th>
              <th className="p-3 font-medium text-gray-600">Marks</th>
              <th className="p-3 font-medium text-gray-600">Percentage</th>
              <th className="p-3 font-medium text-gray-600">Year</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student, index) => (
              <tr
                key={index}
                className="border-b last:border-0 text-sm hover:bg-gray-50"
              >
                <td className="p-3 text-gray-700">{student.id}</td>
                <td className="p-3 flex items-center space-x-3">
                  <Image
                    src={getAvatar(student.id)}
                    alt={student.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="text-gray-800">{student.name}</span>
                </td>
                <td className="p-3 text-gray-700">{student.marks}</td>
                <td className="p-3 text-gray-700">{student.percentage}</td>
                <td className="p-3 text-gray-700">{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
