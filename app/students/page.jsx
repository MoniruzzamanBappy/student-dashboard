"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { fetchStudents } from "../../lib/api";

export default function StudentList() {
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;
  const totalPages = Math.ceil((students?.length || 0) / studentsPerPage);

  const filteredStudents = students?.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterYear ? student.year === filterYear : true) &&
      (filterCourse ? student.courses.includes(filterCourse) : true)
    );
  });

  const displayedStudents = filteredStudents?.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <div className="p-6">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Student Directory
        </h1>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <input
            type="text"
            placeholder="Search students..."
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
          <select
            className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
          >
            <option value="">All Courses</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
            <option value="Art">Art</option>
          </select>
        </div>

        {/* Responsive Table Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Courses
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedStudents?.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/students/${student.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-3"
                      >
                        <span className="inline-block h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-blue-600">
                            {student.name.charAt(0)}
                          </span>
                        </span>
                        <span>{student.name}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {student.gpa}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{student.year}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {student.courses.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results State */}
          {displayedStudents?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No students found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
