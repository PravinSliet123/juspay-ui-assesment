"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";

export default function NotificationSidebar({ open, setOpen }) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "You have a bug that needs fixing...", time: "Just now" },
    { id: 2, text: "New user registered", time: "59 minutes ago" },
    {
      id: 3,
      text: "You have a bug that needs fixing...",
      time: "12 hours ago",
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Natali Craig",
      text: "You have a bug that needs fixing...",
      time: "Just now",
    },
    {
      id: 2,
      name: "Drew Cano",
      text: "Released a new version",
      time: "59 minutes ago",
    },
    {
      id: 3,
      name: "Orlando Diggs",
      text: "Submitted a bug",
      time: "12 hours ago",
    },
  ]);

  const contacts = ["Natali Craig", "Drew Cano", "Orlando Diggs", "Andi Lane"];

  const removeNotification = (id, type) => {
    if (type === "notification") {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } else if (type === "activity") {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full bg-white dark:bg-black w-80 shadow-2xl border-l flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-slate-200">
              <h2 className="font-semibold text-lg">Notifications</h2>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                ✕
              </Button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto max-h-screen p-4 space-y-6">
              {/* Notifications */}
              <div>
                <h3 className="text-sm font-medium mb-3">Notifications</h3>
                <AnimatePresence>
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02, backgroundColor: "#F3F4F6" }}
                      className="relative rounded-md p-3 cursor-pointer"
                    >
                      <div>{n.text}</div>
                      <div className="text-[#6B7280] text-xs">{n.time}</div>
                      <Button
                        size="xs"
                        variant="ghost"
                        className="absolute  top-1 right-1 text-red-500 hover:bg-red-100"
                        onClick={() => removeNotification(n.id, "notification")}
                      >
                        <X size={30} />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Separator />

              {/* Activities */}
              <div>
                <h3 className="text-sm font-medium mb-3">Activities</h3>
                <AnimatePresence>
                  {activities.map((a) => (
                    <motion.div
                      key={a.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02, backgroundColor: "#F3F4F6" }}
                      className="relative flex gap-3 p-3 rounded-md"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{a.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{a.text}</div>
                        <div className="text-[#6B7280] text-xs">{a.time}</div>
                      </div>
                      <Button
                        size="xs"
                        variant="ghost"
                        className="absolute top-1 right-1 text-red-500 hover:bg-red-100"
                        onClick={() => removeNotification(a.id, "activity")}
                      >
                        <X size={30} className=" cursor-pointer" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Separator />

              {/* Contacts */}
              <div>
                <h3 className="text-sm font-medium mb-3">Contacts</h3>
                <div className="space-y-2">
                  {contacts.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{c[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
