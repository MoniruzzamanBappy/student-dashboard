"use client";

import { useState } from "react";
import { FiBook, FiCheckCircle, FiPlus, FiUser, FiX } from "react-icons/fi";

export default function AssignStudent({ students = [], courses = [] }) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAssign = () => {
    if (!selectedStudent || !selectedCourse) return;

    setAssignments((prev) => [
      ...prev,
      { student: selectedStudent, course: selectedCourse },
    ]);

    setSelectedStudent("");
    setSelectedCourse("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const removeAssignment = (index) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <FiPlus className="w-5 h-5 text-green-600" />
        Assign Students to Courses
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
        <div className="relative">
          <FiUser className="absolute left-3 top-3.5 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select Student</option>
            {students?.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <FiBook className="absolute left-3 top-3.5 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses?.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <button
          className="h-full px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={handleAssign}
        >
          <FiPlus className="w-4 h-4" />
          Assign
        </button>
      </div>

      {showSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
          <FiCheckCircle className="w-5 h-5" />
          Assignment successful!
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Current Assignments</h3>
        <div className="border rounded-lg overflow-hidden">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="p-4 border-b last:border-0 hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <span className="font-medium">{assignment.student}</span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="text-gray-600">{assignment.course}</span>
              </div>
              <button
                onClick={() => removeAssignment(index)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          ))}
          {assignments.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No assignments yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
