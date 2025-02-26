"use client";

import { useState } from "react";

export default function FacultyGradeTable({ students = [] }) {
  const [grades, setGrades] = useState({});

  const handleGradeChange = (studentId, newGrade) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: newGrade,
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">📚 Manage Student Grades</h2>
      <table className="w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Student</th>
            <th className="border p-2">Current Grade</th>
            <th className="border p-2">Update Grade</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">
                {grades[student.id] || "Not Assigned"}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="border p-1 rounded w-20"
                  value={grades[student.id] || ""}
                  onChange={(e) =>
                    handleGradeChange(student.id, e.target.value)
                  }
                  placeholder="Enter Grade"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
