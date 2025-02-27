"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiAward, FiBookOpen, FiUsers } from "react-icons/fi";
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
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <FiUsers className="w-5 h-5" />
            <span>{courses?.length || 0} Total Courses</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
          <div className="relative flex-1">
            <FiBookOpen className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-0 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Course Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Enrollment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedCourses?.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium flex items-center space-x-3">
                        <span className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FiBookOpen className="w-5 h-5 text-blue-600" />
                        </span>
                        <span>{course.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FiAward className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">{course.faculty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${Math.min(
                                (course.enrollment / 100) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-600">
                          {course.enrollment}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayedCourses?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No courses found matching your criteria
              </p>
            </div>
          )}
        </div>

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
