import React from "react";

const revenueData = [
  { city: "New York", value: 72000 },
  { city: "San Francisco", value: 39000 },
  { city: "Sydney", value: 25000 },
  { city: "Singapore", value: 61000 },
];

export default function RevenueByLocationCard() {
  const maxValue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="rounded-2xl flex-2 shadow-sm h-full bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-6 flex flex-col ">
      <h2 className="text-lg font-semibold mb-4">Revenue by Location</h2>

      {/* Map Section */}
      <div className="relative w-full flex-1 mb-4">
        <img
          src={"/images/WorldMap.png"}
          alt="World Map"
          className="w-full h-full object-contain rounded"
        />

        {/* Optional: Dots on map */}
        <span className="absolute w-3 h-3 bg-black rounded-full top-[25%] left-[20%]"></span>
        <span className="absolute w-3 h-3 bg-black rounded-full top-[30%] left-[40%]"></span>
        <span className="absolute w-3 h-3 bg-black rounded-full top-[55%] left-[75%]"></span>
        <span className="absolute w-3 h-3 bg-black rounded-full top-[60%] left-[85%]"></span>
      </div>

      {/* Revenue bars */}
      <div className="space-y-6">
        {revenueData.map((item) => (
          <div key={item.city}>
            <div className="flex justify-between font-sans font-normal text-[12px] leading-[18px] tracking-[0%] mb-1">
              <span>{item.city}</span>
              <span>{Math.round(item.value / 1000)}K</span>
            </div>
            <div className="h-1 w-full bg-white rounded-full font-sans font-normal text-[12px] leading-[18px] tracking-[0%]">
              <div
                className="h-1 bg-[#A8C5DA] rounded-full"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
