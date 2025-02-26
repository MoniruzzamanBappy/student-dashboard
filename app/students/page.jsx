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
      <h1 className="text-2xl font-semibold">Students</h1>

      {/* Search & Filter */}
      <div className="flex space-x-4 mt-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">Filter by Year</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        <select
          className="border p-2 rounded"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">Filter by Course</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="English">English</option>
          <option value="Art">Art</option>
        </select>
      </div>

      {/* Student Table */}
      <table className="w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">GPA</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Course</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents?.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border p-2">
                <Link
                  href={`/students/${student.id}`}
                  className="text-blue-500 underline"
                >
                  {student.name}
                </Link>
              </td>
              <td className="border p-2">{student.gpa}</td>
              <td className="border p-2">{student.year}</td>
              <td className="border p-2">{student.courses}</td>
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
