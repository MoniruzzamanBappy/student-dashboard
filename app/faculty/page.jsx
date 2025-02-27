"use client";

import { useQuery } from "@tanstack/react-query";
import { FiUser } from "react-icons/fi";
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
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FiUser className="w-8 h-8 text-blue-600" />
            Faculty Management Panel
          </h1>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Manage student academic records, course assignments, and grade
            updates in real-time.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FacultyGradeTable students={students} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <AssignStudent students={students} courses={courses} />
          </div>
        </div>
      </div>
    </div>
  );
}
