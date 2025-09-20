"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const products = [
  { name: "ASOS Ridley High Waist", price: "$79.49", qty: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", qty: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", qty: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", qty: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", qty: 64, amount: "$1,965.81" },
];

const salesData = [
  { name: "Direct", value: 300.56, color: "#95A4FC" },
  { name: "Affiliate", value: 175.18, color: "#1C1C1C" },
  { name: "Sponsored", value: 154.02, color: "#BAEDBD" },
  { name: "E-mail", value: 48.96, color: "#B1E3FF" },
];
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-[#1C1C1C] shadow-md rounded-lg px-3 py-2">
      <p className="font-inter font-normal text-[12px] text-white leading-[18px] tracking-normal">
        {data.value}%
      </p>
    </div>
  );
};


export default function DashboardSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      
      {/* Left Section - Table */}
      <Card className="lg:col-span-8 bg-[#F7F9FB] dark:bg-[#FFFFFF0D]  rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Price</th>
                  <th className="pb-2 font-medium">Quantity</th>
                  <th className="pb-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3">{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.qty}</td>
                    <td>{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Right Section - Chart */}
      <Card className="lg:col-span-4 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-2xl shadow-sm flex flex-col">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center flex-1">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart className=" border-none ">
              
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                // cornerRadius={5}
            
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className=" rounded-md " />
                ))}
              </Pie>
              <Tooltip  content={<CustomTooltip/>}  />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-4 space-y-2 w-full">
            {salesData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </div>
                <span className="font-medium">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
