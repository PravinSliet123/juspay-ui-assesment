"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  Search,
  Trash2,
  ListFilterPlus,
  ArrowDownUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useFormik } from "formik";
import * as Yup from "yup";
import Magnetic from "../components/common/Magnetic/Magnetic";

const initialOrders = [
  {
    id: "#CM9801",
    name: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    avatar: "/avatars/01.png",
    color: "text-blue-500",
  },
  {
    id: "#CM9802",
    name: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    avatar: "/avatars/02.png",
    color: "text-green-500",
  },
  {
    id: "#CM9803",
    name: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    avatar: "/avatars/03.png",
    color: "text-yellow-500",
  },
  {
    id: "#CM9804",
    name: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    avatar: "/avatars/04.png",
    color: "text-orange-400",
  },
  {
    id: "#CM9805",
    name: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    avatar: "/avatars/05.png",
    color: "text-red-500",
  },
];

export default function OrderList() {
  const [orders, setOrders] = React.useState(initialOrders);
  const [selected, setSelected] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // Formik + Yup for Add Order
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      project: "",
      address: "",
      date: "",
      status: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Order ID is required"),
      name: Yup.string().required("Name is required"),
      project: Yup.string(),
      address: Yup.string(),
      date: Yup.string(),
      status: Yup.string(),
    }),
    onSubmit: (values) => {
      setOrders((prev) => [
        ...prev,
        {
          id: values.id,
          name: values.name,
          project: values.project || "N/A",
          address: values.address || "N/A",
          date: values.date || "Today",
          status: values.status || "Pending",
          avatar: "/avatars/01.png",
          color:
            values.status === "Pending"
              ? "text-yellow-500"
              : values.status === "Complete"
              ? "text-green-500"
              : values.status === "Approved"
              ? "text-blue-500"
              : values.status === "Rejected"
              ? "text-red-500"
              : "text-gray-500",
        },
      ]);
      formik.resetForm();
      setIsAddOpen(false);
    },
  });

  // Filter + search
  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.project.toLowerCase().includes(search.toLowerCase()) ||
      o.address.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((a, b) =>
    sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const allSelected =
    selected.length === paginated.length && paginated.length > 0;

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(paginated.map((o) => o.id));
    }
  };

  const deleteSelected = () => {
    setOrders((prev) => prev.filter((o) => !selected.includes(o.id)));
    setSelected([]);
  };

  const deleteRow = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelected((prev) => prev.filter((s) => s !== id));
  };

  return (
    <div className="p-2 text-foreground min-h-screen">
      {/* Header */}
      <h1 className="text-lg font-semibold mb-4 inline-block py-1">
        Order List
      </h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-md  p-2 ">
        <div className="flex items-center gap-2 ">
          {/* Add Order Dialog */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Plus className="w-4 h-4 mr-2 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Order</DialogTitle>
              </DialogHeader>

              <form onSubmit={formik.handleSubmit} className="grid gap-2 py-2">
                {["id", "name", "project", "address", "date", "status"].map(
                  (field) => (
                    <div key={field} className="flex flex-col gap-1">
                      <Label className="capitalize">{field}</Label>
                      <Input
                        name={field}
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched[field] && formik.errors[field]
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formik.touched[field] && formik.errors[field] && (
                        <span className="text-xs text-red-500">
                          {formik.errors[field]}
                        </span>
                      )}
                    </div>
                  )
                )}
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Filter Dialog */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Magnetic>
                <div>
                  <ListFilterPlus size={20} className=" cursor-pointer " />
                </div>
              </Magnetic>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Orders</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                (Add filter fields here, e.g., by status or date)
              </p>
              <Button onClick={() => setIsFilterOpen(false)}>Apply</Button>
            </DialogContent>
          </Dialog>

          <Magnetic>
            <div>
              <ArrowDownUp
                onClick={() => setSortAsc((s) => !s)}
                className="w-4 h-4  cursor-pointer "
              />
            </div>
          </Magnetic>

          {selected.length > 0 && (
            <Magnetic>
              <div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={deleteSelected}
                  className="ml-2"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete ({selected.length})
                </Button>
              </div>
            </Magnetic>
          )}
        </div>

        <div className="relative w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8  rounded-xl"
            
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground">
              <TableHead className="w-12">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(order.id)}
                    onCheckedChange={() => toggleRow(order.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.avatar} alt={order.name} />
                      <AvatarFallback>{order.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{order.name}</span>
                  </div>
                </TableCell>
                <TableCell>{order.project}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {order.date}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium",
                      order.color
                    )}
                  >
                    ● {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => deleteRow(order.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          {"<"}
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            size="sm"
            variant={p === page ? "default" : "ghost"}
            onClick={() => setPage(p)}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
