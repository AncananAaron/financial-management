import React, {useState} from "react";
import route from "ziggy-js";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";



export default function AccountForm({ exit }) {
  const { errors } = usePage().props;

  const [data, setData] = useState({
    name: "",
    type_of_account: "",
  });

  const handleTypeChange = (value) => {
    setData({ ...data, type_of_account: value });
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData((name) => ({ ...name, [key]: value }));
  };


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    Inertia.post(route("account:store"), data);
    setData({ name: "" });
  };

  return (
    <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-1 border-black z-100">
      <form className="card-body" onSubmit={onSubmit}>
        <div className="form-control">
          {errors.name && (
            <div className="alert alert-error">{errors.name}</div>
          )}
          <label className="text-black text-xl font-semibold">
            Account Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-md w-full max-w-xs p-2 text-lg px-3 py-2 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
            placeholder="Enter Account Name"
          />
        </div>

        <div className="flex flex-col">
          <label className="label text-xl font-semibold">Select Type:</label>
          <div className="flex flex-row space-x-3">
            <div className="flex flex-row">
              <label className="label">Inflow</label>
              <input
                type="radio"
                checked={data.type_of_account === "Inflow"}
                onChange={() => handleTypeChange("Inflow")}
              />
            </div>
            <div className="flex flex-row">
              <label className="label">Outflow</label>
              <input
                type="radio"
                checked={data.type_of_account === "Outflow"}
                onChange={() => handleTypeChange("Outflow")}
              />
            </div>
            <div className="flex flex-row">
              <label className="label">Payable</label>
              <input
                type="radio"
                checked={data.type_of_account === "Payable"}
                onChange={() => handleTypeChange("Payable")}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary w-full max-w-xs">
          Add Account
        </button>
        <button className="btn btn-error btn-outline w-full max-w-xs" onClick={exit}>Cancel</button>
      </form>


    </div>
  );
}
