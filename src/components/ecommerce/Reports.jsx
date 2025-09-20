// shadcn-dashboard.jsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Area,
} from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import TopSellingProducts from "./TopSellingProducts";
import { useTheme } from "../../config/theme-provider";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", desktop: 120, mobile: 140 },
  { month: "February", desktop: 180, mobile: 150 },
  { month: "March", desktop: 160, mobile: 170 },
  { month: "April", desktop: 200, mobile: 190 },
  { month: "May", desktop: 220, mobile: 210 },
  { month: "June", desktop: 250, mobile: 230 },
];
const revenueData = [
  { city: "New York", value: 72000 },
  { city: "San Francisco", value: 39000 },
  { city: "Sydney", value: 25000 },
  { city: "Singapore", value: 61000 },
];
const maxValue = Math.max(...revenueData.map((d) => d.value));

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};
export default function ShadcnDashboard() {
  const { theme } = useTheme();

  const desktopColor = theme === "dark" ? "#A8C5DA" : "#A8C5DA";
  const mobileColor = theme === "dark" ? "#C6C7F8" : "#1C1C1C";
  return (
    <div className="min-h-screen py-4 text-foreground">
      <div className="max-w-[1300px] mx-auto space-y-6">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left small cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-6 h-full">
            {/* Customers */}
            <Card className="rounded-2xl shadow-sm bg-[#E3F5FF] overflow-hidden h-full">
              <CardContent className="p-6">
                <p className="text-sm text-black font-medium">Customers</p>
                <div className="mt-3 flex items-end gap-3 flex-wrap">
                  <div className="text-3xl md:text-4xl font-extrabold text-black ">
                    3,781
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-[13px] text-green-600 dark:text-green-400">
                      +11.01%
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders */}
            <Card className="rounded-2xl shadow-sm bg-[#F7F9FB] dark:bg-[#FFFFFF0D] overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground font-medium">
                  Orders
                </div>
                <div className="mt-3 flex items-end gap-3 flex-wrap">
                  <div className="text-3xl md:text-4xl font-extrabold">
                    1,219
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-[13px] text-destructive">-0.03%</span>
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue */}
            <Card className="rounded-2xl shadow-sm bg-[#F7F9FB] dark:bg-[#FFFFFF0D] overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground font-medium">
                  Revenue
                </div>
                <div className="mt-3 flex items-end gap-3 flex-wrap">
                  <div className="text-3xl md:text-4xl font-extrabold">
                    $695
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-[13px] text-green-600 dark:text-green-400">
                      +15.03%
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth */}
            <Card className="rounded-2xl shadow-sm bg-[#E5ECF6] overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="text-sm text-black font-medium">Growth</div>
                <div className="mt-3 flex items-end gap-3 flex-wrap">
                  <div className="text-3xl md:text-4xl font-extrabold text-black ">
                    30.1%
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-[13px] text-green-600 dark:text-green-400">
                      +6.08%
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right projection chart */}
          <div className="lg:col-span-6 h-full">
            <Card className="rounded-2xl w-full shadow-sm overflow-hidden h-full bg-[#F7F9FB] dark:bg-[#FFFFFF0D] ">
              <CardHeader>
                <CardTitle className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0%]">
                  Projections vs Actuals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-full w-full">
                <div className="h-full">
                  <ChartContainer className={`h-full`} config={chartConfig}>
                    <BarChart
                      data={chartData}
                      margin={{ top: 8, right: 0, left: 0, bottom: 6 }}
                    >
                      <defs>
                        {/* Gradient for bars */}
                        <linearGradient
                          id="barGradDesktop"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#60a5fa"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                        <linearGradient
                          id="barGradMobile"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#93c5fd"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#60a5fa"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        vertical={false}
                        stroke="var(--muted-foreground)"
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        // i want to add lable like 1M 10M 20M
                        tickFormatter={(value) => `${value / 10}M`}
                        domain={[0, 300]}
                        width={40}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "var(--muted-foreground)",
                          fontSize: 12,
                        }}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: 8,
                          border: "1px solid #A8C5DA",
                          fontSize: 12,
                        }}
                      />
                      <Bar
                        dataKey="desktop"
                        stackId="a"
                        fill="#A8C5DA"
                        barSize={28}
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar
                        dataKey="mobile"
                        stackId="a"
                        fill="#E5ECF6"
                        barSize={28}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Larger revenue chart */}
        <div className="flex flex-col lg:flex-row lg:gap-6 w-full">
          {/* Left - Revenue Chart */}
          <div className="lg:flex-[2] flex mb-6 lg:mb-0">
            <Card className="rounded-2xl w-full shadow-sm bg-[#F7F9FB] dark:bg-[#FFFFFF0D] flex flex-col flex-1">
              <CardHeader className="pb-0 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <CardTitle className="font-inter font-semibold text-[14px] leading-[20px] tracking-normal">
                    Revenue
                  </CardTitle>
                  <div className="flex flex-wrap gap-4">
                    <span className="font-inter font-normal text-[12px] leading-[18px] tracking-normal">
                      <span className="text-[#1C1C1C] dark:text-[#C6C7F8]">
                        ●
                      </span>{" "}
                      Current Week{" "}
                      <span className="font-inter font-semibold text-[12px] leading-[18px] tracking-normal">
                        $58,211
                      </span>
                    </span>
                    <span className="font-inter font-normal text-[12px] leading-[18px] tracking-normal">
                      <span className="text-[#A8C5DA] dark:text-[#A8C5DA]">
                        ●
                      </span>{" "}
                      Previous Week{" "}
                      <span className="font-inter font-semibold text-[12px] leading-[18px] tracking-normal">
                        $68,768
                      </span>
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex-1">
                <div className="h-64 sm:h-72 md:h-80 lg:h-full w-full p-4 sm:p-6">
                  <ChartContainer
                    className="h-full w-full"
                    config={chartConfig}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                      >
                        <CartesianGrid vertical={false} stroke="#D9D9D9" />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                          minTickGap={10}
                          stroke="var(--muted-foreground)"
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => `${value / 10}M`}
                          domain={[0, 300]}
                          width={50}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        <Line
                          dataKey="desktop"
                          type="monotone"
                          stroke={desktopColor}
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          dataKey="mobile"
                          type="monotone"
                          stroke={mobileColor}
                          strokeWidth={2}
                          dot={false}
                          strokeDasharray="4 4"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Revenue By Location */}
          <div className="lg:flex-[1] flex">
            <div className="rounded-2xl shadow-sm h-full bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-6 flex flex-col w-full">
              <h2 className="text-lg font-semibold mb-4">
                Revenue by Location
              </h2>

              {/* Map Section */}
              <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-48 mb-4">
                <img
                  src={"/images/WorldMap.png"}
                  alt="World Map"
                  className="w-full h-full object-contain rounded"
                />
                {/* Dots */}
                <span className="absolute w-3 h-3 bg-black rounded-full top-[25%] left-[20%]"></span>
                <span className="absolute w-3 h-3 bg-black rounded-full top-[30%] left-[40%]"></span>
                <span className="absolute w-3 h-3 bg-black rounded-full top-[55%] left-[75%]"></span>
                <span className="absolute w-3 h-3 bg-black rounded-full top-[60%] left-[85%]"></span>
              </div>

              {/* Revenue bars */}
              <div className="space-y-4 flex-1">
                {revenueData.map((item) => (
                  <div key={item.city}>
                    <div className="flex justify-between font-sans font-normal text-[12px] leading-[18px] tracking-[0%] mb-1">
                      <span>{item.city}</span>
                      <span>{Math.round(item.value / 1000)}K</span>
                    </div>
                    <div className="h-1 w-full bg-white rounded-full">
                      <div
                        className="h-1 bg-[#A8C5DA] rounded-full"
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <TopSellingProducts />
      </div>
    </div>
  );
}
