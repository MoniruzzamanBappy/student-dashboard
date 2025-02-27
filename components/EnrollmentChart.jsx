"use client";
import dynamic from "next/dynamic";
import { FaChartBar, FaUsers } from "react-icons/fa";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EnrollmentChart({ courses = [] }) {
  const totalEnrollment = courses.reduce((sum, c) => sum + c.enrollment, 0);

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
        columnWidth: "55%",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val} students`,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#1e293b"],
        fontWeight: 600,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: courses
        .slice(0, 5)
        .map((c) =>
          c.title.length > 12 ? `${c.title.substring(0, 12)}...` : c.title
        ),
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: "#64748b",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${Math.round(val)}`,
        style: {
          colors: "#64748b",
          fontSize: "14px",
        },
      },
      title: { text: "Students" },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        gradientToColors: ["#3b82f6", "#8b5cf6"],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    colors: ["#3b82f6", "#8b5cf6"],
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
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} students`,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: { height: 300 },
          dataLabels: { enabled: false },
          xaxis: {
            labels: { style: { fontSize: "12px" } },
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Online Enrollment",
      data: courses.slice(0, 5).map((c) => Math.floor(c.enrollment * 0.6)),
    },
    {
      name: "In-Person Enrollment",
      data: courses.slice(0, 5).map((c) => Math.floor(c.enrollment * 0.4)),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <FaChartBar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Course Enrollment
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {courses.length} courses tracked
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm">
          <FaUsers className="text-purple-600" />
          <span className="font-semibold text-gray-700">
            {totalEnrollment.toLocaleString()} Total Students
          </span>
        </div>
      </div>

      <div className="relative">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={400}
          width="100%"
        />

        {courses.length === 0 && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
            <p className="text-gray-500 text-lg">
              No enrollment data available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
