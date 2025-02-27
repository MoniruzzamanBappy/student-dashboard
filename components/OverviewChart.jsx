"use client";
import dynamic from "next/dynamic";
import { FiBook, FiTrendingUp, FiUsers } from "react-icons/fi";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverviewChart({ courses = [], students = [] }) {
  const totalStudents = students.length;
  const totalCourses = courses.length;

  const generateMonthlyData = (base) =>
    Array.from({ length: 7 }, (_, i) =>
      Math.floor((base / 7) * (0.8 + Math.random() * 0.4))
    );

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#3b82f6", "#8b5cf6"], // Blue & Purple gradient
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 600,
          colors: "#64748b",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}`,
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
        offsetX: -4,
        offsetY: 2,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8,
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} entries`,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
      padding: {
        top: -20,
        right: 20,
        left: 20,
        bottom: 0,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: { height: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Teachers",
      data: generateMonthlyData(totalCourses * 2),
    },
    {
      name: "Students",
      data: generateMonthlyData(totalStudents),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <FiTrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Growth Overview</h2>
            <p className="text-sm text-gray-600 mt-1">
              Monthly enrollment trends
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <FiUsers className="text-purple-600" />
            <span className="font-semibold text-gray-700">
              {totalStudents} Students
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <FiBook className="text-blue-600" />
            <span className="font-semibold text-gray-700">
              {totalCourses} Courses
            </span>
          </div>
        </div>
      </div>

      <div className="relative" style={{ minHeight: "400px" }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={400}
          width="100%"
        />

        {(totalStudents === 0 || totalCourses === 0) && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
            <p className="text-gray-500 text-lg">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
