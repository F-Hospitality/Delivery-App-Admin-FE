import AdminLayout from "../../components/auth-layout";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import echarts-for-react (disable SSR)
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });


const Dashboard = () => {
  const orderStats = {
    totalOrders: 1500,
    pending: 120,
    confirmed: 200,
    cooking: 150,
    readyForDelivery: 180,
    onTheWay: 100,
    delivered: 850,
    refunded: 20,
    scheduled: 30,
  };

  // Static data for the order trends (bar chart)
  const chartData = [
    { date: "2025-03-10", orders: 200 },
    { date: "2025-03-11", orders: 250 },
    { date: "2025-03-12", orders: 300 },
    { date: "2025-03-13", orders: 350 },
    { date: "2025-03-14", orders: 400 },
    { date: "2025-03-15", orders: 450 },
  ];

  // Prepare pie chart data for order statuses
  const statusData = [
    { name: "Pending", value: orderStats.pending },
    { name: "Confirmed", value: orderStats.confirmed },
    { name: "Cooking", value: orderStats.cooking },
    { name: "Ready", value: orderStats.readyForDelivery },
    { name: "On The Way", value: orderStats.onTheWay },
    { name: "Delivered", value: orderStats.delivered },
    { name: "Refunded", value: orderStats.refunded },
  ];

  // Bar chart option (Order Trends)
  const barChartOption = {
    title: {
      text: "Order Trends",
      left: "center",
      textStyle: { color: "#4B5563" },
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: chartData.map((item) => item.date),
      axisLine: { lineStyle: { color: "#4B5563" } },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#4B5563" } },
    },
    series: [
      {
        data: chartData.map((item) => item.orders),
        type: "bar",
        itemStyle: { color: "#4F46E5" },
        barWidth: "50%",
      },
    ],
  };

  // Pie chart option (Order Status Breakdown)
  const pieChartOption = {
    title: {
      text: "Order Status Breakdown",
      left: "center",
      textStyle: { color: "#4B5563" },
    },
    tooltip: { trigger: "item" },
    series: [
      {
        name: "Order Status",
        type: "pie",
        radius: "50%",
        data: statusData.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // Colors for gradient backgrounds on summary cards
  const cardColors = [
    "from-green-400 to-blue-500",
    "from-blue-400 to-green-500",
    "from-purple-400 to-pink-500",
    "from-yellow-400 to-red-500",
    "from-indigo-400 to-purple-500",
    "from-red-400 to-orange-500",
    "from-teal-400 to-blue-500",
    "from-pink-400 to-purple-500",
    "from-cyan-400 to-green-500",
  ];
  
  // Keys for summary cards
  c
export default function AdminDashboard() {
  return (
    <AdminLayout>
         <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Orders Dashboard</h1>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statKeys.map((key, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300"
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center bg-gradient-to-r ${cardColors[index % cardColors.length]} rounded-full text-white mr-4`}
              >
                <span className="text-xl font-bold">
                  {key.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {key.replace(/([A-Z])/g, " $1")}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {orderStats[key]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Trends Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 h-96">
          <ReactECharts
            option={barChartOption}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 h-96">
          <ReactECharts
            option={pieChartOption}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </section>
    </div>
    </AdminLayout>
  );
}