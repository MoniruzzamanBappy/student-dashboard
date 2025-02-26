"use client";

import { useQuery } from "@tanstack/react-query";
import AssignStudent from "../../components/AssignStudent";
import FacultyGradeTable from "../../components/FacultyGradeTable";
import { fetchCourses, fetchStudents } from "../../lib/api";

export default function FacultyPanel() {
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Faculty Panel</h1>
      <p className="mt-2 text-gray-600">
        Manage student grades and course assignments.
      </p>

      {/* Grade Management */}
      <div className="mt-6">
        <FacultyGradeTable students={students} />
      </div>

      {/* Assign Students to Courses */}
      <div className="mt-6">
        <AssignStudent students={students} courses={courses} />
      </div>
    </div>
  );
}
