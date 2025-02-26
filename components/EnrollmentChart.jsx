"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EnrollmentChart({ courses = [] }) {
  // Function to truncate course names after 15 characters
  const truncateText = (text, length = 15) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    title: {
      text: "📊 Course Enrollments",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: courses.slice(0, 5).map((c) => truncateText(c.title)), // Truncate course names
    },
    yaxis: {
      labels: { formatter: (val) => `${val} students` },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: { radius: 12 },
    },
    colors: ["#3b82f6", "#7dd3fc"], // Blue tones for clarity
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `${val} students` },
    },
    grid: { borderColor: "#e5e7eb" },
  };

  const chartSeries = [
    {
      name: "Online",
      data: courses.slice(0, 5).map((c) => Math.floor(c.enrollment * 0.6)),
    },
    {
      name: "In-Person",
      data: courses.slice(0, 5).map((c) => Math.floor(c.enrollment * 0.4)),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
}
