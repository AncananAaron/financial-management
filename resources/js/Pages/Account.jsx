import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import route from "ziggy-js";
import UserLayout from "./Layout/UserLayout";

export default function Account({ accounts, dashboard_data }) {
  const { errors } = usePage().props;
  const [addAccount, setAddAccount] = useState(false);
  const [data, setData] = useState({
    name: "",
    type_of_accounte: "",
  });

  const handleAddAccount = (e) => {
    e.preventDefault();
    setAddAccount(!addAccount);
    //console.log(accounts)
  };

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
    setAddAccount(!addAccount);
  };

  return (
    <UserLayout dashboard_data={dashboard_data}>
      <div className="h-full bg-white w-full flex flex-col text-black">
        <div className="flex items-center place-content-center">
          <h1 className="p-4 text-3xl font-bold">Accounts</h1>
        </div>
        <div>
          <div>
            {!addAccount ? (
              <Link onClick={handleAddAccount} className="text-3xl">
                <i className="ri-add-box-line"></i>
              </Link>
            ) : (
              <Link onClick={handleAddAccount} className="text-3xl">
                <i className="ri-arrow-up-s-line"></i>
              </Link>
            )}
          </div>
          {addAccount ? (
            <div className="h-full bg-accent w-full flex flex-row">
              <form
                onSubmit={onSubmit}
                className="flex flex-row w-full items-center"
              >
                <div className="flex flex-row items-center">
                  {errors.name && (
                    <div className="alert alert-error">{errors.name}</div>
                  )}
                  <label className="text-black ml-10 text-xl font-semibold">
                    Account Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="ml-5 border-2 border-gray-300 rounded-md h-10 w-98 p-2 text-lg px-3 py-2 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
                    placeholder="Enter Account Name"
                  />
                </div>

                <div className="flex flex-row">
                  <label className="label">Select Type:</label>
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
                <button className="btn btn-primary mr-10 ml-auto h-1">
                  Add Account
                </button>
              </form>
            </div>
          ) : null}
        </div>
        <div>
          <table className="table">
            <thead className="text-black">
              <tr>
                <th>Account Name</th>
                <th>Type of Account</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => {
                return (
                  <tr key={account.id}>
                    <td>{account.name}</td>
                    <td>{account.type_of_account}</td>
                    <td>
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-error btn-outline">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
}
