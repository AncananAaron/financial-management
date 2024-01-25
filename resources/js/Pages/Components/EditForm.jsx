import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import route from "ziggy-js";
import { usePage } from "@inertiajs/inertia-react";

export default function EditForm({ transaction, accounts, exit }) {
  const { errors } = usePage().props;

  const [data, setData] = useState({
    id: transaction.id,
    type_of_account: transaction.type_of_account,
    account_id: transaction.account_id,
    amount: transaction.amount,
    remarks: transaction.remarks,
    date: transaction.date,
  });

  const [filteredAccounts, setFilteredAccounts] = useState([]);

  useEffect(() => {

    handleTypeChange(data.type_of_account);
  }, [data.type_of_account]);

  const handleTypeChange = async (value) => {
    setData({ ...data, type_of_account: value });
    const filterAccounts = accounts.filter(
      (account) => account.type_of_account === value,
    );
    setFilteredAccounts(filterAccounts);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    Inertia.post(route("transaction:update"), data, { preserveState: true });
    setData({
      account_id: "",
      amount: 0,
      remarks: "",
      date: "",
      type_of_account: "",
    });
    console.log(errors);
    //exit();
  };

  return (
    <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-1 border-black z-100">
      <form className="card-body" onSubmit={onSubmit}>
        <h1 className="text-black text-2xl font-bold text-center">
          Edit Transaction
        </h1>
        <div className="form-control">
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
        {errors.account_id && (
          <div className="alert alert-error">{errors.account_id}</div>
        )}
        <div className="form-control">
          <label className="label">Select Account:</label>
          <select
            className="select select-ghost w-full max-w-xs"
            value={data.account_id}
            onChange={(e) => setData({ ...data, account_id: e.target.value })}
          >
            <option value="">Select Account</option>
            {filteredAccounts.map((account) => {
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
            value={data.amount}
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
            value={data.date}
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
            value={data.remarks}
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
            onClick={() => exit()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
