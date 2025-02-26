"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StudentChart() {
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    title: {
      text: "Number of Students",
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: { formatter: (val) => `${val}` },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: { radius: 12 },
    },
    colors: ["#3b82f6", "#7dd3fc"], // Colors matching the image
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `${val} students` },
    },
    grid: { borderColor: "#e5e7eb" },
  };

  const chartSeries = [
    {
      name: "Girls",
      data: [400, 600, 450, 700, 500, 600, 700, 550, 600, 450, 400, 500],
    },
    {
      name: "Boys",
      data: [300, 500, 350, 600, 450, 500, 650, 500, 550, 400, 350, 450],
    },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
}
