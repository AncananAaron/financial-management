import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage} from "@inertiajs/inertia-react";
import GuestLayout from "../Layout/GuestLayout";

export default function LoginCard() {
  const { errors } = usePage().props;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    Inertia.post("/login", form);
  };

  return (
    <GuestLayout>
      <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-2 border-black">
        <div className="card-body">
          <h1 className=" text-center text-black text-2xl font-bold place-contet">
            Login your Account
          </h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              {errors.email && (
                <div className="alert alert-error">{errors.email}</div>
              )}
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input input-bordered bg-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input input-bordered bg-white"
                required
              />
            </div>
            <div className="form-control">
              <button className="btn btn-primary mt-6">Login</button>
            </div>
          </form>
          <div className="flex items-start">
            <p className="text-black grow-0 mr-3">Create an account?</p>{" "}
            <Link href="/signup" className="text-primary">
              Sign-Up
            </Link>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
