"use client";

import { useState } from "react";
import { Bell, RotateCw, Star, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import { useTheme } from "../../config/theme-provider";

export default function Header({ open, setOpen }) {
  const { setTheme, theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between w-full border-b px-4 h-14 bg-background">
      {/* Left Section - Breadcrumb (desktop only) */}
                {/* Sidebar Trigger for mobile */}
          <SidebarTrigger className="cursor-pointer md:hidden" />
      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
        <SidebarTrigger className="cursor-pointer" />
        <Star size={20} fill="#1C1C1C1A" className="cursor-pointer" />
        <span className="font-inter font-normal text-[14px] leading-[20px] tracking-normal">
          Dashboards
        </span>
        <span>/</span>
        <span className="font-inter font-normal text-[14px] leading-[20px] tracking-normal text-[#1C1C1C]">
          Default
        </span>
      </div>

      {/* Right Section - Search + Icons */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search (hidden on mobile, visible on md+) */}
        <div className="hidden md:block relative">
          <Input
            type="text"
            placeholder="Search"
            className="h-8 w-48 text-sm bg-muted/50"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            ⌘/
          </span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle */}
          <Sun
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            size={20}
            className={`cursor-pointer ${
              theme === "light" ? "rotate-180" : "rotate-0"
            } transition-all duration-500`}
          />

          {/* Refresh */}
          <RotateCw
            onClick={handleRefresh}
            size={20}
            className={`cursor-pointer transition-transform duration-500 ${
              refreshing ? "animate-spin" : ""
            }`}
          />

          {/* Notifications */}
          <Bell
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            size={20}
            className="cursor-pointer"
          />


        </div>
      </div>
    </nav>
  );
}
