"use client";

import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { useState } from "react";
import { FiBook, FiDownload, FiFileText, FiUsers } from "react-icons/fi";
import { fetchCourses, fetchStudents } from "../../lib/api";

export default function Reports() {
  const {
    data: students,
    isLoading: studentsLoading,
    error: studentsError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const [reportType, setReportType] = useState("students");

  const exportCSV = () => {
    try {
      const dataToExport = reportType === "students" ? students : courses;

      if (!dataToExport || dataToExport.length === 0) {
        throw new Error("No data available for export");
      }

      const csv = Papa.unparse(dataToExport, {
        header: true,
        delimiter: ",",
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${reportType}-report-${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
      alert(`Export failed: ${error.message}`);
    }
  };

  const isLoading =
    reportType === "students" ? studentsLoading : coursesLoading;
  const error = reportType === "students" ? studentsError : coursesError;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="mt-2 text-gray-600">
              Generate and export institutional reports
            </p>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <FiFileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Report Type
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  disabled={isLoading}
                >
                  <option value="students">Student Performance Report</option>
                  <option value="courses">Course Enrollment Report</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {reportType === "students" ? (
                    <FiUsers className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiBook className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={exportCSV}
              disabled={isLoading || error}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiDownload className="w-5 h-5" />
              <span>Export CSV</span>
            </button>
          </div>

          {isLoading && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-600">
              Loading report data...
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg text-red-600">
              Error: {error.message}
            </div>
          )}

          {!isLoading && !error && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Preview ({reportType === "students" ? "Students" : "Courses"})
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {reportType === "students" ? (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            GPA
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Enrollment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faculty
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(reportType === "students" ? students : courses)
                      ?.slice(0, 5)
                      .map((item) => (
                        <tr key={item.id}>
                          {reportType === "students" ? (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.gpa}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.year}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.enrollment}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.faculty}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
