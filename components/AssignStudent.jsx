"use client";

import { useState } from "react";

export default function AssignStudent({ students = [], courses = [] }) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignments, setAssignments] = useState([]);

  const handleAssign = () => {
    if (!selectedStudent || !selectedCourse) return;

    setAssignments((prev) => [
      ...prev,
      { student: selectedStudent, course: selectedCourse },
    ]);

    // Reset selections
    setSelectedStudent("");
    setSelectedCourse("");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">📌 Assign Students to Courses</h2>

      <div className="mt-4 flex space-x-4">
        {/* Select Student */}
        <select
          className="border p-2 rounded"
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

        {/* Select Course */}
        <select
          className="border p-2 rounded"
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

        {/* Assign Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAssign}
        >
          Assign
        </button>
      </div>

      {/* Display Assigned Students */}
      <div className="mt-6">
        <h3 className="text-md font-semibold">📋 Assigned Students</h3>
        <ul className="mt-2">
          {assignments.map((assignment, index) => (
            <li key={index} className="border-b p-2">
              {assignment.student} → {assignment.course}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
