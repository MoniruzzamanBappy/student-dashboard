"use client";

import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { useState } from "react";
import { fetchCourses, fetchStudents } from "../../lib/api";

export default function Reports() {
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const [reportType, setReportType] = useState("students");

  const exportCSV = () => {
    const dataToExport = reportType === "students" ? students : courses;
    const csv = Papa.unparse(dataToExport);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${reportType}-report.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <p className="mt-2 text-gray-600">Generate and export reports</p>

      <div className="mt-4">
        <label className="mr-2">Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="students">Student Performance</option>
          <option value="courses">Course Enrollments</option>
        </select>
        <button
          onClick={exportCSV}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
