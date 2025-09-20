# Admin Dashboard & Notification Sidebar Project

A **React + Vite** project demonstrating a modern admin dashboard with the following features:

- **Dashboard** with revenue charts, projections, and statistics cards.
- **Order List Table** with search, sort, pagination, and add/delete functionality.
- **Notification Sidebar** with hover effects, cut/remove button, and swipe-to-delete.
- **Dark/Light Mode** support.
- Built with **React**, **Vite**, **Tailwind CSS**, **ShadCN/UI**, and **Framer Motion**.

---

## Features

### Dashboard
- Responsive cards displaying key metrics.
- Revenue chart (Line chart) with **dark/light mode support**.
- Pie chart showing sales breakdown with **custom tooltip**.
- Revenue by location section.

### Order List
- Table with order data (Order ID, User, Project, Address, Date, Status).
- Searchable and sortable columns.
- Pagination with page navigation.
- Add new orders using a modal with **Formik + Yup validation**.
- Delete single or multiple rows.

### Notification Sidebar
- Notifications, activities, and contacts sections.
- Hover effects on cards.
- Cut/remove button with smooth animations.
- Swipe-to-delete (drag left/right) feature for notifications and activities.
- Scrollable content and responsive sidebar animation.

---

## Screenshots

*(Add screenshots here for Dashboard, Order List, Notification Sidebar in light/dark mode)*

---

## Tech Stack

- **React** – Frontend library.  
- **Vite** – Development server and build tool.  
- **Tailwind CSS** – Styling framework.  
- **ShadCN/UI** – Pre-built UI components (Avatar, Button, Card, Table, etc.).  
- **Framer Motion** – Animations (sidebar, notifications, charts).  
- **Recharts** – Charts and graphs.  
- **Formik + Yup** – Form handling and validation in add order modal.

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/PravinSliet123/juspay-ui-assesment.git
cd admin-dashboard
npm install
npm run dev
