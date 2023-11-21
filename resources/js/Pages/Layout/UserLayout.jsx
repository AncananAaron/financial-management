import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import NavBar from "../Components/NavBar";

export default function UserLayout(props) {

  return (
    <div className="">
      <NavBar />
        <main className="w-auto h-auto">{props.children}</main>
    </div>
  );
}
