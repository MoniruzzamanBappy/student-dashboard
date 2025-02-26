"use client";

import Leaderboard from "@/components/Leaderboard";
import OverviewChart from "@/components/OverviewChart";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../../components/DashboardCard";
import EnrollmentChart from "../../components/EnrollmentChart";
import MostPopularCourses from "../../components/MostPopularCourses";
import { fetchCourses, fetchStudents } from "../../lib/api";

export default function Dashboard() {
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const cards = [
    { title: "Total Students", value: students?.length || 0 },
    { title: "Total Courses", value: courses?.length || 0 },
    { title: "Total Faculty", value: 10 },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold">Academic Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${
              index === cards.length - 1 && cards.length % 2 === 1
                ? "sm:col-span-2 lg:col-span-1" // Full width on md if it's a single last item
                : ""
            }`}
          >
            <DashboardCard title={card.title} value={card.value} />
          </div>
        ))}
      </div>

      {/* Overview Chart Section */}
      <div className="mt-6">
        <OverviewChart students={students} courses={courses} />
      </div>

      {/* Leaderboard & Enrollment Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Leaderboard students={students} />
        <EnrollmentChart courses={courses} />
      </div>

      {/* Most Popular Courses */}
      <div className="mt-6">
        <MostPopularCourses courses={courses} />
      </div>
    </div>
  );
}
