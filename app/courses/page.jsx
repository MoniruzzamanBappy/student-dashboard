"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { fetchCourses } from "../../lib/api";

export default function Courses() {
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const [search, setSearch] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 5;
  const totalPages = Math.ceil((courses?.length || 0) / coursesPerPage);

  const filteredCourses = courses?.filter((course) => {
    return (
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterFaculty ? course.faculty === filterFaculty : true)
    );
  });

  const displayedCourses = filteredCourses?.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Courses</h1>

      {/* Search & Filter */}
      <div className="flex space-x-4 mt-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Course Table */}
      <table className="w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Course Title</th>
            <th className="border p-2">Faculty</th>
            <th className="border p-2">Enrollment</th>
          </tr>
        </thead>
        <tbody>
          {displayedCourses?.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="border p-2">
                <Link
                  href={`/courses/${course.id}`}
                  className="text-blue-500 underline"
                >
                  {course.title}
                </Link>
              </td>
              <td className="border p-2">Dr. John Doe</td>
              <td className="border p-2">{course.enrollment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
