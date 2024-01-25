import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import NavBar from "../Components/NavBar";
import Dashboard from "../Components/Dashboard";

export default function UserLayout({children, dashboard_data}) {
  console.log(dashboard_data)
  return (
    <div className="">
      <NavBar />
      <Dashboard dashboard_data={dashboard_data} />
        <main className="w-auto h-auto">{children}</main>
    </div>
  );
}
