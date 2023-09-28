import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";

export default function UserLayout(props) {
  const { auth } = usePage().props;

  return (
    <div className="flex flex-row">
      <aside className="flex flex-col w-1/4 h-screen bg-accent text-black">
        <div className="bg-slate-400 h-12 text-3xl font-bold pl-4 items-center flex align-middle">
          <div>{auth.user.name}</div>
        </div>
        <ul className="leading-10 pl-10 text-xl font-semibold">
          <li>
            <Link href="/account">Profile</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/inflow">Inflow</Link>
          </li>
          <li>
            <Link href="/outflow">Outflow</Link>
          </li>
          <li>
            <Link href="/account">Accounts</Link>
          </li>
        </ul>

        <div className="flex mb-8  mt-auto">
          <Link
            href="/logout"
            method="post"
            as="button"
            type="button"
            className="btn w-5/6 mx-auto btn-error btn-outline"
          >
            Logout
          </Link>
        </div>
      </aside>
      <div className="flex flex-col w-3/4">
        <header className="w-full bg-primary h-12">header</header>
        <main className="p-2">{props.children}</main>
      </div>
    </div>
  );
}
