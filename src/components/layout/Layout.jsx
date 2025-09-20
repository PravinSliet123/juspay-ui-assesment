import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import NotificationSidebar from "../common/Notifications";

function Layout() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header open={open} setOpen={setOpen} />
        <div className="p-2 w-full">
          <Outlet />
        </div>
      </main>
      <div ref={sidebarRef}>
        <NotificationSidebar open={open} setOpen={setOpen} />
      </div>
    </SidebarProvider>
  );
}

export default Layout;
