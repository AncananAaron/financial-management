import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";

export default function NavBar() {
  const { auth } = usePage().props;

  return (
    <div className="navbar border-b-2 border-slate-500 bg-base-100 sticky top-0">
      <div className=" ml-24">
        <h1 className="text-3xl font-bold">
          <i className="ri-currency-fill mr-4"></i>Financial Management
        </h1>
      </div>
      {auth.user && (
      <ul className="ml-auto mr-0 space-x-3">
          <li>
            <h1 className="text-xl text-white">{auth.user.name}</h1>
          </li>
          <li>
            <Link
            href="/logout"
            method="post"
            as="button"
            type="button"
            className="btn w-5/6 mx-auto btn-error btn-outline"
            >
            Logout
            </Link>
          </li>
        </ul>
        )}
    </div>
  );
}
