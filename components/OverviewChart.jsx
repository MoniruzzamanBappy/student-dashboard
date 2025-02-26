"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverviewChart({ courses = [], students = [] }) {
  // Simulate student and teacher enrollments over months using real data length
  const totalStudents = students.length;
  const totalCourses = courses.length;

  const generateMonthlyData = (base) =>
    Array.from({ length: 7 }, (_, i) =>
      Math.floor((base / 7) * (0.8 + Math.random() * 0.4))
    ); // Fluctuations

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    title: {
      text: "Overview",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#3b82f6", "#7dd3fc"], // Blue & Teal colors
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      labels: { formatter: (val) => `${val}` },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: { radius: 12 },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `${val} entries` },
    },
    grid: { borderColor: "#e5e7eb" },
  };

  const chartSeries = [
    { name: "Teacher", data: generateMonthlyData(totalCourses * 2) }, // Teacher count based on courses
    { name: "Student", data: generateMonthlyData(totalStudents) }, // Student count
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
}
