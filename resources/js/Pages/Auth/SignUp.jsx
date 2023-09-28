import React, {useState} from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import GuestLayout from "../Layout/GuestLayout";

export default function SignUpCard() {
  const { errors } = usePage().props;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/register", form);
  };

  return (
    <GuestLayout>
      <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-2 border-black">
        <div className="card-body">
          <h1 className=" text-center text-black text-2xl font-bold place-contet">
            Sign-Up here
          </h1>
          <form onSubmit={handleSubmit} className="">
            {errors.name && (
              <div className="alert alert-error">{errors.name}</div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered bg-white"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
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
                className="input input-bordered bg-white"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-control">
              {errors.password && (
                <div className="alert alert-error">{errors.password}</div>
              )}
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered bg-white"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password_confirmation"
                className="input input-bordered bg-white"
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
              />
            </div>
            <div className="form-control">
              <button className="btn btn-primary mt-6">Sign Up</button>
            </div>
          </form>
          <div className="flex items-start">
            <p className="text-black grow-0 mr-3">Already have an account?</p>{" "}
            <Link href="/login" className="text-primary">Login</Link>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
