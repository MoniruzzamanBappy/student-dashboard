"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchStudents } from "../../../lib/api";

export default function StudentProfile() {
  const { id } = useParams();
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const student = students?.find((s) => s.id.toString() === id);
  if (!student) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{student.name}'s Profile</h1>
      <p className="mt-2 text-gray-600">Year: {student.year}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">📚 Enrolled Courses</h2>
        <ul className="mt-2">
          <li className="border-b p-2">
            {student.courses} - Grade: {Math.floor(Math.random() * 50) + 50}%
          </li>
        </ul>
      </div>
    </div>
  );
}
