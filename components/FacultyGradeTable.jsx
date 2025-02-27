"use client";

import { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";

const gradeColor = (grade) => {
  const num = parseFloat(grade);
  if (num >= 90) return "text-green-600 bg-green-100";
  if (num >= 80) return "text-blue-600 bg-blue-100";
  if (num >= 70) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

export default function FacultyGradeTable({ students = [] }) {
  const [grades, setGrades] = useState({});
  const [editingId, setEditingId] = useState(null);

  const handleGradeChange = (studentId, newGrade) => {
    setGrades((prev) => ({ ...prev, [studentId]: newGrade }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <FiEdit className="w-5 h-5 text-purple-600" />
        Manage Student Grades
      </h2>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Student
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Current Grade
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Update Grade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students?.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${gradeColor(
                      grades[student.id]
                    )}`}
                  >
                    {grades[student.id] || "—"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={grades[student.id] || ""}
                      onChange={(e) =>
                        handleGradeChange(student.id, e.target.value)
                      }
                      onFocus={() => setEditingId(student.id)}
                      placeholder="0-100"
                    />
                    {editingId === student.id && (
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        onClick={() => setEditingId(null)}
                      >
                        <FiSave className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students?.length === 0 && (
          <div className="p-6 text-center text-gray-500">No students found</div>
        )}
      </div>
    </div>
  );
}
