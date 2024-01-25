import { React, useState } from "react";
import UserLayout from "../Layout/UserLayout.jsx";
import PieChart from "./PieChart.jsx";
import BarChart from "./BarChart.jsx";
import StackedBarChart from "./StackedBarChart.jsx";
import Transactions from "../Transactions.jsx";
import Account from "../Account.jsx";

export default function Dashboard({
  dashboard_data,
}) {
  const total_spent = dashboard_data.total_spent;
  const total_earned = dashboard_data.total_earned;
  const total_spent_per_account = dashboard_data.total_spent_per_account;
  const total_payable_per_account = dashboard_data.total_payable_per_account;

  // console.log(dashboard_data);

  return (
    <div className="bg-white text-black flex flex-col">
      <div className="flex flex-row space-x-5">
          <div className="">
            <label className="text-3xl font-bold">Total Earn & Total Income</label>
            <PieChart total_spent={total_spent} total_earned={total_earned} />
          </div>

          <div className="">
            <label className="text-3xl font-bold">Total Spent Per Account</label>
            <BarChart total_spent_per_account={total_spent_per_account} />
          </div>

          <div className="">
            <label className="text-3xl font-bold">Credit Account</label>
            <StackedBarChart total_payable_per_account={total_payable_per_account} />
          </div>
        </div>
    </div>
  );
}
