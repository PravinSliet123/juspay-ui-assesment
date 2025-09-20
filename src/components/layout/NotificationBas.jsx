import {
  BookOpen,
  Calendar,
  ChartPie,
  ChevronRight,
  FolderDot,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingBag,
  User,
  IdCard,
  Users,
  FileText,
  MessageCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

const dashboard = [
  {
    title: "Default",
    url: "/",
    icon: <ChartPie />,
    chilroutes: [],
  },
  {
    title: "eCommerce",
    url: "#",
    icon: <ShoppingBag />,
    chilroutes: [
      {
        title: "Overview",
        url: "/ecommerce/overview",
      },
      {
        title: "Orders",
        url: "/ecommerce/orders",
      },
    ],
  },
  {
    title: "Projects",
    url: "#",
    icon: <FolderDot />,
    chilroutes: [
      {
        title: "Active Projects",
        url: "/projects/active",
      },
      {
        title: "Archived",
        url: "/projects/archived",
      },
    ],
  },
  {
    title: "Online Courses",
    url: "#",
    icon: <BookOpen />,
    chilroutes: [
      {
        title: "Active Projects",
        url: "/projects/active",
      },
      {
        title: "Archived",
        url: "/projects/archived",
      },
    ],
  },
];
export const pages = [
  {
    title: "User Profile",
    url: "#",
    icon: <User />,
    defaultOpen: true, // we can use this to auto-open
    chilroutes: [
      { title: "Overview", url: "/pages/user/overview" },
      { title: "Projects", url: "/pages/user/projects" },
      { title: "Campaigns", url: "/pages/user/campaigns" },
      { title: "Documents", url: "/pages/user/documents" },
      { title: "Followers", url: "/pages/user/followers" },
    ],
  },
  {
    title: "Account",
    url: "/pages/account",
    icon: <IdCard />,
    children: [], // no subroutes
  },
  {
    title: "Corporate",
    url: "/pages/corporate",
    icon: <Users />,
    children: [],
  },
  {
    title: "Blog",
    url: "/pages/blog",
    icon: <FileText />,
    children: [],
  },
  {
    title: "Social",
    url: "/pages/social",
    icon: <MessageCircle />,
    children: [],
  },
];

export function NotificationBas() {
  const pathName = useLocation().pathname;

  return (
    <Sidebar >
      <SidebarContent className="px-2">
        {/* Header */}
        <SidebarHeader>
          <div className="flex items-center gap-4">
            <img
              src="/images/user.png"
              alt=""
              className="size-10 rounded-full cursor-pointer"
            />
            <p className="font-inter text-[14px] leading-[20px] tracking-normal">
              ByeWind
            </p>
          </div>
        </SidebarHeader>

        {/* Favorites */}
        <SidebarGroup>
          <div className="flex items-center gap-4">
            <SidebarGroupLabel className="font-inter text-[14px] leading-[20px]">
              Favorites
            </SidebarGroupLabel>
            <SidebarGroupLabel className="font-inter text-[14px] leading-[20px] text-foreground/50">
              Recently
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {["Overview", "Projects"].map((item, i) => (
                <NavLink key={i}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span className="pl-4 relative before:absolute before:size-2 before:bg-accent-foreground/50 before:rounded-full before:top-1/2 before:-translate-y-1/2 before:left-[1px]">
                        {item}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Dashboard Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-inter text-[14px] leading-[20px] text-foreground/50">
            Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {dashboard.map((item, index) => {
                const isActive = pathName === item.url;

                if (item.chilroutes && item.chilroutes.length > 0) {
                  // Collapsible item
                  return (
                    <Collapsible
                      key={index}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            className={
                              isActive
                                ? "before:absolute before:h-[70%] before:w-1 before:bg-accent-foreground/90 before:rounded-md before:top-1/2 before:-translate-y-1/2 before:left-[1px]"
                                : ""
                            }
                          >
                            {/* Chevron icon - rotates when open */}
                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />

                            {item.icon}
                            <span className="font-inter text-[14px] leading-[20px]">
                              {item.title}
                            </span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub className={ ` space-y-1 ` }>
                            {item.chilroutes.map((sub, subIndex) => (
                              <SidebarMenuSubItem key={subIndex}>
                                <NavLink to={sub.url}>{sub.title}</NavLink>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // Normal item
                return (
                  <NavLink to={item.url} key={index}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={isActive}
                        className={
                          isActive
                            ? "before:absolute before:h-[70%] before:w-1 before:bg-accent-foreground/90 before:rounded-md before:top-1/2 before:-translate-y-1/2 before:left-[1px]"
                            : ""
                        }
                      >
                        {item.icon}
                        <span className="font-inter text-[14px] leading-[20px]">
                          {item.title}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </NavLink>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-inter text-[14px] leading-[20px] text-foreground/50">
            Pages
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {pages.map((item, index) => {
                const isActive = pathName === item.url;

                if (item.chilroutes && item.chilroutes.length > 0) {
                  // Collapsible item
                  return (
                    <Collapsible
                      key={index}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            className={
                              isActive
                                ? "before:absolute before:h-[70%] before:w-1 before:bg-accent-foreground/90 before:rounded-md before:top-1/2 before:-translate-y-1/2 before:left-[1px]"
                                : ""
                            }
                          >
                            {/* Chevron icon - rotates when open */}
                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />

                            {item.icon}
                            <span className="font-inter text-[14px] leading-[20px]">
                              {item.title}
                            </span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub className={` space-y-1 `} >
                            {item.chilroutes.map((sub, subIndex) => (
                              <SidebarMenuSubItem key={subIndex}>
                                <NavLink to={sub.url}>{sub.title}</NavLink>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // Normal item
                return (
                  <NavLink to={item.url} key={index}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={isActive}
                        className={
                          isActive
                            ? "before:absolute before:h-[70%] before:w-1 before:bg-accent-foreground/90 before:rounded-md before:top-1/2 before:-translate-y-1/2 before:left-[1px]"
                            : ""
                        }
                      >
                        {item.icon}
                        <span className="font-inter text-[14px] leading-[20px]">
                          {item.title}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </NavLink>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
