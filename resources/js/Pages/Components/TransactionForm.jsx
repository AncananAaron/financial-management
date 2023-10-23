import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import route from "ziggy-js";
import { usePage } from "@inertiajs/inertia-react";

export default function TransactionForm({ accounts, exit, type }) {
  const { errors } = usePage().props;

  const [data, setData] = useState({
    account_id: "",
    amount: 0,
    remarks: "",
    date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    Inertia.post(type, data);
    setData({ account_id: "", amount: 0, remarks: "", date: "" });
    console.log(errors);
    //exit();
  };

  return (
    <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-1 border-black z-100">
      <form className="card-body" onSubmit={onSubmit}>
        <h1 className="text-black text-2xl font-bold text-center">
          Add Inflow Transaction
        </h1>
        {errors.account_id && (
          <div className="alert alert-error">{errors.account_id}</div>
        )}
        <div className="form-control">
          <label className="label">Select Account:</label>
          <select
            className="select select-ghost w-full max-w-xs"
            onChange={(e) => setData({ ...data, account_id: e.target.value })}
          >
            <option value="">Select Account</option>
            {accounts.map((account) => {
              return (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              );
            })}
          </select>
        </div>
        {errors.amount && (
          <div className="alert alert-error">{errors.amount}</div>
        )}
        <div className="form-control">
          <label className="label">Amount: </label>
          <input
            type="number"
            placeholder="Enter Amount"
            className="input input-ghost w-full max-w-xs"
            onChange={(e) => setData({ ...data, amount: e.target.value })}
          />
        </div>
        {errors.date && <div className="alert alert-error">{errors.date}</div>}
        <div className="form-control">
          <label className="label">Date: </label>
          <input
            type="date"
            placeholder="Enter Date"
            className="input input-ghost w-full max-w-xs"
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>
        {errors.remarks && (
          <div className="alert alert-error">{errors.remarks}</div>
        )}
        <div className="form-control">
          <label className="label">Remarks: </label>
          <textarea
            type="text"
            placeholder="Enter Remarks"
            className="textarea textarea-ghost w-full max-w-xs"
            onChange={(e) => setData({ ...data, remarks: e.target.value })}
          />
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-primary w-full max-w-xs" type="submit">
            Submit
          </button>
        </div>
        <div className="form-control mt-3">
          <button
            className="btn btn-error btn-outline w-full max-w-xs"
            onClick={exit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
